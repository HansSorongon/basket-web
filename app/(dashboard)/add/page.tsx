'use client'

import {
  Flex,
  Title,
  Button,
  Divider,
  TextInput,
  Input,
  MantineProvider,
  Select,
  Textarea,
  createTheme
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconCalendar } from '@tabler/icons-react'
import { IconTableExport, IconCirclePlus } from '@tabler/icons-react'

import classes from './add.module.css'
import { addAsset } from '../../../actions/actions'
import { Asset } from '../../../common/types'

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

  async function handleSubmit(values: typeof form.values) {

    notifications.show({
      id: 'loading',
      title: 'Add Asset',
      message: 'Adding your asset...',
      autoClose: 3000,
      loading: true
    })

    values.warrantyDur = +values.warrantyDur
    values.employeeID = values.employeeID ? +values.employeeID : null;

    let status = await addAsset(values as Asset);

    notifications.clean();

    if (status) {
      notifications.show({
        title: 'Add Asset',
        color: 'green',
        message: 'Successfully added asset!',
        autoClose: 2000,
      })
    } else {
      notifications.show({
        title: 'Add Asset',
        color: 'red',
        message: 'Failed to add asset!',
        autoClose: 2000,
      })
    }

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
                key={form.key('assetNum')}
                {...form.getInputProps('assetNum')}>
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
              <Select size='sm' label='Market Circle' mb='sm' data={['Tech', 'Communication', 'Miscellaneous']}
                key={form.key('mktCircle')}
                {...form.getInputProps('mktCircle')}>
              </Select>
            </Flex>

            <Divider orientation='vertical' mr='md' />

            <Flex direction='column' mr='md' w='23%'>
              <Title order={6} className={classes.sectionHeader} m={0}>MISCELLANEOUS</Title>
              <Select size='sm' label='Classification' mb='sm' data={['Input', 'Output', 'Storage', 'Networking']}
                key={form.key('class')}
                {...form.getInputProps('class')}>
              </Select>
              <Select size='sm' label='Status' mb='sm' data={['Active', 'Inactive']}
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
              <Select size='sm' label='Location' mb='sm' data={['Shelf', 'Table', 'Cabinet']}
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
