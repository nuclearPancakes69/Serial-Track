import React from 'react'
import { task, NavLink } from '@z1/lib-feature-box'

// elements
const NavPrimaryItem = ({ HStack, Icon, toCss }) => ({ icon, path, brand }) => {
  return (
    <HStack
      as={NavLink}
      to={path || '/'}
      x="center"
      y="center"
      box={{
        padding: { y: 5 },
        bgColor: [null, { hover: brand.nav.primary.bgHover }],
        color: [
          brand.nav.primary.color,
          { hover: brand.nav.primary.colorHover },
        ],
      }}
      activeClassName={toCss({
        bgColor: brand.nav.primary.bgActive,
        color: brand.nav.primary.colorActive,
      })}
    >
      <Icon name={icon} size="4xl" />
    </HStack>
  )
}

const NavPrimaryAction = task(
  t => ({ HStack, Icon, toCss }) => ({
    icon,
    path,
    action,
    onAction,
    borderWidth,
    brand,
  }) => {
    const color = [
      brand.nav.primary.color,
      { hover: brand.nav.primary.colorHover },
    ]
    const actionProps = t.and(t.isNil(action), t.not(t.isNil(path)))
      ? {
          as: NavLink,
          to: path,
          activeClassName: toCss({
            bgColor: brand.nav.primary.bgActive,
            color: brand.nav.parimary.colorActive,
          }),
        }
      : {
          onClick() {
            if (
              t.and(t.isType(onAction, 'Function'), t.isType(action, 'Object'))
            ) {
              onAction(action)
            }
          },
        }
    return (
      <HStack
        x="center"
        y="center"
        box={{
          padding: { top: 2, bottom: 4 },
          cursor: 'pointer',
          color,
        }}
        {...actionProps}
      >
        <Icon
          name={icon}
          size="4xl"
          box={{
            padding: 1,
            borderWidth: t.isNil(borderWidth) ? 0 : borderWidth,
            borderColor: color,
            borderRadius: 'full',
            bgColor: [null, { hover: brand.nav.body.bgHover }],
          }}
        />
      </HStack>
    )
  }
)

// main
export const NavPrimary = task(
  t => ({
    VStack,
    HStack,
    Icon,
    Spacer,
    toCss,
    NavLogoItem,
    When,
    MapIndexed,
  }) => {
    const PrimaryItem = NavPrimaryItem({ HStack, Icon, toCss })
    const PrimaryAction = NavPrimaryAction({ HStack, Icon, toCss })
    return ({ left, bottom, width, items, actions, brand, dispatch }) => {
      return (
        <VStack
          x="left"
          y="top"
          box={{
            position: 'fixed',
            pin: { top: true, bottom: true, left: true },
            bgColor: brand.nav.primary.bg,
            zIndex: 30,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          className="scroll-hide"
          style={{ width, left, bottom }}
        >
          <NavLogoItem brand={brand} />
          <MapIndexed
            list={items || []}
            render={({ item, index }) => (
              <PrimaryItem key={index} brand={brand} {...item} />
            )}
          />
          <When is={t.not(t.isZeroLen(actions || []))}>
            <Spacer />
          </When>
          <MapIndexed
            list={actions || []}
            render={({ item, index }) => (
              <PrimaryAction
                key={index}
                brand={brand}
                onAction={action => dispatch(action)}
                {...item}
              />
            )}
          />
        </VStack>
      )
    }
  }
)

export const NavToggle = ({ HStack, Icon }) => ({
  open,
  brand,
  pageNav,
  onClick,
}) => {
  return (
    <HStack
      x="center"
      y="center"
      box={{
        display: ['flex', { lg: 'hidden' }],
        position: 'fixed',
        zIndex: 40,
        padding: [{ bottom: pageNav ? 16 : 0 }, { bottom: 0 }],
      }}
      style={{ bottom: 10, right: 10 }}
      onClick={() => onClick && onClick()}
    >
      <Icon
        name={open ? 'close' : 'bars'}
        size="4xl"
        color={[brand.screen.color, { hover: brand.primary }]}
        box={{
          padding: 3,
          borderRadius: 'full',
          bgColor: [null, { hover: 'gray-900' }],
        }}
      />
    </HStack>
  )
}
