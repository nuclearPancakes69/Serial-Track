import { composeStateBox } from '@z1/lib-feature-box'
import { macroRouteViewState } from '@z1/lib-feature-macros'

// views
import { views } from '../views'

// parts
import { cmd } from './cmd'

// main
const name = 'serviceCmd'
const routeProps = { authenticate: true }
export const serviceCmdState = composeStateBox({ name }, [
  cmd,
  macroRouteViewState(name, {
    path: '/service-cmd',
    views: views.state,
    routes: {
      home: routeProps,
      view: routeProps,
      detail: routeProps,
      more: routeProps,
    },
  }),
])