import {
  Box,
  Title,
  Text,
  Button,
  Flex,
  Image,
  TextInput,
  Center,
  Anchor

} from '@mantine/core'
import { IconMail } from '@tabler/icons-react'
import { Logo } from '../../../common/logo'

import { ForgotPasswordInput } from '../../../components/auth/PasswordInput'

export default function Login() {
  return (
    <Flex>

      <Flex w='22vw' align='center' justify='center'>
        <Box w='80%'>
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
              <Anchor>
                Register now!
              </Anchor>
            </Text>
          </Center>

        </Box>
      </Flex>


      <Box w='78vw' h='100vh'>
        <Image src='basket_background.jpg' h='100%'></Image>
      </Box>

    </Flex>
  )
}
