'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { useState, useEffect } from 'react'
import { Title, Group, Button, Box, Modal, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import AssetTable from '../../assetTable/AssetTable'

import { IconCircleMinus, IconSearch, IconPlus, IconX } from '@tabler/icons-react'

import { unbundleAssets, bundleAssets } from '../../../actions/actions'
import FilterButtons from '../../filter/FilterButtons'
import { Asset } from '../../../common/types'
import ColumnButton from '../../buttons/ColumnButton'
import { createBundle } from '../../../actions/actions'

// const fetcher = (url: string) => fetch(url, { method: 'GET', cache: 'no-store' }).then((res) => res.json())

const fetcher = (url: string) => fetch(url, { method: 'GET', cache: 'no-store' })
  .then(async (res) => {
    if (!res.ok) {
      return "NO_BUNDLE"
    }
    return res.json();
  })

export default function ModifySection({ parentAsset, assetData }:
  {
    parentAsset: Asset,
    assetData: Asset[],
  }
) {

  const initialColumns = ['assetNum', 'assetType', 'assetModel', 'serialNum', 'bundleNum', 'status', 'statEffDate',
    'employeeID', 'location', 'locRemarks', 'recInvDate']


  const [bundleData, setBundleData] = useState<any>([])
  const [parentBundleId, setParentBundleId] = useState<number | null>(null)

  const url = 'https://basket-api.onrender.com/api/v1/bundles/' + parentBundleId
  const { trigger, isMutating } = useSWRMutation(url, fetcher)

  const { data } = useSWR(
    () => parentAsset.bundleParentID ? url : null,
    fetcher,
    {
      onError: (error: any) => {
        console.error('Failed to fetch resource: ', error)
      }
    })

  useEffect(() => {

    console.log(data)

    if (!parentAsset.bundleParentID) {
      setBundleData(undefined)
    } else {
      setBundleData(data)
      setParentBundleId(parentAsset.bundleParentID)
    }

  }, [data])

  const [opened, { open, close }] = useDisclosure(false)
  const [modalColumns, setModalColumns] = useState<string[]>(initialColumns)
  const [selectedRecordsCurr, setSelectedRecordsCurr] = useState<Asset[]>([])
  const [selectedRecordsAdd, setSelectedRecordsAdd] = useState<Asset[]>([])
  const [selectedRecordsQueue, setSelectedRecordsQueue] = useState<Asset[]>([])
  const [assetQueue, setAssetQueue] = useState<Asset[]>([])
  const [unbundledAssets, setUnbundledAssets] = useState<Asset[]>(assetData.filter((elem: Asset) => !assetQueue?.includes(elem) && !data?.Assets?.includes(elem) && (elem.assetNum != parentAsset.assetNum)))

  async function handleUnbundle(bundleId: number, assetIds: number[]) {
    await unbundleAssets(bundleId, assetIds)
    setUnbundledAssets(assetData.filter((elem: Asset) => !assetQueue?.includes(elem) && !data?.Assets?.includes(elem)))
    setSelectedRecordsCurr([])
    trigger()
  }

  async function handleBundle(bundleId: number, assetIds: number[]) {

    if (data) {
      await bundleAssets(bundleId, assetIds)
      setAssetQueue([])
      setUnbundledAssets(assetData.filter((elem: Asset) => !assetQueue?.includes(elem) && !data?.Assets?.includes(elem)))
      setSelectedRecordsAdd([])
      trigger()
    } else {
      console.log("Creating bundle...")

      const newBundleId = await createBundle(parentAsset.id)
      setParentBundleId(newBundleId)

      console.log("Created new bundle!")

      if (!newBundleId) {
        console.log("Failed to create new bundle! " + newBundleId)
        return
      }

      await bundleAssets(newBundleId, assetIds)

      setAssetQueue([])
      setUnbundledAssets(assetData.filter((elem: Asset) => !assetQueue?.includes(elem) && !data?.Assets?.includes(elem)))
      setSelectedRecordsAdd([])

      parentAsset.bundleParentID = newBundleId

      trigger()
      setBundleData(data)

      console.log(data)
    }

  }

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
        <AssetTable selectedRecords={selectedRecordsCurr} setSelectedRecords={setSelectedRecordsCurr} columns={initialColumns} data={bundleData ? bundleData.Assets : []} />
      </Box>

      <Modal opened={opened} onClose={close} size='75%' padding='lg' radius='lg' centered>

        <FilterButtons applyFilter={() => { console.log("TEST") }}>
          <ColumnButton columns={modalColumns} setColumns={setModalColumns} />
        </FilterButtons>
        <Box h='40vh'>
          <AssetTable
            selectedRecords={selectedRecordsAdd}
            setSelectedRecords={setSelectedRecordsAdd}
            data={assetData ? unbundledAssets : []}
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
          <Button onClick={() => handleBundle(parentAsset.bundleParentID, Object.values(assetQueue).map(item => item.id))} variant='filled' mb='xs' leftSection={<IconPlus size={20} />}>Add to Bundle</Button>
        </Group>
      </Group >

      <Box h='20vh' mb='md'>
        <AssetTable selectedRecords={selectedRecordsQueue} setSelectedRecords={setSelectedRecordsQueue} columns={initialColumns} data={assetQueue ?? []} />
      </Box>
    </>
  )
}

