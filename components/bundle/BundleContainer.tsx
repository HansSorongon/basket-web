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
import { IconSearch, IconChevronDown, IconFilter, IconLayoutColumns } from '@tabler/icons-react';

import AssetTable from '../assetTable/AssetTable';

function SelectSection() {
  return (
    <>
      <Flex justify='space-between' mb='md'>
        <TextInput leftSection={<IconSearch size='20px' />} placeholder='Search by Asset No.' onChange={() => console.log("PLACEHOLDER")} />

        <Group>
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

      <Flex justify='space-between' mb='md'>
        <Group>
        </Group>
        <Button variant='light' color='rgba(0, 0, 0, 1)' leftSection={<IconLayoutColumns size='20px' />}>Columns</Button>
      </Flex>

      <Box h='40vh'>
        <AssetTable selectedRecords={[]} setSelectedRecords={() => console.log("(N)")} columns={[]} data={[]} />
      </Box>

    </>
  )
}

export default function BundleContainer() {

  const [active, setActive] = useState(0);

  return (
    <>
      <StepperCard active={active} setActive={setActive} />

      <Box mt='lg'>

        <Title order={3} mb='xs'>Select Parent Assets</Title>
        <Divider mb='md' />

        {
          active == 0 &&
          SelectSection()
        }


      </Box>

    </>
  )
}
