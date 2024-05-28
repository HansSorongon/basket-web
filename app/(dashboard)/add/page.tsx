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
import { useForm } from '@mantine/form'
import { IconCalendar } from '@tabler/icons-react'

import { IconTableExport, IconCirclePlus } from '@tabler/icons-react'

import classes from './add.module.css'

import { addAsset } from '../../../actions/actions'

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

  const form = useForm({
    mode: 'uncontrolled',
    validate: {}
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  function handleError() {
    console.log("Error!")
  }

  return (
    <Flex direction='column'>

      < Title lineClamp={1} >Add Asset</Title >
      <Divider my='md' />

      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <MantineProvider theme={addSectionTheme}>
          <Flex bg='var(--mantine-color-gray-0)' p='xl' mx='md'>

            <Flex direction='column' mr='md' w='23%'>
              <Title order={6} className={classes.sectionHeader} m={0}>ASSET INFORMATION</Title>

              <TextInput size='sm' label='Asset Number' mb='sm'
                key={form.key('assetNumber')}
                {...form.getInputProps('assetNumber')}>
              </TextInput>
              <Select size='sm' label='Asset Type' mb='sm' data={['Keyboard', 'Mouse', 'Monitor']}
                key={form.key('assetType')}
                {...form.getInputProps('assetType')}>
              </Select>
              <TextInput size='sm' label='Model' mb='sm'
                key={form.key('assetModel')}
                {...form.getInputProps('assetModel')}>
              </TextInput>
              <TextInput size='sm' label='Specification' mb='sm'
                key={form.key('sepcs')}
                {...form.getInputProps('specs')}>
              </TextInput>
              <TextInput size='sm' label='Serial Number' mb='sm'
                key={form.key('serialNum')}
                {...form.getInputProps('serialNum')}>
              </TextInput>
              <TextInput size='sm' label='Purchase Order' mb='sm'
                key={form.key('pchOrder')}
                {...form.getInputProps('pchOrder')}>
              </TextInput>
              <TextInput size='sm' label='Sales Invoice' mb='sm'
                key={form.key('salesInv')}
                {...form.getInputProps('salesInv')}>
              </TextInput>
              <TextInput size='sm' label='Delivery Receipt' mb='sm'
                key={form.key('delivRct')}
                {...form.getInputProps('delivRct')}>
              </TextInput>

            </Flex>

            <Divider orientation='vertical' mr='md' />

            <Flex direction='column' mr='md' w='23%'>
              <Title order={6} className={classes.sectionHeader} m={0}>SUPPLIER INFORMATION</Title>
              <TextInput size='sm' label='Supplier' mb='sm'
                key={form.key('supplier')}
                {...form.getInputProps('supplier')}>
              </TextInput>
              <DateInput size='sm' label='Acquistion Date' mb='sm' leftSection={<IconCalendar size='20px' />}
                key={form.key('acqDate')}
                {...form.getInputProps('acqDate')}>
              </DateInput>
              <TextInput size='sm' label='Warranty' mb='sm' placeholder='in years'
                key={form.key('warrantyDur')}
                {...form.getInputProps('warrantyDur')}>
              </TextInput>
              <DateInput size='sm' label='Warranty End Date' mb='sm' leftSection={<IconCalendar size='20px' />}
                key={form.key('warrEndDate')}
                {...form.getInputProps('warrEndDate')}>
              </DateInput>
              <Select size='sm' label='Currency' mb='sm' data={['USD', 'PHP', 'EUR']}
                key={form.key('currency')}
                {...form.getInputProps('currency')}>
              </Select>
              <TextInput size='sm' label='Unit Cost' placeholder='(ex. VAT)' mb='sm'
                key={form.key('unitCost')}
                {...form.getInputProps('unitCost')}>
              </TextInput>
              <TextInput size='sm' label='Peza Zone' mb='sm'
                key={form.key('pezaZone')}
                {...form.getInputProps('pezaZone')}>
              </TextInput>
              <TextInput size='sm' label='Market Circle' mb='sm'
                key={form.key('mktCircle')}
                {...form.getInputProps('mktCircle')}>
              </TextInput>
            </Flex>

            <Divider orientation='vertical' mr='md' />

            <Flex direction='column' mr='md' w='23%'>
              <Title order={6} className={classes.sectionHeader} m={0}>MISCELLANEOUS</Title>
              <Select size='sm' label='Classification' mb='sm'
                key={form.key('class')}
                {...form.getInputProps('class')}>
              </Select>
              <Select size='sm' label='Status' mb='sm'
                key={form.key('status')}
                {...form.getInputProps('status')}>
              </Select>
              <DateInput size='sm' label='Status Effectivity Date' mb='sm' leftSection={<IconCalendar size='20px' />}
                key={form.key('statEffDate')}
                {...form.getInputProps('statEffDate')}>
              </DateInput>
              <DateInput size='sm' label='Recent Inventory Date' mb='sm' leftSection={<IconCalendar size='20px' />}
                key={form.key('recInvDate')}
                {...form.getInputProps('recInvDate')}>
              </DateInput>
              <Select size='sm' label='Location' mb='sm'
                key={form.key('location')}
                {...form.getInputProps('location')}>
              </Select>
              <DateInput size='sm' label='Location Effectivity Date' mb='sm' leftSection={<IconCalendar size='20px' />}
                key={form.key('locEffDate')}
                {...form.getInputProps('locEffDate')}>
              </DateInput>
              <TextInput size='sm' label='Responsible Person' mb='sm'
                key={form.key('employeeID')}
                {...form.getInputProps('employeeID')}>
              </TextInput>
            </Flex>

            <Flex direction='column' mr='md' w='23%'>
              <Textarea variant='filled' label='Location Remarks' classNames={{ input: classes.areaInput }}
                key={form.key('locRemarks')}
                {...form.getInputProps('locRemarks')}>
              </Textarea>

              <Textarea variant='filled' label='Remarks' classNames={{ input: classes.areaInput }}
                key={form.key('remarks')}
                {...form.getInputProps('remarks')}>
              </Textarea>

              <Textarea variant='filled' label='Inventory Remarks' classNames={{ input: classes.areaInput }}
                key={form.key('invRemarks')}
                {...form.getInputProps('invRemarks')}>
              </Textarea>
            </Flex>

          </Flex>

          <Flex justify='flex-end' mt='md'>
            <Button leftSection={<IconTableExport />} mr='md'>Import</Button>
            <Button type='submit' leftSection={<IconCirclePlus />} onClick={() => console.log("Add!")}>Add</Button>
          </Flex>
        </MantineProvider>
      </form>

    </Flex >

  );
}
