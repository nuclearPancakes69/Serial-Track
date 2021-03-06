import React from 'react'
import { task, Link } from '@z1/lib-feature-box'

// main
export const elements = task(
  t => ({
    Box,
    Button,
    VStack,
    HStack,
    Icon,
    Spinner,
    Text,
    SchemaForm,
    Match,
    When,
  }) => ({
    ViewContainer({ children, box, large, center }) {
      return (
        <VStack
          x="center"
          y={t.not(center) ? 'top' : 'center'}
          box={{
            padding: { x: 4, top: 8, bottom: 4 },
            width: [
              'full',
              {
                sm: '8/12',
                md: t.not(large) ? '5/12' : '6/12',
                lg: t.not(large) ? '5/12' : '5/12',
                xl: t.not(large) ? '3/12' : '4/12',
              },
            ],
            margin: { x: 'auto' },
          }}
          next={ui => ui.next(box || {})}
        >
          {children}
        </VStack>
      )
    },
    ViewSpinner({ text }) {
      return (
        <VStack x="center" y="center">
          <Spinner size="xl" />
          <When is={t.not(t.isNil(text))}>
            <Text>{text}</Text>
          </When>
        </VStack>
      )
    },
    ViewHeading({ title, text, icon, box }) {
      return (
        <VStack box={t.merge({ padding: { bottom: 4 } }, box || {})}>
          <HStack x="center" y="center">
            <When is={t.not(t.isNil(icon))}>
              <Icon name={icon} />
            </When>
            <Text
              size={['3xl', { lg: '4xl' }]}
              lineHeight="tight"
              alignX="center"
            >
              {title}
            </Text>
          </HStack>
          <HStack x="center" y="center" box={{ padding: { top: 3 } }}>
            <Text
              alignX="center"
              letterSpacing="tight"
              size={['lg', { lg: 'xl' }]}
            >
              {text}
            </Text>
          </HStack>
        </VStack>
      )
    },
    ViewForm(props) {
      return (
        <Box
          as={SchemaForm}
          box={{
            display: 'block',
            width: 'full',
            color: 'white',
            padding: { top: 3 },
          }}
          className="form-dark"
          {...props}
        />
      )
    },
    ViewButton({
      type,
      text,
      children,
      icon,
      onClick,
      loading,
      to,
      box,
      color,
      ...props
    }) {
      const nextColor = color || 'yellow-500'
      const buttonProps = t.isNil(onClick)
        ? t.isNil(to)
          ? { type }
          : { type, as: Link, to }
        : { type, onClick }
      const buttonContent = t.not(loading) ? 'content' : 'spinner'
      return (
        <Button
          {...buttonProps}
          bg={[
            null,
            {
              hover: t.eq(buttonContent, 'content') ? nextColor : 'transparent',
            },
          ]}
          size="lg"
          color={[nextColor, { hover: 'gray-900' }]}
          radius="lg"
          border={[nextColor, { hover: nextColor }]}
          borderWidth={2}
          box={{ width: 'full' }}
          next={ui => ui.next(box || {})}
          style={{ minHeight: 55 }}
          disabled={loading}
          {...props}
        >
          <Match
            value={buttonContent}
            when={{
              content: (
                <React.Fragment>
                  {t.isNil(icon) ? null : <Icon name={icon} />}
                  {t.isNil(text) ? null : <Text>{text}</Text>}
                  {children}
                </React.Fragment>
              ),
              spinner: (
                <Spinner size="xs" box={{ height: 6, padding: { y: 1 } }} />
              ),
            }}
          />
        </Button>
      )
    },
    ViewLink({ to, text, children, icon, box, textBox }) {
      return (
        <HStack box={box}>
          <When is={t.not(t.isNil(icon))}>
            <Icon name={icon} />
          </When>
          <Text
            as={Link}
            to={to}
            alignX="center"
            box={{
              fontWeight: 'bold',
              color: ['green-500', { hover: 'white' }],
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'col',
              padding: { x: 3 },
            }}
            next={ui => ui.next(textBox || {})}
          >
            {text || children}
          </Text>
        </HStack>
      )
    },
    ViewAlert({ text, children, color, bgColor, icon, box }) {
      return (
        <HStack
          x="left"
          y="center"
          box={{
            padding: { x: 3, y: 3 },
            margin: { y: 2 },
            color,
            bgColor,
            ...box,
          }}
        >
          <When is={t.not(t.isNil(icon))}>
            <Icon
              name={icon}
              as="div"
              size="3xl"
              box={{ margin: { right: 3 } }}
            />
          </When>
          <When is={t.not(t.isNil(text))}>
            <Text size="lg" weight="semibold">
              {text}
            </Text>
          </When>
          {children}
        </HStack>
      )
    },
  })
)
