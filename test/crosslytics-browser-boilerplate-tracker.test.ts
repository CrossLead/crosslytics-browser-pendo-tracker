import { SampleTracker } from '../src/crosslytics-browser-boilerplate-tracker'

/**
 * Tracker test
 */
describe('Tracker test', () => {
  it('SampleTracker is instantiable', () => {
    expect(new SampleTracker('accountId')).toBeInstanceOf(SampleTracker)
  })
})
