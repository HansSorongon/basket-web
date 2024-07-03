'use client'

import { Title, Group, Button, Box, Modal } from '@mantine/core'
import AssetTable from '../../assetTable/AssetTable'

import { IconCircleMinus, IconSearch, IconPlus, IconX } from '@tabler/icons-react'

import FilterButtons from '../../filter/FilterButtons';
import { Asset } from '../../../common/types'

export function ModifySection(parentAsset: Asset, bundleData: Asset[], selectedRecordsCurr: Asset[], setSelectedRecordsCurr: any, queueModalOpened: boolean, openQueueModal: any, closeQueueModal: any) {

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
        <AssetTable selectedRecords={selectedRecordsCurr} setSelectedRecords={setSelectedRecordsCurr} columns={initialColumns} data={bundleData} />
      </Box>

      <Modal opened={queueModalOpened} onClose={closeQueueModal} title={<Title order={2}>Select assets to queue</Title>} size='75%' padding='lg' radius='lg' centered>

        <FilterButtons applyFilter={() => { console.log("TEST") }} />
        <Box h='40vh'>
          <AssetTable
            data={[]}
            columns={[]}
          />
        </Box>


      </Modal>

      <Group justify='space-between'>
        <Title order={3} mb='xs'>Add Assets Queue</Title>

        <Group>
          <Button variant='filled' color='red' mb='xs' leftSection={<IconX size={20} />}>Remove</Button>
          <Button onClick={openQueueModal} variant='filled' mb='xs' leftSection={<IconSearch size={20} />}>Add to Queue</Button>
          <Button variant='filled' mb='xs' leftSection={<IconPlus size={20} />}>Add to Bundle</Button>
        </Group>
      </Group >

      <Box h='20vh' mb='md'>
        <AssetTable columns={[]} data={[]} />
      </Box>
    </>
  )
}

