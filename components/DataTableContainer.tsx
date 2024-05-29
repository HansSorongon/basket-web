
import { Box } from '@mantine/core'

import AssetTable from './assetTable/AssetTable';
import OptionButtons from './options/OptionButtons'
import { Asset } from '../common/types';

interface DataTableContainerProps {
  importedRecords: Asset[];
}

export default function DataTableContainer({ importedRecords }: DataTableContainerProps) {

  return (
    <Box>
      <OptionButtons />
      <AssetTable importedRecords={importedRecords} />
    </Box>
  )

}
