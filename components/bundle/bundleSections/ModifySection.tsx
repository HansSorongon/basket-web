'use client'

import { Title, Group, Button, Box } from '@mantine/core'
import AssetTable from '../../assetTable/AssetTable'

import { IconCircleMinus, IconSearch, IconPlus, IconX } from '@tabler/icons-react'

export function ModifySection() {
  return (
    <>
      <Title order={3} mb='xs'>Parent Asset</Title>
      <Box h='9vh' mb='md'>
        <AssetTable selectedRecords={[]} setSelectedRecords={() => console.log("(N)")} columns={[]} data={[]} emptyState={<></>} />
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
        <AssetTable selectedRecords={[]} setSelectedRecords={() => console.log("(N)")} columns={[]} data={[]} />
      </Box>
    </>
  )
}

