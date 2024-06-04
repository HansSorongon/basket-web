import { Flex, Container } from '@mantine/core'

import Navbar from "../../components/navbar/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Flex direction='row'>
        <Navbar />
        <Container p='lg' w='83vw' fluid>
          {children}
        </Container>
      </Flex>
    </section>
  )
}
