
import {
  Box,
  Title,
  Text,
  Center,
  Anchor,
  Space
} from '@mantine/core'
import { cookies } from 'next/headers'
import { IconArrowUpRight } from '@tabler/icons-react'
import { Logo } from '../../../common/logo'

import { redirect } from 'next/navigation'

import { LoginForm } from '../../../components/auth/LoginForm'

async function login(credentials: Record<string, any>) {
  'use server'

  console.log("Logging in!")

  const res = await fetch('https://basket-api.onrender.com/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });


  if (!res.ok) {
    console.error("Login failed!");
    return "Failed";
  }

  console.log("Login success!");

  const resCookies = res.headers.get('set-cookie');

  if (resCookies) {
    const authCookie = resCookies.split(';')[0].split('=')[1];
    cookies().set('Auth', authCookie);
  }

  redirect('/')
}

export default function Login() {

  return (
    <Box w='100%' px='60px'>
      <Box mb='xl'>
        <Logo />
      </Box>

      <Box mb='lg'>
        <Title order={2}>Welcome back!</Title>
        <Text mb='sm' c='dimmed'>Please login with your work email.</Text>

        <LoginForm loginCallback={login} />
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

