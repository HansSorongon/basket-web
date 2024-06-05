import { Flex, Title, Divider, Box, Center, Loader } from '@mantine/core'
import DataTableContainer from '../../components/DataTableContainer';

export default function Bundle() {
  return (
    <Flex direction='column'>

      < Title lineClamp={1} > View Assets</Title >
      <Divider my='md' />

      <DataTableContainer />

    </Flex >
  );
}
