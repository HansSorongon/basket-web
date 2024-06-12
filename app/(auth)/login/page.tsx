
import {
  Box,
  Title,
  Text,
  Button,
  Center,
  Anchor,
  Space
} from '@mantine/core'
import { IconArrowUpRight } from '@tabler/icons-react'
import { Logo } from '../../../common/logo'

import { LoginForm } from '../../../components/auth/LoginForm'

export default function Login() {

  return (
    <Box w='100%' px='60px'>
      <Box mb='xl'>
        <Logo />
      </Box>

      <Box mb='lg'>
        <Title order={2}>Welcome back!</Title>
        <Text mb='sm' c='dimmed'>Please login with your work email.</Text>

        <LoginForm />
      </Box>

      <Center>

        <Text c='dimmed' size='xs'>
          Don&apos;t have an account yet?&nbsp;
        </Text>

        <Anchor td='underline' href='/register' c='black' fw={500} size='xs' pos='relative'>
          Register now!<IconArrowUpRight size='16px' style={{ marginBottom: '-4px' }} />
        </Anchor>

      </Center>

      <Space h='xl' />

    </Box>
  )
}

