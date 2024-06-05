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

export default function FilterButtons({ applyFilter }: { applyFilter: any }) {

  const [opened, { toggle }] = useDisclosure(false);
  const form = useForm({
    mode: 'uncontrolled'
  })

  function handleSubmit(values: typeof form.values) {
    applyFilter(values);
  }

  function handleError() {
    console.log("Error setting filters!")
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    applyFilter({ assetNum: (e.target.value).toLowerCase() })
  }

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <Flex justify='space-between' w='100%' mb='md'>
          <TextInput leftSection={<IconSearch size='20px' />} placeholder='Search' onChange={handleSearch} />
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
              <Group justify='space-between' gap='2px' mb='xs'>
                <TextInput w='19%' label='Asset Type'
                  key={form.key('assetType')}
                  {...form.getInputProps('assetType')}>
                </TextInput>
                <TextInput w='19%' label='Asset Bundle'></TextInput>
                <TextInput w='19%' label='Model'
                  key={form.key('assetModel')}
                  {...form.getInputProps('assetModel')}>
                </TextInput>
                <TextInput w='19%' label='Supplier'
                  key={form.key('supplier')}
                  {...form.getInputProps('supplier')}>
                </TextInput>
                <TextInput w='19%' label='Purchase Order'
                  key={form.key('pchOrder')}
                  {...form.getInputProps('pchOrder')}>
                </TextInput>
              </Group>

              <Group justify='space-between' gap='xs' mb='xs'>
                <TextInput w='19%' label='Bundle No.'
                  key={form.key('bundleNum')}
                  {...form.getInputProps('bundleNum')}
                ></TextInput>
                <DateInput w='19%' leftSection={<IconCalendar size='20px' />} label='Warranty End Date'
                  key={form.key('warrEndDate')}
                  {...form.getInputProps('warrEndDate')}>
                </DateInput>
                <DateInput w='19%' leftSection={<IconCalendar size='20px' />} label='Acquisiton Date'
                  key={form.key('acqDate')}
                  {...form.getInputProps('acqDate')}>
                </DateInput>
                <TextInput w='19%' label='Employee Name'></TextInput>
                <TextInput w='19%' label='Sales Invoice'
                  key={form.key('salesInv')}
                  {...form.getInputProps('salesInv')}>
                </TextInput>
              </Group>

              <Group justify='space-between' gap='xs' mb='xs'>
                <TextInput w='24%' label='Delivery Receipt'
                  key={form.key('delivRct')}
                  {...form.getInputProps('delivRct')}>
                </TextInput>
                <Select w='24%' label='Market Circle'
                  key={form.key('mktCircle')}
                  {...form.getInputProps('mktCircle')}>
                </Select>
                <Select w='24%' label='Project'></Select>
                <Select w='24%' label='PEZA Zone'
                  key={form.key('pezaZone')}
                  {...form.getInputProps('pezaZone')}>
                </Select>
              </Group>

              <Group justify='flex-end'>
                <Button type='reset' variant='outline' color='red' onClick={() => { form.reset(), applyFilter() }}>Clear</Button>
                <Button type='submit'>Apply Filters</Button>
              </Group>

            </Paper>
          </MantineProvider>
        </Collapse>
      </form>
    </Box>
  );
}
