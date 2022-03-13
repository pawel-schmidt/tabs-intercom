import EventBus from '../src/EventBus'

describe('EventBus', () => {
  const localStoragePrototype = Object.getPrototypeOf(window.localStorage)

  it('works', () => {
    const eventBus = new EventBus()
    const key = 'hey123'
    const setItemSpy = jest.spyOn(localStoragePrototype, 'setItem')

    eventBus.subscribe(key, () => null)
    eventBus.emitMessage(key)

    expect(setItemSpy).toHaveBeenCalled()
    setItemSpy.mockReset()
  })
})
