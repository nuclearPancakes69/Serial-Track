import { task, VIEW_STATUS } from '@z1/lib-feature-box'

// schema
import { secureNav } from './schema'

// main
export const cmd = task((t, a, r) => ({
  initial: {
    navRegistered: false,
  },
  mutations(m) {
    return [
      m('navRegistered', (state, action) => {
        return t.merge(state, {
          navRegistered: action.payload,
        })
      }),
    ]
  },
  effects(fx, { mutations, actions }) {
    const matchesBoxRoutes = t.globrex('serviceCmd/ROUTE_*').regex
    return [
      fx(
        ['account/AUTHENTICATE_SUCCESS'],
        async ({ getState, api }, dispatch, done) => {
          const state = getState()
          if (t.not(state.account.user)) {
            done()
          } else {
            dispatch({
              type: 'nav/NAV_SCHEMA_ADD',
              payload: {
                schema: secureNav,
              },
            })
            dispatch(mutations.navRegistered(true))
            done()
          }
        }
      ),
      fx(
        ['account/AUTHENTICATE_FAIL', 'account/SIGN_OUT_COMPLETE'],
        async ({ getState }, dispatch, done) => {
          const state = getState()
          if (state.serviceCmd.navRegistered) {
            dispatch({
              type: 'nav/NAV_SCHEMA_REMOVE',
              payload: {
                schema: ['/service-cmd'],
              },
            })
            dispatch(mutations.navRegistered(false))
          }
          done()
        }
      ),
      // fx(
      //   ['screen/RESIZE', 'nav/NAV_MATCH'],
      //   async ({ getState }, dispatch, done) => {
      //     const state = getState()
      //     const route = t.pathOr('', ['serviceCmd', 'route'], state)
      //     if (matchesBoxRoutes.test(route)) {
      //       const screen = t.pathOr({}, ['screen'], state)
      //       const width = t.pathOr(0, ['nav', 'width'], state)
      //       const height = t.pathOr(0, ['nav', 'body', 'top'], state)
      //       dispatch(
      //         mutations.dataChange({
      //           data: { screen, nav: { width, height } },
      //         })
      //       )
      //     }
      //     done()
      //   }
      // ),
      fx(
        actions.routeHome,
        ({ api }) => {
          const patched$ = r.fromEvent(api.service('service-cmd'), 'patched')
          const created$ = r.fromEvent(api.service('service-cmd'), 'created')
          return patched$.pipe(
            r.merge(created$),
            r.map(ev =>
              mutations.dataChange({ data: { item: ev } })
            )
          )
        },
        {
          cancelType: actions.routeExit,
          warnTimeout: 0,
          latest: true,
        }
      ),
    ]
  },
}))
