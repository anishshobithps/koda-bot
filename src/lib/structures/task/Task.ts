import { Piece } from '@sapphire/pieces';
import cron from 'node-cron';
import type { ScheduleOptions, ScheduledTask } from 'node-cron';
import type { PieceContext, PieceJSON, PieceOptions } from '@sapphire/pieces';
import type { RequireAtLeastOne } from 'type-fest';
import { Events } from '#lib/utils/events';

/**
 * The base task class. This class is abstract and is to be extended by subclasses, which should implement the methods.
 * In our workflow, tasks are ran at the specified interval.
 *
 * @example
 * ```typescript
 * // TypeScript:
 * import { Task } from '@/structures/Task';
 * import type { TaskOptions } from '@/structures/Task';
 *
 * // Define a class extending `Task`, then export it.
 * // You can use a interval in milliseconds
 * @ApplyOptions<TaskOptions>({ interval: 10_000 })
 * // or a cron
 * @ApplyOptions<TaskOptions>({ cron: '* * * * *' })
 * export class MyTask extends Task {
 *   public run(): void {
 *     this.container.logger.info('Task ran!');
 *   }
 * }
 * ```
 */
export abstract class Task extends Piece {
  public readonly interval?: number;
  public readonly cron?: string;
  public scheduleOptions?: ScheduleOptions;

  private _scheduleInterval!: NodeJS.Timeout;
  private _scheduleCron!: ScheduledTask;
  private readonly _callback: (() => Promise<void>);

  constructor(context: PieceContext, options: TaskOptions) {
    super(context, options);

	this.scheduleOptions = options.scheduleOptions;
    this.interval = options.interval;
    this.cron = options.cron;
    this._callback = this._run.bind(this);
  }

  public onLoad(): void {
    if (this.interval)
      this._scheduleInterval = setInterval(this._callback, this.interval);
    else if (this.cron)
      this._scheduleCron = cron.schedule(this.cron, this._callback, this.scheduleOptions);
  }

  public onUnload(): void {
    if (this._scheduleInterval)
      clearInterval(this._scheduleInterval);
    if (this._scheduleCron)
      this._scheduleCron.stop();
  }

  public toJSON(): PieceJSON & { interval: number | undefined; cron: string | undefined } {
    return {
      ...super.toJSON(),
      interval: this.interval,
      cron: this.cron,
    };
  }

  private async _run(): Promise<void> {
    try {
      await this.run();
    } catch (error: unknown) {
      this.container.client.emit(Events.TaskError, error as Error, { piece: this });
    }
  }

  public abstract run(): unknown;
}

export interface BaseTaskOptions extends PieceOptions {
	scheduleOptions?: ScheduleOptions;
}

export type TaskOptions = RequireAtLeastOne<BaseTaskOptions & { cron: string; interval: number }, 'cron' | 'interval'>
