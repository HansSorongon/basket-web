'use client'

import {
  Button,
  Title,
  MantineProvider,
  Box,
  Flex,
  Select,
  Paper,
  Textarea,
  createTheme,
  TextInput,
  Input
} from '@mantine/core'
import useSWR from 'swr'
import { z } from 'zod'
import { useForm } from '@mantine/form'
import { zodResolver } from '@mantine/form'
import { DateInput } from '@mantine/dates'
import AssetTable from '../../assetTable/AssetTable'

import { IconCalendar, IconEditCircle } from '@tabler/icons-react'

import classes from './editSection.module.css'
import { Asset } from '../../../common/types'
import { updateBundle } from '../../../actions/actions'

const inputSectionTheme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),
  },
})

const fetcher = (url: string) => fetch(url, { method: 'GET', cache: 'no-store' })
  .then(async (res) => {
    if (!res.ok) {
      return "NO_BUNDLE"
    }
    return res.json();
  })


export default function EditSection({ parentAsset }: { parentAsset: Asset }) {

  const initialColumns = ['assetNum', 'assetType', 'assetModel', 'serialNum', 'bundleNum', 'status', 'statEffDate',
    'employeeID', 'location', 'locRemarks', 'recInvDate']

  const url = 'https://basket-api.onrender.com/api/v1/bundles/' + parentAsset?.bundleParentID

  async function handleSubmit(values: typeof form.values) {
    updateBundle(values, parentAsset?.bundleParentID)
  };

  function handleError() {
    console.log("Error!");
  }

  const { data } = useSWR(
    () => parentAsset.bundleParentID ? url : null,
    fetcher,
    {
      onError: (error: any) => {
        console.error('Failed to fetch resource: ', error)
      }
    })

  const schema = z.object({
  });

  const form = useForm({
    mode: 'uncontrolled',

    // this is hardcoded to avoid any problems with the Asset interface requiring stuff
    initialValues: {
      class: data?.Classification,
      status: data?.Status,
      statEffDate: data ? new Date(data?.StatEffDate) : null,
      location: data?.Location,
      user: data?.EmployeeID,
      recInvDate: data ? new Date(data?.RecInvDate) : null,
      remarks: data?.Remarks,
      locRemarks: data?.LocRemarks,
      invRemarks: data?.InvRemarks,
      locEffDate: data ? new Date(data?.LocEffDate) : null

    },
    validate: zodResolver(schema)
  });

  return (
    <>
      <Title order={3} mb='md'>Current Details</Title>
      <Box mb='lg'>
        <AssetTable columns={initialColumns} data={[parentAsset]} />
      </Box>

      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <Flex justify='space-between' mb='xxs'>
          <Title order={3} mb='xs'>Update Details</Title>
          <Button type='submit' leftSection={<IconEditCircle />}>Update</Button>
        </Flex>
        <Paper bg='var(--mantine-color-gray-0)'>

          <MantineProvider theme={inputSectionTheme}>
            <Flex p='lg' direction='column'>
              <Flex justify='space-between' w='100%'>
                <Select size='sm' label='Classification' mb='sm' withAsterisk w='24%' data={['Input', 'Output', 'Storage', 'Networking']}
                  key={form.key('class')}
                  {...form.getInputProps('class')}>
                </Select>
                <Select size='sm' label='Status' mb='sm' withAsterisk w='24%' data={['Active', 'Inactive']}
                  key={form.key('status')}
                  {...form.getInputProps('status')}>
                </Select>
                <DateInput size='sm' label='Status Effectivity Date' mb='sm' leftSection={<IconCalendar size='20px' />} withAsterisk w='24%'
                  key={form.key('statEffDate')}
                  {...form.getInputProps('statEffDate')}>
                </DateInput>
                <Select size='sm' label='Location' mb='sm' withAsterisk w='24%' data={['Office', 'Warehouse']}
                  key={form.key('location')}
                  {...form.getInputProps('location')}>
                </Select>
              </Flex>
              <Flex justify='space-between' w='100%'>
                <DateInput size='sm' label='Location Effectivity Date' mb='sm' leftSection={<IconCalendar size='20px' />} withAsterisk w='32%'
                  key={form.key('locEffDate')}
                  {...form.getInputProps('locEffDate')}>
                </DateInput>
                <TextInput size='sm' label='Responsible Person' mb='sm' withAsterisk w='32%'
                  key={form.key('user')}
                  {...form.getInputProps('user')}>
                </TextInput>
                <DateInput size='sm' label='Recent Inventory Date' mb='sm' leftSection={<IconCalendar size='20px' />} withAsterisk w='32%'
                  key={form.key('recInvDate')}
                  {...form.getInputProps('recInvDate')}>
                </DateInput>
              </Flex>
              <Flex justify='space-between'>
                <Textarea variant='filled' label='Remarks' classNames={{ input: classes.areaInput }} w='32%'
                  key={form.key('remarks')}
                  {...form.getInputProps('remarks')}>
                </Textarea>
                <Textarea variant='filled' label='Location Remarks' classNames={{ input: classes.areaInput }} w='32%'
                  key={form.key('locRemarks')}
                  {...form.getInputProps('locRemarks')}>
                </Textarea>
                <Textarea variant='filled' label='Inventory Remarks' classNames={{ input: classes.areaInput }} w='32%'
                  key={form.key('invRemarks')}
                  {...form.getInputProps('invRemarks')}>
                </Textarea>
              </Flex>

            </Flex>
          </MantineProvider>

        </Paper >
      </form>
    </>

  )
}

