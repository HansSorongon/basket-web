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

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Flex>

      <Flex w='25vw' align='center' justify='center' bg='white'>
        {children}
      </Flex>

      <Box w='75vw' h='100vh'>
        <Image src='basket_background.jpg' h='100%'></Image>
      </Box>

    </Flex>
  )
}


