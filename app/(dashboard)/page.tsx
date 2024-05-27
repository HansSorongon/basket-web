import { Flex, Title, Divider, Box } from '@mantine/core'

import FilterButtons from '../../components/filter/FilterButtons';
import OptionButtons from '../../components/options/OptionButtons'
import AssetTable from '../../components/assetTable/AssetTable'

export default function View() {
  return (
    <Flex pl='xl' pr='xl' pt='lg' w='80vw' direction='column'>

      <Title lineClamp={1}>View Assets</Title>
      <Divider my='md' />

      <FilterButtons />
      <OptionButtons />

      <Box h='65vh'>
        <AssetTable />
      </Box>

    </Flex >
  );
}
