'use client'

import {
  Flex,
  Title,
  Button,
  Divider,
  TextInput,
  NumberInput,
  Input,
  MantineProvider,
  Select,
  Textarea,
  createTheme
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconCalendar, IconTableExport, IconCirclePlus } from '@tabler/icons-react'

import { zodResolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'

import classes from './assetForm.module.css'

import { Asset } from '../../common/types'

interface AssetFormProps {
  submitCallback: any,
  values?: Asset,
  formTitle?: string,
  buttonText: string
}


const inputSectionTheme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),
  },
})

const schema = z.object({
  assetNum: z.string().min(1),
  assetType: z.string().min(1),
  assetModel: z.string().min(1),
  specs: z.string().min(1),
  serialNum: z.string().min(1),
  pchOrder: z.string().min(1),
  salesInv: z.string().min(1),
  delivRct: z.string().min(1),
  supplier: z.string().min(1),
  acqDate: z.date(),
  warrantyDur: z.number(),
  warrEndDate: z.date(),
  currency: z.string().min(1),
  unitCost: z.number().min(1),
  pezaZone: z.string().min(1),
  mktCircle: z.string().min(1),
  class: z.string().min(1),
  status: z.string().min(1),
  statEffDate: z.date(),
  recInvDate: z.date(),
  location: z.string().min(1),
  locEffDate: z.date(),
  employeeID: z.number(),
  locRemarks: z.string(),
  remarks: z.string(),
  invRemarks: z.string()
});

export default function AssetForm({ submitCallback, values, formTitle, buttonText }: AssetFormProps) {

  const id = values ? values.id : '';

  const form = useForm({
    mode: 'uncontrolled',

    // this is hardcoded to avoid any problems with the Asset interface requiring stuff
    initialValues: {
      assetNum: values?.assetNum,
      assetType: values?.assetType,
      assetModel: values?.assetModel,
      specs: values?.specs,
      serialNum: values?.serialNum,
      pchOrder: values?.pchOrder,
      salesInv: values?.salesInv,
      delivRct: values?.delivRct,
      supplier: values?.supplier,
      acqDate: values?.acqDate ? new Date(String(values?.acqDate)) : '',
      warrantyDur: Number(values?.warrantyDur),
      warrEndDate: values?.warrEndDate ? new Date(String(values?.warrEndDate)) : '',
      currency: values?.currency,
      unitCost: Number(values?.unitCost),
      pezaZone: values?.pezaZone,
      mktCircle: values?.mktCircle,
      class: values?.class,
      status: values?.status,
      statEffDate: values?.statEffDate ? new Date(String(values?.statEffDate)) : '',
      recInvDate: values?.recInvDate ? new Date(String(values?.recInvDate)) : '',
      location: values?.location,
      locEffDate: values?.locEffDate ? new Date(String(values?.locEffDate)) : '',
      employeeID: values?.employeeID,
      locRemarks: values?.locRemarks,
      remarks: values?.remarks,
      invRemarks: values?.invRemarks
    },
    validate: zodResolver(schema)
  });

  function handleSubmit(values: typeof form.values) {
    form.validate();
    submitCallback(values, id);
  };

  function handleError() {
    console.log("Error!")
  }

  return (
    <Flex direction='column'>

      < Title lineClamp={1} >{formTitle}</Title >
      <Divider my='md' />

      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <MantineProvider theme={inputSectionTheme}>
          <Flex bg='var(--mantine-color-gray-0)' p='xl' mx='md'>

            <Flex direction='column' mr='md' w='23%'>
              <Title order={6} className={classes.sectionHeader} m={0}>ASSET INFORMATION</Title>

              <TextInput size='sm' label='Asset No.' mb='sm'
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
                key={form.key('specs')}
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
              <NumberInput size='sm' label='Warranty' mb='sm' placeholder='in years'
                key={form.key('warrantyDur')}
                {...form.getInputProps('warrantyDur')}>
              </NumberInput>
              <DateInput size='sm' label='Warranty End Date' mb='sm' leftSection={<IconCalendar size='20px' />}
                key={form.key('warrEndDate')}
                {...form.getInputProps('warrEndDate')}>
              </DateInput>
              <Select size='sm' label='Currency' mb='sm' data={['USD', 'PHP', 'EUR']}
                key={form.key('currency')}
                {...form.getInputProps('currency')}>
              </Select>
              <NumberInput size='sm' label='Unit Cost' placeholder='(ex. VAT)' mb='sm'
                key={form.key('unitCost')}
                {...form.getInputProps('unitCost')}>
              </NumberInput>
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
            <Button type='submit' leftSection={<IconCirclePlus />}>{buttonText}</Button>
          </Flex>
        </MantineProvider>
      </form>

    </Flex >

  );
}
