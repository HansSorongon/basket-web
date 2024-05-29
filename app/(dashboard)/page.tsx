import { Flex, Title, Divider, Box, Center, Loader } from '@mantine/core'

import { Suspense } from 'react';
import FilterButtons from '../../components/filter/FilterButtons';
import OptionButtons from '../../components/options/OptionButtons';
import AssetTable from '../../components/assetTable/AssetTable';

import { Asset } from '../../common/types';

import DataTableContainer from '../../components/DataTableContainer';

async function FilledDataTableContainer() {
  'use server'

  const res = await fetch('https://basket-api.onrender.com/api/v1/assets', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });

  let data: Array<Asset> = await res.json();

  return <DataTableContainer importedRecords={data} />;
}

export default function Bundle() {
  return (
    <Flex direction='column'>

      < Title lineClamp={1} > View Assets</Title >
      <Divider my='md' />

      <FilterButtons />
      <FilledDataTableContainer />

    </Flex >
  );
}
