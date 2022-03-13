export type Fn<Return = any> = (...args: any[]) => Return;

export interface Intercom {
  register: <F extends Fn>(
    fn: F,
    fnName?: string
  ) => (...args: Parameters<F>) => void;
  unregister: (fnName: string) => boolean;
}
