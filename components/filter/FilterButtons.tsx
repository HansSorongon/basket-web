'use client'

import { Collapse } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
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
import { useForm } from '@mantine/form'

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

export default function FilterButtons({ setFilters }: { setFilters: any }) {

  const [opened, { toggle }] = useDisclosure(true);
  const form = useForm({
    mode: 'uncontrolled'
  })

  function handleSubmit(values: typeof form.values) {
    console.log(values)
  }

  function handleError() {

  }

  return (
    <Box>

      <Flex justify='space-between' w='100%' mb='md'>
        <TextInput leftSection={<IconSearch size='20px' />} placeholder='Search' />
        <Group>
          <Button
            variant='outline'
            leftSection={<IconFilter size='20px' />}
            rightSection={<IconChevronDown size='20px' />}
            onClick={toggle}
          >
            All Filters
          </Button>
          <Button variant='filled' leftSection={<IconTableExport size='20px' />}>Export</Button>
        </Group>
      </Flex>

      <Collapse in={opened}>
        <MantineProvider theme={dropSectionTheme}>
          <Paper shadow='xs' p='xl' mb='md'>
            <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
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

              <Group justify='space-between' gap='xs' mb='xs'>
                <TextInput w='24%' label='Delivery Receipt'></TextInput>
                <Select w='24%' label='Market Circle'></Select>
                <Select w='24%' label='Project'></Select>
                <Select w='24%' label='PEZA Zone'></Select>
              </Group>

              <Group justify='flex-end'>
                <Button type='reset' variant='outline' color='red' >Clear</Button>
                <Button type='submit'>Apply Filters</Button>
              </Group>
            </form>

          </Paper>
        </MantineProvider>
      </Collapse>

    </Box>
  );
}
