import { TrackedEvent } from 'crosslytics'
import { PendoTracker } from '../src'

interface TestEventArgs {
  Color: string
}

class TestEvent implements TrackedEvent<TestEventArgs> {
  public name = 'Test Event'
  public category = 'Test Category'
  public argPriority: Array<keyof TestEventArgs> = ['Color']
  constructor(public args: TestEventArgs) {}
}

/**
 * Tracker test
 */
describe('PendoTracker tests', () => {
  // Approach to mocking window props from:
  // https://remarkablemark.org/blog/2018/11/17/mock-window-location/
  const { pendo } = window

  beforeAll(() => {
    window.pendo = {
      identify: jest.fn(),
      initialize: jest.fn(),
      track: jest.fn(),
      updateOptions: jest.fn()
    }
  })

  afterAll(() => {
    window.pendo = pendo
  })

  it('track() should call window.pendo.track()', () => {
    const spy = jest.spyOn(window.pendo, 'track')
    const tracker = new PendoTracker('accountId')
    tracker.track(
      new TestEvent({
        Color: 'blue'
      })
    )

    expect(spy).toHaveBeenCalled()
  })
})
