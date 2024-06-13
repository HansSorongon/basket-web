import { Flex, Title, Divider, Button } from '@mantine/core'
import DataTableContainer from '../../components/DataTableContainer';

import { cookies } from 'next/headers'

function verify() {

  const cookieStore = cookies();

  if (cookieStore.has('Auth')) {
    console.log(cookieStore.get('Auth')?.value);
  } else {
    console.log("Not Authenticated!")
  }

  // const res = await fetch('https://basket-api.onrender.com/api/v1/auth/register', {
  //   method: 'POST',
  //   body: JSON.stringify(credentials)
  // });

}

export default function Bundle() {

  verify()

  return (
    <Flex direction='column'>

      < Title lineClamp={1} > View Assets</Title >
      <Divider my='md' />

      <DataTableContainer />

    </Flex >
  );
}
