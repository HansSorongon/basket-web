'use client'

import { useState, useEffect, Suspense } from 'react'
import { Box, Center, Loader, Button } from '@mantine/core'

import useSWRMutation from 'swr/mutation'

import AssetTable from './assetTable/AssetTable';
import OptionButtons from './options/OptionButtons'

import { Asset } from '../common/types';

const fetcher = (url: string) => fetch(url, { method: 'GET' }).then((res) => res.json());

export default function DataTableContainer() {

  const { trigger, isMutating } = useSWRMutation('https://basket-api.onrender.com/api/v1/assets', fetcher, /* options */)

  const [selectedRecords, setSelectedRecords] = useState<Asset[]>([])

  return (
    <>
      <OptionButtons selectedRecords={selectedRecords} trigger={trigger} />

      <Box h='65vh'>
        <Suspense fallback={
          <Center>
            <Loader type='dots' />
          </Center>
        }>
          <AssetTable
            selectedRecords={selectedRecords}
            setSelectedRecords={setSelectedRecords}
            fetcher={fetcher}
            isMutating={isMutating}
          />
        </Suspense>
      </Box>
    </>
  )
}
