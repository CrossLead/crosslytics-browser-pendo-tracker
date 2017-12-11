import { PendoTracker } from '../src'

/**
 * Tracker test
 */
describe('PendoTracker tests', () => {
  it('PendoTracker should throw if window context invalid', () => {
    expect(() => new PendoTracker('accountId')).toThrow()
  })
})
