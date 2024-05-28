import { Flex, Title, Divider, Box } from '@mantine/core'

import { Suspense } from 'react';
import FilterButtons from '../../components/filter/FilterButtons';
import OptionButtons from '../../components/options/OptionButtons';
import AssetTable from '../../components/assetTable/AssetTable';


async function FilledAssetsTable() {
  'use server'

  const res = await fetch('http://localhost:8080/api/v1/assets');
  let data = await res.json();

  return <AssetTable importedRecords={data} />
}

export default function Bundle() {
  return (
    <Flex direction='column'>

      < Title lineClamp={1} > View Assets</Title >
      <Divider my='md' />

      <FilterButtons />
      <OptionButtons />

      <Box h='65vh'>
        <Suspense fallback={<Title>Loading...</Title>}>
          <FilledAssetsTable />
        </Suspense>
      </Box>

    </Flex >
  );
}
