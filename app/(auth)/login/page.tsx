import {
  Box,
  Title,
  Text,
  Button,
  Flex,
  Image,
  TextInput,
  Center,
  Anchor,
  Space
} from '@mantine/core'
import { IconMail, IconArrowUpRight } from '@tabler/icons-react'
import { Logo } from '../../../common/logo'

import { ForgotPasswordInput } from '../../../components/auth/PasswordInput'

export default function Login() {
  return (
    <Box w='100%' px='60px'>
      <Box mb='xl'>
        <Logo />
      </Box>

      <Box mb='lg'>
        <Title order={2}>Welcome back!</Title>
        <Text mb='sm' c='dimmed'>Please login with your work email.</Text>

        <Text component="label" htmlFor="your-password" size="sm" fw={500}>
          Email
        </Text>
        <TextInput leftSection={<IconMail size={16} />} placeholder="example@gmail.com" id="your-email" mb='xs' />

        <ForgotPasswordInput />
      </Box>

      <Button w='100%' mb='6px'>Login</Button>
      <Center>

        <Text c='dimmed' size='xs'>
          Don't have an account yet?&nbsp;
        </Text>

        <Anchor td='underline' href='/register' c='black' fw={500} size='xs' pos='relative'>
          Register now!<IconArrowUpRight size='16px' style={{ marginBottom: '-4px' }} />
        </Anchor>

      </Center>

      <Space h='xl' />

    </Box>
  )
}


