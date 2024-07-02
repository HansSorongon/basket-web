'use client'

import { Title, Group, Button, Box, Checkbox } from '@mantine/core'
import { DataTable } from 'mantine-datatable';
import AssetTable from '../../assetTable/AssetTable'

import { IconCircleMinus, IconSearch, IconPlus, IconX } from '@tabler/icons-react'

import { Asset } from '../../../common/types'

export function ModifySection(parentAsset: Asset) {

  const initialColumns = ['assetNum', 'assetType', 'assetModel', 'serialNum', 'bundleNum', 'status', 'statEffDate',
    'employeeID', 'location', 'locRemarks', 'recInvDate']

  return (
    <>
      <Title order={3} mb='xs'>Parent Asset</Title>
      <Box mb='md'>
        <AssetTable columns={initialColumns} data={[parentAsset]} />
      </Box>

      <Group justify='space-between'>
        <Title order={3} mb='xs'>Currently Bundled Assets</Title>

        <Button variant='filled' color='red' mb='xs' leftSection={<IconCircleMinus size={20} />}>Unbundle Selected</Button>
      </Group>

      <Box h='20vh' mb='md'>
        <AssetTable selectedRecords={[]} setSelectedRecords={() => console.log("(N)")} columns={[]} data={[]} />
      </Box>

      <Group justify='space-between'>
        <Title order={3} mb='xs'>Add Assets Queue</Title>

        <Group>
          <Button variant='filled' color='red' mb='xs' leftSection={<IconX size={20} />}>Remove</Button>
          <Button variant='filled' mb='xs' leftSection={<IconSearch size={20} />}>Add to Queue</Button>
          <Button variant='filled' mb='xs' leftSection={<IconPlus size={20} />}>Add to Queue</Button>
        </Group>
      </Group>

      <Box h='20vh' mb='md'>
        <AssetTable columns={[]} data={[]} />
      </Box>
    </>
  )
}

