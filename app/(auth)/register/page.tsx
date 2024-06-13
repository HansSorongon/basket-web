import {
  Box,
  Title,
  Text,
  Button,
  Center,
  Anchor,
  Space,
} from '@mantine/core'
import { IconArrowUpRight } from '@tabler/icons-react'
import { Logo } from '../../../common/logo'

import RegisterForm from '../../../components/auth/RegisterForm'

export default function Login() {
  return (
    <Box w='80%'>
      <Box mb='xl'>
        <Logo />
      </Box>

      <Box mb='lg'>
        <Title order={2}>Register an Account</Title>
        <Text mb='sm' c='dimmed'>Please provide your details below.</Text>

        <RegisterForm />
      </Box>

      <Center>

        <Text c='dimmed' size='xs'>
          Already have an account?&nbsp;
        </Text>

        <Anchor td='underline' href='/login' c='black' fw={500} size='xs' pos='relative'>
          Login now!<IconArrowUpRight size='16px' style={{ marginBottom: '-4px' }} />
        </Anchor>

      </Center>

      <Space h='xl' />

    </Box>
  )
}
