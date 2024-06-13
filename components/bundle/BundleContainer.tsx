'use client'

import { useState } from 'react'
import {
  Box,
  Title,
  Divider,
  TextInput,
  Flex,
  Group,
  Button
} from '@mantine/core'
import StepperCard from './StepperCard';
import {
  IconSearch,
  IconChevronDown,
  IconFilter,
  IconLayoutColumns,
  IconCircleMinus,
  IconPlus,
  IconX
} from '@tabler/icons-react';

import AssetTable from '../assetTable/AssetTable';

function SelectSection() {
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
        <AssetTable selectedRecords={[]} setSelectedRecords={() => console.log("(N)")} columns={[]} data={[]} />
      </Box>

    </>
  )
}

function ModifySection() {
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

function EditSection() {
  return (
    <>
      <Title order={3} mb='xs'>Current Details</Title>
      <Box h='18vh' mb='md'>
        <AssetTable selectedRecords={[]} setSelectedRecords={() => console.log("(N)")} columns={[]} data={[]} />
      </Box>
      <Title order={3} mb='xs'>Update Details</Title>

    </>
  )
}

export default function BundleContainer() {

  const [active, setActive] = useState(0);

  return (
    <>
      <StepperCard active={active} setActive={setActive} />

      <Box mt='lg'>

        {
          active == 0 &&
          SelectSection()
        }

        {
          active == 1 &&
          ModifySection()
        }

        {
          active == 2 &&
          EditSection()
        }

      </Box>

    </>
  )
}
