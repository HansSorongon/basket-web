'use client'

import {
  Flex,
  Title,
  Button,
  Divider,
  Text,
  TextInput,
  Input,
  MantineProvider,
  Select,
  Textarea,
  createTheme
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons-react'

import { IconTableExport, IconCirclePlus } from '@tabler/icons-react'

import classes from './add.module.css'

const addSectionTheme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),
  },
});

export default function Add() {
  return (
    <Flex direction='column'>

      < Title lineClamp={1} >Add Asset</Title >
      <Divider my='md' />

      <MantineProvider theme={addSectionTheme}>
        <Flex bg='var(--mantine-color-gray-0)' p='xl' mx='md'>

          <Flex direction='column' mr='md' w='23%'>
            <Title order={6} className={classes.sectionHeader} m={0}>ASSET INFORMATION</Title>
            <TextInput size='sm' label='Asset Number' mb='sm'></TextInput>
            <Select size='sm' label='Currency' mb='sm'></Select>
            <TextInput size='sm' label='Model' mb='sm'></TextInput>
            <TextInput size='sm' label='Specification' mb='sm'></TextInput>
            <TextInput size='sm' label='Serial Number' mb='sm'></TextInput>
            <TextInput size='sm' label='Purchase Order' mb='sm'></TextInput>
            <TextInput size='sm' label='Sales Invoice' mb='sm'></TextInput>
            <TextInput size='sm' label='Delivery Receipt' mb='sm'></TextInput>
          </Flex>

          <Divider orientation='vertical' mr='md' />

          <Flex direction='column' mr='md' w='23%'>
            <Title order={6} className={classes.sectionHeader} m={0}>SUPPLIER INFORMATION</Title>
            <TextInput size='sm' label='Supplier' mb='sm'></TextInput>
            <DateInput size='sm' label='Acquistion Date' mb='sm' leftSection={<IconCalendar size='20px' />} ></DateInput>
            <TextInput size='sm' label='Warranty' mb='sm'></TextInput>
            <DateInput size='sm' label='Warranty End Date' mb='sm' leftSection={<IconCalendar size='20px' />} ></DateInput>
            <Select size='sm' label='Currency' mb='sm'></Select>
            <TextInput size='sm' label='Unit Cost' placeholder='(ex. VAT)' mb='sm'></TextInput>
            <TextInput size='sm' label='Peza Zone' mb='sm'></TextInput>
            <TextInput size='sm' label='Market Circle' mb='sm'></TextInput>
          </Flex>

          <Divider orientation='vertical' mr='md' />

          <Flex direction='column' mr='md' w='23%'>
            <Title order={6} className={classes.sectionHeader} m={0}>MISCELLANEOUS</Title>
            <Select size='sm' label='Classification' mb='sm'></Select>
            <Select size='sm' label='Status' mb='sm'></Select>
            <DateInput size='sm' label='Status Effectivity Date' mb='sm' leftSection={<IconCalendar size='20px' />} ></DateInput>
            <DateInput size='sm' label='Recent Inventory Date' mb='sm' leftSection={<IconCalendar size='20px' />} ></DateInput>
            <Select size='sm' label='Location' mb='sm'></Select>
            <DateInput size='sm' label='Location Effectivity Date' mb='sm' leftSection={<IconCalendar size='20px' />} ></DateInput>
            <TextInput size='sm' label='Responsible Person' mb='sm'></TextInput>
          </Flex>

          <Flex direction='column' mr='md' w='23%'>
            <Text fw={600}>Location Remarks</Text>
            <Textarea variant='filled' size='23%'></Textarea>

            <Text fw={600}>Remarks</Text>
            <Textarea variant='filled' size='23%'></Textarea>

            <Text fw={600}>Inventory Remark</Text>
            <Textarea variant='filled' size='23%'></Textarea>
          </Flex>

        </Flex>

        <Flex justify='flex-end' mt='md'>
          <Button leftSection={<IconTableExport />} mr='md'>Import</Button>
          <Button leftSection={<IconCirclePlus />}>Add</Button>
        </Flex>

      </MantineProvider>

    </Flex >

  );
}
