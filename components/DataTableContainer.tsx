'use client'

import { useState } from 'react'
import { Box } from '@mantine/core'
import useSWR from 'swr';

import useSWRMutation from 'swr/mutation'

import AssetTable from './assetTable/AssetTable';
import OptionButtons from './options/OptionButtons'
import FilterButtons from './filter/FilterButtons';

import { Asset } from '../common/types';

const fetcher = (url: string) => fetch(url, { method: 'GET' }).then((res) => res.json());

export default function DataTableContainer() {

  const [filters, setFilters] = useState({})

  const { trigger, isMutating } = useSWRMutation('https://basket-api.onrender.com/api/v1/assets', fetcher, /* options */)

  const { data } = useSWR(
    'https://basket-api.onrender.com/api/v1/assets',
    fetcher,
    {
      onError: (error) => {
        console.error('Failed to fetch resource: ', error);
      }
    })

  const [selectedRecords, setSelectedRecords] = useState<Asset[]>([])

  return (
    <Box>
      <FilterButtons setFilters={setFilters} />
      <OptionButtons selectedRecords={selectedRecords} trigger={trigger} />
      <Box h='65vh'>
        <AssetTable
          selectedRecords={selectedRecords}
          setSelectedRecords={setSelectedRecords}
          isMutating={isMutating}
          data={data}
        />
      </Box>
    </Box>
  )
}
