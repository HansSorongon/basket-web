import { Flex, Container } from '@mantine/core'
import { cookies } from 'next/headers'

import Navbar from "../../components/navbar/Navbar"
import { authenticate } from '../../actions/actions'

async function fetchUserDetails() {

  const cookieStore = cookies();
  const token = cookieStore.get('Auth')?.value

  if (token) {
    const userDetails = await authenticate(token);
    return userDetails
  }

  // this shouldn't happen
  return {};
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userData = fetchUserDetails()

  const [userDetails] = await Promise.all([userData])

  return (
    <section>
      <Flex direction='row'>
        <Navbar userDetails={userDetails} />
        <Container p='lg' w='83vw' fluid>
          {children}
        </Container>
      </Flex>
    </section>
  )
}
