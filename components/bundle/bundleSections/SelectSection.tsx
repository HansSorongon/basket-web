'use client'

import { Title, Divider, Flex, TextInput, Group, Button, Box } from '@mantine/core'

import AssetTable from '../../assetTable/AssetTable'
import { Asset } from '../../../common/types'

import { IconFilter, IconSearch, IconLayoutColumns, IconChevronDown } from '@tabler/icons-react'

export function SelectSection(data: Asset[], rowClickCallback: any) {

  const initialColumns = ['assetNum', 'assetType', 'assetModel', 'serialNum', 'bundleNum', 'status', 'statEffDate',
    'employeeID', 'location', 'locRemarks', 'recInvDate']

  return (
    <>
      <Title order={3} mb='xs'>Select Parent Assets</Title>
      <Divider mb='md' />

      <Flex justify='space-between' mb='md'>
        <TextInput leftSection={<IconSearch size='20px' />} placeholder='Search by Asset No.' onChange={() => console.log("PLACEHOLDER")} />

        <Group>
          <Button variant='light' color='rgba(0, 0, 0, 1)' leftSection={<IconLayoutColumns size='20px' />}>Columns</Button>
          <Button
            variant='outline'
            leftSection={<IconFilter size='20px' />}
            rightSection={<IconChevronDown size='20px' />}
            onClick={() => console.log("PLACEHOLDER")}
          >
            Adv. Filters
          </Button>
          <Button variant='filled'>
            Assign as Parent
          </Button>
        </Group>
      </Flex>

      <Box h='40vh'>
        <AssetTable columns={initialColumns} data={data} onRowClick={rowClickCallback} />
      </Box>


    </>
  )
}

