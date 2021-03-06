import React from 'react'
import { task, NavLink } from '@z1/lib-feature-box'

// elements
const NavSecondaryHeader = task(
  t => ({ HStack, Icon, Text, When }) => ({ title, icon, brand }) => {
    return (
      <HStack
        x="left"
        y="center"
        box={{ padding: { top: 6, left: 3, right: 2, bottom: 6 } }}
      >
        <When is={t.not(t.isNil(icon))}>
          <Icon
            name={icon}
            size="3xl"
            color={brand.nav.secondary.headerColor}
            box={{ alignSelf: 'center', margin: { right: 3 } }}
          />
        </When>
        <Text
          size="2xl"
          color={brand.nav.secondary.headerColor}
          family={brand.fontFamily}
          lineHeight="tight"
        >
          {title}
        </Text>
      </HStack>
    )
  }
)
const NavSecondaryItem = task(
  t => ({ HStack, Icon, Spacer, Text, toCss, When }) => ({
    title,
    icon,
    path,
    brand,
    alert,
    exact,
    size,
    color,
  }) => {
    return (
      <HStack
        as={NavLink}
        to={path || '/'}
        x="left"
        y="center"
        box={{
          color: t.isNil(color) ? brand.nav.secondary.color : color,
          padding: { y: 5, x: 4 },
          bgColor: [null, { hover: brand.nav.secondary.bgHover }],
        }}
        activeClassName={toCss({
          bgColor: brand.nav.secondary.bgActive,
        })}
        exact={t.isNil(exact) ? false : exact}
      >
        <When is={t.not(t.isNil(icon))}>
          <Icon
            name={icon}
            size={t.isNil(size) ? '2xl' : size}
            box={{ alignSelf: 'center', margin: { right: 3 } }}
          />
        </When>
        <Text size={t.isNil(size) ? 'xl' : size} family={brand.fontFamily}>
          {title}
        </Text>
        <When is={t.not(t.isNil(alert))}>
          <Spacer />
          <Icon
            name={alert.icon}
            size="xl"
            color={alert.color || brand.secondary}
            box={{ alignSelf: 'center', margin: { left: 2 } }}
          />
        </When>
      </HStack>
    )
  }
)

// main
export const NavSecondary = ({
  VStack,
  HStack,
  Icon,
  Spacer,
  Text,
  toCss,
  When,
  MapIndexed,
}) => {
  const SecondaryHeader = NavSecondaryHeader({
    HStack,
    Icon,
    Spacer,
    Text,
    When,
  })
  const SecondaryItem = NavSecondaryItem({
    HStack,
    Icon,
    Spacer,
    Text,
    toCss,
    When,
  })
  return ({ title, icon, width, left, bottom, items, brand }) => {
    return (
      <VStack
        x="left"
        y="top"
        box={{
          position: 'fixed',
          pin: { top: true, bottom: true },
          bgColor: brand.nav.secondary.bg,
          zIndex: 30,
          shadow: ['2xl', { lg: 'none' }],
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        className="scroll-hide"
        style={{ width, left, bottom }}
      >
        <SecondaryHeader title={title} icon={icon} brand={brand} />
        <MapIndexed
          list={items || []}
          render={({ item, index }) => (
            <SecondaryItem key={index} brand={brand} {...item} />
          )}
        />
      </VStack>
    )
  }
}
