'use client'

import { useState } from 'react'
import {
  MantineProvider,
  Box,
  Title,
  Divider,
  TextInput,
  Select,
  Flex,
  Paper,
  Group,
  Button,
  Input,
  createTheme,
  Textarea,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm, UseFormReturnType } from '@mantine/form'
import { IconCalendar } from '@tabler/icons-react'

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
import { zodResolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'

import classes from './bundleContainer.module.css'
import AssetTable from '../assetTable/AssetTable';

const inputSectionTheme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),
  },
})

const schema = z.object({})

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



function EditSection(form: UseFormReturnType<any>) {

  return (
    <>
      <Title order={3} mb='xs'>Current Details</Title>
      <Box h='18vh' mb='md'>
        <AssetTable selectedRecords={[]} setSelectedRecords={() => console.log("(N)")} columns={[]} data={[]} />
      </Box>

      <Title order={3} mb='xs'>Update Details</Title>
      <Paper bg='var(--mantine-color-gray-0)'>

        <MantineProvider theme={inputSectionTheme}>
          <Flex p='lg' direction='column'>
            <Flex justify='space-between' w='100%'>
              <Select size='sm' label='Classification' mb='sm' withAsterisk w='24%'
                key={form.key('assetNum')}
                {...form.getInputProps('assetNum')}>
              </Select>
              <Select size='sm' label='Status' mb='sm' withAsterisk w='24%'
                key={form.key('assetNum')}
                {...form.getInputProps('assetNum')}>
              </Select>
              <DateInput size='sm' label='Acquistion Date' mb='sm' leftSection={<IconCalendar size='20px' />} withAsterisk w='24%'
                key={form.key('acqDate')}
                {...form.getInputProps('acqDate')}>
              </DateInput>
              <Select size='sm' label='Status' mb='sm' withAsterisk w='24%'
                key={form.key('assetNum')}
                {...form.getInputProps('assetNum')}>
              </Select>
            </Flex>
            <Flex justify='space-between' w='100%'>
              <DateInput size='sm' label='Acquistion Date' mb='sm' leftSection={<IconCalendar size='20px' />} withAsterisk w='32%'
                key={form.key('acqDate')}
                {...form.getInputProps('acqDate')}>
              </DateInput>
              <Select size='sm' label='Status' mb='sm' withAsterisk w='32%'
                key={form.key('assetNum')}
                {...form.getInputProps('assetNum')}>
              </Select>
              <DateInput size='sm' label='Acquistion Date' mb='sm' leftSection={<IconCalendar size='20px' />} withAsterisk w='32%'
                key={form.key('acqDate')}
                {...form.getInputProps('acqDate')}>
              </DateInput>
            </Flex>
            <Flex justify='space-between'>
              <Textarea variant='filled' label='Location Remarks' classNames={{ input: classes.areaInput }} w='32%'
                key={form.key('locRemarks')}
                {...form.getInputProps('locRemarks')}>
              </Textarea>
              <Textarea variant='filled' label='Location Remarks' classNames={{ input: classes.areaInput }} w='32%'
                key={form.key('locRemarks')}
                {...form.getInputProps('locRemarks')}>
              </Textarea>
              <Textarea variant='filled' label='Location Remarks' classNames={{ input: classes.areaInput }} w='32%'
                key={form.key('locRemarks')}
                {...form.getInputProps('locRemarks')}>
              </Textarea>
            </Flex>

          </Flex>
        </MantineProvider>
      </Paper>

    </>
  )
}

export default function BundleContainer() {

  const form = useForm({
    mode: 'uncontrolled',
    validate: zodResolver(schema)
  });

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
          EditSection(form)
        }

      </Box>

    </>
  )
}
