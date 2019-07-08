import { Identity, Page, TrackedEvent, Tracker } from 'crosslytics'
import * as Pendo from '../tools/declarations'

export class PendoTracker implements Tracker {
  /**
   * Direct reference to the Pendo agent API
   * @see {@link https://help.pendo.io/resources/support-library/api/index.html?bash#agent-api}
   */
  public get pendo(): Pendo.Pendo {
    return this.w.pendo
  }

  /**
   * Store window reference since Pendo snippet will overwrite the property
   */
  protected w: Window

  /**
   * Bootstrap Pendo. Equivalent to pasting Pendo JS single page app snippet into your markup.
   * Note that Pendo does NOT support instantiation of multiple agents on the same page (window.pendo
   * will get overwritten), so the behavior when instantiating multiple `PendoTracker`s is undefined.
   *
   * @param appId your Pendo API key
   * @param win the browser window context
   * @see {@link https://help.pendo.io/resources/support-library/installation/snippet-installation.html}
   */
  constructor(public id: string, win = window) {
    ;((apiKey: string, pendoWindow: Window) => {
      // tslint:disable
      ;((p: any, e, n: 'script', d, o: any = {}) => {
        var v: any, w, x, y, z
        o = p[d] = p[d] || {}
        o._q = []
        v = ['initialize', 'identify', 'updateOptions', 'pageLoad', 'track']
        for (w = 0, x = v.length; w < x; ++w)
          (function(m) {
            o[m] =
              o[m] ||
              function() {
                o._q[m === v[0] ? 'unshift' : 'push'](
                  [m].concat([].slice.call(arguments, 0))
                )
              }
          })(v[w])
        y = e.createElement(n)
        y.async = !0
        y.src = 'https://cdn.pendo.io/agent/static/' + apiKey + '/pendo.js'
        z = e.getElementsByTagName(n)[0]
        z && z.parentNode && z.parentNode.insertBefore(y, z)
      })(pendoWindow, pendoWindow.document, 'script', 'pendo')
      // tslint:enable

      // Anonymous to start
      pendoWindow.pendo.initialize({ visitor: {}, account: {} })
    })(id, win)
    this.w = win
  }

  public identify(identity: Identity) {
    const visitor = {
      id: identity.userId,
      // the only reserved name is `email` which matches `traits` format
      ...identity.traits
    }
    const account = {
      ...(identity.organization && {
        id: identity.organization.organizationId,
        // the only reserved name is `name` which matches `traits` format
        ...identity.organization.traits
      })
    }
    const options: Pendo.IdentityOptions = {
      account: account as ExplicitIndexSignatureType,
      visitor: visitor as ExplicitIndexSignatureType
    }
    this.w.pendo.identify(options)
  }

  /**
   * Pendo currently does not support manual pageview tracking,
   * so this method is a noop.
   * @param page 
   */
  public async page(page: Page) {
    return
  }

  public async track<T>(event: TrackedEvent<T>) {
    this.w.pendo.track(event.name, event.args)
  }
}

// To get around https://stackoverflow.com/a/46900376
interface ExplicitIndexSignatureType {
  id: string
  [key: string]: string
}
