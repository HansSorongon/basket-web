'use client'
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useState, useEffect } from 'react'
import { Tabs, Flex, Box, Title, Text, TextInput, Button, Paper, ActionIcon } from '@mantine/core'
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { IconCirclePlus, IconTrash, IconEdit } from '@tabler/icons-react'

import { deleteParams } from '../../actions/actions';

const paramMap: { [key: string]: string } = {
  'Asset Type': 'asset-type',
  'Supplier': 'supplier',
  'Currency': 'currency',
  'PEZA Zone': 'peza-zone',
  'Classification': 'classification',
  'Department': 'department',
  'Status': 'status',
  'Location': 'location'
}

const fetcher = (url: string) => fetch(url, { method: 'GET', cache: 'no-store' }).then((res) => res.json());

export default function DataMaintenanceContainer() {

  const [paramData, setParamData] = useState([])
  const [tab, setTab] = useState('Asset Type')
  const [value, setValue] = useState('');

  const [selectedRecords, setSelectedRecords] = useState([]);

  const { trigger } = useSWRMutation('https://basket-api.onrender.com/api/v1/maintenance/' + paramMap[tab], fetcher, {
    onSuccess: (data) => {
      setParamData(data)
    }
  })

  async function handleDelete(tab: string, paramIds: number[]) {

    await deleteParams(paramMap[tab], paramIds)
    console.log(paramIds)
    trigger()

    setSelectedRecords([])
  }

  const { data } = useSWR(
    'https://basket-api.onrender.com/api/v1/maintenance/' + paramMap['Asset Type'],
    fetcher,
    {
      onError: (error) => {
        console.error('Failed to fetch resource: ', error);
      },
    })

  function handleChange(tabName: string) {
    setTab(tabName)
  }

  async function handleAdd() {

    const res = await fetch('https://basket-api.onrender.com/api/v1/maintenance/' + paramMap[tab], {
      method: 'POST',
      body: JSON.stringify({ 'Str': value })
    })

    if (res.ok) {
      console.log('Successfully added param.')
      console.log(res)
      trigger()
      return
    }

    console.log('Failed to add paramn.')
  }

  useEffect(() => {
    trigger()
  }, [tab])

  return (
    <Flex justify='center'>

      <Flex h='80vh' m='xl' w='60%' justify='space-around'>

        <Tabs defaultValue='Asset Type' orientation='vertical' h='100%' onChange={(tabName: any) => { handleChange(tabName), setSelectedRecords([]) }}>

          <Tabs.List>
            <Tabs.Tab value='Asset Type'>Asset Type</Tabs.Tab>
            <Tabs.Tab value='Supplier'>Supplier</Tabs.Tab>
            <Tabs.Tab value='Currency'>Currency</Tabs.Tab>
            <Tabs.Tab value='PEZA Zone'>PEZA Zone</Tabs.Tab>
            <Tabs.Tab value='Classification'>Classification</Tabs.Tab>
            <Tabs.Tab value='Department'>Department</Tabs.Tab>
            <Tabs.Tab value='Status'>Status</Tabs.Tab>
            <Tabs.Tab value='Location'>Location</Tabs.Tab>
          </Tabs.List>

        </Tabs>

        <Flex direction='column' justify='center' w='30%'>
          <Box p='md' bg='var(--mantine-color-gray-0)' mb='xs'>
            <Title order={2}>Add Asset Type</Title>
            <Text>Add a new entry to the table</Text>

            <TextInput
              label={tab}
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}>
            </TextInput>

          </Box>

          <Button mb='xs' leftSection={<IconCirclePlus />} onClick={handleAdd}>Add</Button>
          <Button bg='red' leftSection={<IconTrash />} onClick={() => handleDelete(tab, selectedRecords.map((item: { id: number }) => item.id))}>Delete</Button>
        </Flex>

        <Paper p='md' withBorder radius='md' w='30%'>
          <Title order={2} mb='sm'>Current Entries</Title>

          <Box h='90%'>
            <DataTable
              striped
              withTableBorder
              borderRadius='md'
              selectedRecords={selectedRecords}
              onSelectedRecordsChange={setSelectedRecords}
              columns={[
                { accessor: 'Str', title: 'Option' },
                {
                  accessor: '',
                  render: () => (
                    <ActionIcon
                      size='sm'
                      variant='light'
                      color='var(--mantine-color-green-8)'
                    >
                      <IconEdit />
                    </ActionIcon>
                  )

                }
              ]}
              records={paramData ?? []}
            >
            </DataTable>
          </Box>

        </Paper>

      </Flex>

    </Flex >
  )

}
