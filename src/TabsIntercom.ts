import EventBus from './EventBus'
import { STORAGE_KEY_PREFIX } from './consts'
import { Fn, Intercom } from './types'

export default class TabsIntercom implements Intercom {
  private registeredFunctions = new Set<string>();

  constructor(private eventBus: EventBus = new EventBus(STORAGE_KEY_PREFIX)) {}

  register<F extends Fn>(
    fn: F,
    fnName: string = fn.name
  ): (...args: Parameters<F>) => void {
    if (fnName === '') {
      throw new Error(
        'Function with no name. Probably passed anonymous or arrow function.'
      );
    }

    if (this.registeredFunctions.has(fnName)) {
      throw new Error(
        `Function with name '${fnName}' already registered. Please use other function name.`
      );
    }

    this.registeredFunctions.add(fnName);
    this.eventBus.subscribe(fnName, fn);

    return (...args: any[]) => {
      args.forEach((arg: unknown) => {
        // TODO: add function serialization - https://stackoverflow.com/a/45676430
        //   also helpful might be using reviver parameter
        //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter
        if (typeof arg === 'function') {
          throw new Error('Function params serialization not supported yet.');
        }
      });

      this.eventBus.emitMessage(fnName, args);
      return fn(...args);
    };
  }

  unregister(fnName: string): boolean {
    this.eventBus.unsubscribe(fnName);
    return this.registeredFunctions.delete(fnName);
  }
}
