'use client'

import AssetTable from './assetTable/AssetTable';
import OptionButtons from './options/OptionButtons'
import { Asset } from '../common/types';

interface DataTableContainerProps {
  importedRecords: Asset[];
}

export default function DataTableContainer({ importedRecords }: DataTableContainerProps) {

  return (
    <>
      <OptionButtons />
      <AssetTable importedRecords={importedRecords} />
    </>
  )

}
