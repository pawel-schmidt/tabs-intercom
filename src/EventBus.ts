import { STORAGE_KEY_PREFIX, STORAGE_VALUE_DELIMITER } from './consts'
import { Fn } from './types'

export default class EventBus {
  // TODO: consider using `WeakMap`
  private subscribers = new Map<string, Fn<void>>();

  constructor(private storageKeyPrefix: string = STORAGE_KEY_PREFIX) {
    window.addEventListener('storage', this.onMessageReceive.bind(this));
  }

  subscribe(key: string, callback: Fn<void>): void {
    this.subscribers.set(this.buildKey(key), callback);
  }

  unsubscribe(key: string): void {
    this.subscribers.delete(this.buildKey(key));
  }

  emitMessage(key: string, data: any = ''): void {
    const valuePrefix: string = Date.now().toString(36);
    // NOTE: adding a `prefix` to value to make `window.addEventListener('storage', …)`
    // possible to detect re-emission of the same event with the same value
    window.localStorage.setItem(
      this.buildKey(key),
      valuePrefix + STORAGE_VALUE_DELIMITER + JSON.stringify(data)
    );
  }

  onMessageReceive({ key, newValue }: StorageEvent): void {
    if (key?.startsWith(this.storageKeyPrefix) === true && newValue) {
      const valueStartIndex = newValue.indexOf(STORAGE_VALUE_DELIMITER);
      const value = newValue.substring(valueStartIndex + 1);
      const parsedValue = JSON.parse(value);
      const callback: Fn<void> | undefined = this.subscribers.get(key);
      callback?.(parsedValue);
    }
  }

  private buildKey(key: string) {
    return `${this.storageKeyPrefix}:${key}`;
  }
}
