import { Flex, Title, Divider, Button } from '@mantine/core'
import DataTableContainer from '../../components/DataTableContainer';

import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'

export default function View() {

  return (
    <Flex direction='column'>

      < Title lineClamp={1} > View Assets</Title >
      <Divider my='md' />

      <DataTableContainer />

    </Flex >
  );
}
