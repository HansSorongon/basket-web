'use client'

import {
  Title,
  MantineProvider,
  Box,
  Flex,
  Select,
  Paper,
  Textarea,
  createTheme,
  Input
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { DateInput } from '@mantine/dates'
import AssetTable from '../../assetTable/AssetTable'

import { IconCalendar } from '@tabler/icons-react'

import classes from './editSection.module.css'

const inputSectionTheme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),
  },
})

export function EditSection(form: UseFormReturnType<any>) {

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

