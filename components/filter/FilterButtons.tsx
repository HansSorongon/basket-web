'use client'

import { useState } from 'react'
import {
  Flex,
  Box,
  Group,
  Button,
  TextInput,
  Paper,
  Input,
  createTheme,
  MantineProvider,
  Select,
  Transition
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import {
  IconSearch,
  IconTableExport,
  IconFilter,
  IconChevronDown,
  IconCalendar,
} from '@tabler/icons-react'


import classes from './filterButtons.module.css'

const dropSectionTheme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),
  },
});

export default function FilterButtons() {

  const [filterSectionOpen, setFilterSectionOpen] = useState(false);

  return (
    <Box w='100%'>

      <Flex justify='space-between' w='100%' mb='md'>
        <TextInput leftSection={<IconSearch size='20px' />} placeholder='Search' />
        <Group>
          <Button
            variant='outline'
            leftSection={<IconFilter size='20px' />}
            rightSection={<IconChevronDown size='20px' />}
            onClick={() => setFilterSectionOpen(!filterSectionOpen)}
          >
            All Filters
          </Button>
          <Button variant='filled' leftSection={<IconTableExport size='20px' />}>Export</Button>
        </Group>
      </Flex>

      <MantineProvider theme={dropSectionTheme}>
        <Transition
          mounted={filterSectionOpen}
          transition='scale-y'
          duration={200}
          timingFunction='ease'
          keepMounted
        >
          {(transitionStyle) => (
            <Paper shadow='xs' p='xl' mb='md' style={{ ...transitionStyle }}>
              <Group justify='space-between' gap='2px' mb='xs'>
                <TextInput w='19%' label='Asset Type'></TextInput>
                <TextInput w='19%' label='Asset Bundle'></TextInput>
                <TextInput w='19%' label='Model'></TextInput>
                <TextInput w='19%' label='Supplier'></TextInput>
                <TextInput w='19%' label='PO'></TextInput>
              </Group>

              <Group justify='space-between' gap='xs' mb='xs'>
                <TextInput w='19%' label='Bundle No.'></TextInput>
                <DateInput w='19%' leftSection={<IconCalendar size='20px' />} label='Warranty End Date'></DateInput>
                <DateInput w='19%' leftSection={<IconCalendar size='20px' />} label='Acquisiton Date'></DateInput>
                <TextInput w='19%' label='Employee Name'></TextInput>
                <TextInput w='19%' label='Sales Invoice'></TextInput>
              </Group>

              <Group justify='space-between' gap='xs'>
                <TextInput w='24%' label='Delivery Receipt'></TextInput>
                <Select w='24%' label='Market Circle'></Select>
                <Select w='24%' label='Project'></Select>
                <Select w='24%' label='PEZA Zone'></Select>
              </Group>

            </Paper>
          )}
        </Transition>
      </MantineProvider>

    </Box>
  );
}
