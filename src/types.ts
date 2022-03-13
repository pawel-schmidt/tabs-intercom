export type Fn<Return = any> = (...args: any[]) => Return;

export interface ITabsIntercom {
  register<F extends Fn>(
    fn: F,
    fnName?: string
  ): (...args: Parameters<F>) => void;

  unregister(fnName: string): boolean;
}

export interface IEventBus {
  subscribe(key: string, callback: Fn<void>): void;

  unsubscribe(key: string): void;

  emitMessage(key: string, data: any): void;

  onMessageReceive(storageEvent: StorageEvent): void;
}
