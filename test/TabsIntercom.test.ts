import { TabsIntercom, EventBus } from '../src';

jest.mock('../src/EventBus');
const MockedEventBus = EventBus as jest.MockedClass<typeof EventBus>;

describe('TabsIntercom', () => {
  beforeEach(() => {
    MockedEventBus.mockClear();
  });

  it('works', () => {
    const functionName = 'sayHello';
    const name = 'John';
    const sayHello = jest.fn((name: string) => `Hello, ${name}!`);

    const tabsIntercom = new TabsIntercom();
    expect(EventBus).toHaveBeenCalledTimes(1);

    const sayHelloEverywhere = tabsIntercom.register(sayHello, functionName);
    expect(EventBus.prototype.subscribe).toHaveBeenCalled();

    const helloMessage = sayHelloEverywhere(name);
    expect(EventBus.prototype.emitMessage).toHaveBeenCalled();
    expect(helloMessage).toEqual('Hello, John!');
    expect(sayHello).toHaveBeenCalled();

    tabsIntercom.unregister(functionName);
  });
});
