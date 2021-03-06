import { navSchema } from '@z1/lib-ui-schema'

// nav
export const homeSchema = navSchema(n => [
    n('//', { icon: 'home-outline', title: 'Home', target: 'nav', exact: true }, [
      n(
        '/activity',
        {
          target: 'nav',
          icon: 'activity-outline',
          title: 'Activity',
          alert: { color: 'red-500', icon: 'bell-outline' },
        },
        [
          n(
            '/activity/favourites',
            {
              target: 'nav',
              icon: 'heart-outline',
              title: 'Favourites',
              size: 'xl',
            },
            [
              n(
                '/activity/favourites/followers',
                {
                  target: 'body',
                  icon: 'flash-outline',
                  title: 'Followers',
                  size: 'xl',
                },
                [
                  n('/activity/favourites/followers/top', {
                    target: 'body',
                    icon: 'flash-outline',
                    title: 'Top Followers',
                    exact: true,
                    size: 'xl',
                  }),
                  n('/activity/favourites/followers/bottom', {
                    target: 'body',
                    icon: 'flash-outline',
                    title: 'Bottom Followers',
                    exact: true,
                    size: 'xl',
                  }),
                ]
              ),
              n('/activity/favourites/challengers', {
                target: 'body',
                icon: 'flash-outline',
                title: 'Challengers',
                exact: true,
                size: 'xl',
              }),
              n('/activity/favourites/winners', {
                target: 'body',
                icon: 'flash-outline',
                title: 'Winners',
                exact: true,
                size: 'xl',
              }),
              n('/activity/favourites/prizes', {
                target: 'body',
                icon: 'flash-outline',
                title: 'Prizes',
                exact: true,
                size: 'xl',
              }),
              n('#', {
                target: 'body-action',
                icon: 'search-outline',
                title: 'Search',
                action: {
                  type: 'landing/ROUTE_VIEW',
                  payload: {
                    view: 'search',
                  },
                },
              }),
              n('#', {
                target: 'body-action',
                borderWidth: 2,
                icon: 'person-outline',
                title: 'Profile',
                action: {
                  type: 'landing/ROUTE_VIEW',
                  payload: {
                    view: 'profile',
                  },
                },
              }),
            ]
          ),
          n('/activity/latest', {
            target: 'nav',
            icon: 'flash-outline',
            title: 'Latest',
            exact: true,
            size: 'xl',
          }),
          n('/activity/find', {
            target: 'body-action',
            icon: 'search-outline',
            title: 'Search',
            exact: true,
            size: 'xl',
            color: 'gray-500',
          }),
          n('/activity/popular', {
            icon: 'globe-2-outline',
            title: 'Popular',
            target: 'nav',
          }),
          
        ]
      ),
      n('/discover', {
        icon: 'radio-outline',
        title: 'Discover',
        target: 'nav',
      }),
      n('/collections', {
        icon: 'grid-outline',
        title: 'Collections',
        target: 'nav',
      }),
    ]),
    // n('/screen-cmd/view-editor', {
    //   icon: 'code-outline',
    //   title: 'Screen CMD',
    //   target: 'nav',
    // }),
    n('/accounts', { icon: 'people-outline', title: 'Accounts', target: 'nav' }),
    n('#', {
      target: 'primary-action',
      // target: 'body-action',
      icon: 'search-outline',
      title: 'Search',
      action: {
        type: 'landing/ROUTE_VIEW',
        payload: {
          view: 'search',
        },
      },
    }),
    n('#', {
      target: 'primary-action',
      // target: 'body-action',
      borderWidth: 2,
      icon: 'person-outline',
      title: 'Profile',
      action: {
        type: 'landing/ROUTE_VIEW',
        payload: {
          view: 'profile',
        },
      },
    }),
  ])
  