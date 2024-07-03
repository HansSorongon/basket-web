'use client'

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'

import { useState } from 'react'
import { Title, Group, Button, Box, Modal, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import AssetTable from '../../assetTable/AssetTable'

import { IconCircleMinus, IconSearch, IconPlus, IconX } from '@tabler/icons-react'

import { unbundleAssets } from '../../../actions/actions';
import FilterButtons from '../../filter/FilterButtons';
import { Asset } from '../../../common/types'
import ColumnButton from '../../buttons/ColumnButton';

const fetcher = (url: string) => fetch(url, { method: 'GET' }).then((res) => res.json())

export default function ModifySection({ parentAsset, assetData }:
  {
    parentAsset: Asset,
    assetData: Asset[],
  }
) {

  const url = 'https://basket-api.onrender.com/api/v1/bundles/' + parentAsset.bundleParentID
  const { trigger, isMutating } = useSWRMutation(url, fetcher)

  async function handleUnbundle(bundleId: number, assetIds: number[]) {
    await unbundleAssets(bundleId, assetIds);
    trigger();
  }

  const { data } = useSWR(
    url,
    fetcher,
    {
      onError: (error: any) => {
        console.error('Failed to fetch resource: ', error);
      }
    })

  const initialColumns = ['assetNum', 'assetType', 'assetModel', 'serialNum', 'bundleNum', 'status', 'statEffDate',
    'employeeID', 'location', 'locRemarks', 'recInvDate']

  const [opened, { open, close }] = useDisclosure(false)
  const [modalColumns, setModalColumns] = useState<string[]>(initialColumns)
  const [selectedRecordsCurr, setSelectedRecordsCurr] = useState<Asset[]>([])
  const [selectedRecordsAdd, setSelectedRecordsAdd] = useState<Asset[]>([])
  const [selectedRecordsQueue, setSelectedRecordsQueue] = useState<Asset[]>([])

  const [assetQueue, setAssetQueue] = useState<Asset[]>([])

  return (
    <>
      <Title order={3} mb='xs'>Parent Asset</Title>
      <Box mb='md'>
        <AssetTable columns={initialColumns} data={[parentAsset]} />
      </Box>

      <Group justify='space-between'>
        <Title order={3} mb='xs'>Currently Bundled Assets</Title>

        <Button onClick={() => handleUnbundle(parentAsset.bundleParentID, Object.values(selectedRecordsCurr).map(item => item.id))} variant='filled' color='red' mb='xs' leftSection={<IconCircleMinus size={20} />}>Unbundle Selected</Button>
      </Group>

      <Box h='20vh' mb='md'>
        <AssetTable selectedRecords={selectedRecordsCurr} setSelectedRecords={setSelectedRecordsCurr} columns={initialColumns} data={data ? data.Assets : []} />
      </Box>

      <Modal opened={opened} onClose={close} size='75%' padding='lg' radius='lg' centered>

        <FilterButtons applyFilter={() => { console.log("TEST") }}>
          <ColumnButton columns={modalColumns} setColumns={setModalColumns} />
        </FilterButtons>
        <Box h='40vh'>
          <AssetTable
            selectedRecords={selectedRecordsAdd}
            setSelectedRecords={setSelectedRecordsAdd}
            data={assetData && data ? assetData.filter((elem: Asset) => !assetQueue?.includes(elem) && !data.Assets?.includes(elem)) : []}
            columns={initialColumns}
          />
        </Box>

        <Flex justify='flex-end' mt='xs'>
          <Button onClick={() => { close(), setAssetQueue([...assetQueue, ...selectedRecordsAdd] as Asset[]) }} variant='filled' mb='xs'>Add to Queue</Button>
        </Flex>

      </Modal>

      <Group justify='space-between'>
        <Title order={3} mb='xs'>Add Assets Queue</Title>

        <Group>
          <Button onClick={() => setAssetQueue(assetQueue.filter((elem: Asset) => !selectedRecordsQueue.includes(elem)))} variant='filled' color='red' mb='xs' leftSection={<IconX size={20} />}>Remove</Button>
          <Button onClick={open} variant='filled' mb='xs' leftSection={<IconSearch size={20} />}>Add to Queue</Button>
          <Button variant='filled' mb='xs' leftSection={<IconPlus size={20} />}>Add to Bundle</Button>
        </Group>
      </Group >

      <Box h='20vh' mb='md'>
        <AssetTable selectedRecords={selectedRecordsQueue} setSelectedRecords={setSelectedRecordsQueue} columns={initialColumns} data={assetQueue ?? []} />
      </Box>
    </>
  )
}

