import {
  Box,
  Title,
  Text,
  Group,
  Button,
  TextInput,
  Center,
  Anchor,
  Space,
  Select,
  PasswordInput
} from '@mantine/core'
import { IconMail, IconArrowUpRight, IconLock, IconUsers } from '@tabler/icons-react'
import { Logo } from '../../../common/logo'

import { ForgotPasswordInput } from '../../../components/auth/PasswordInput'

export default function Login() {
  return (
    <Box w='80%'>
      <Box mb='xl'>
        <Logo />
      </Box>

      <Box mb='lg'>
        <Title order={2}>Register an Account</Title>
        <Text mb='sm' c='dimmed'>Please provide your details below.</Text>

        <TextInput label='First Name' placeholder="Gabriel Alfonso" id="firstName" mb='xs' />

        <Group justify='space-between'>
          <TextInput label='Last Name' placeholder="Mortelli" id="firstName" mb='xs' w='65%' />
          <TextInput label='Middle Initial' placeholder="P" id="firstName" mb='xs' w='30%' />
        </Group>

        <TextInput label='Email' leftSection={<IconMail size={16} />} placeholder="example@gmail.com" id="your-email" mb='xs' />

        <PasswordInput label='Password' placeholder='••••••••••••' leftSection={<IconLock size='16px' />} mb='xs' />
        <PasswordInput label='Confirm Password' placeholder='••••••••••••' leftSection={<IconLock size='16px' />} mb='xs' />

        <Select leftSection={<IconUsers size={16} />} placeholder='Select a department...' label='Department' mb='xs'
          data={['Administrative', 'Human Resources', 'Purchasing', 'IT Operations', 'Sales', 'Marketing', 'Accounting', 'Finance']}
        >
        </Select>
      </Box>

      <Button w='100%' mb='6px'>Register</Button>
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
