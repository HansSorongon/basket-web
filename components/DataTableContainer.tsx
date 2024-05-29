'use client'

import { useState, Suspense } from 'react'
import { Box, Center, Loader } from '@mantine/core'

import AssetTable from './assetTable/AssetTable';
import OptionButtons from './options/OptionButtons'
import { Asset } from '../common/types';

interface DataTableContainerProps {
  importedRecords: Asset[];
}

export default function DataTableContainer({ importedRecords }: DataTableContainerProps) {

  const [selectedRecords, setSelectedRecords] = useState<Asset[]>([])

  return (
    <>
      <OptionButtons selectedRecords={selectedRecords} />

      <Box h='65vh'>
        <Suspense fallback={
          <Center>
            <Loader type='dots' />
          </Center>
        }>
          <AssetTable
            importedRecords={importedRecords}
            selectedRecords={selectedRecords}
            setSelectedRecords={setSelectedRecords}
          />
        </Suspense>
      </Box>
    </>
  )
}
