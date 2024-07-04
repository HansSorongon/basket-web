'use client'

import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { Box, Button } from '@mantine/core'
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'

import AssetTable from './assetTable/AssetTable';
import OptionButtons from './options/OptionButtons'
import FilterButtons from './filter/FilterButtons';
import { Asset } from '../common/types';

import { IconTableExport } from '@tabler/icons-react'

const fetcher = (url: string) => fetch(url, { method: 'GET' }).then((res) => res.json());

export default function DataTableContainer() {

  const initialColumns = ['assetNum', 'assetType', 'serialNum', 'bundleNum', 'status', 'statEffDate',
    'employeeID', 'location', 'locRemarks', 'recInvDate', 'update']

  const [columns, setColumns] = useState<string[]>(initialColumns);
  const [filteredData, setFilteredData] = useState([])
  const [selectedRecords, setSelectedRecords] = useState<Asset[]>([])

  const { trigger, isMutating } = useSWRMutation('https://basket-api.onrender.com/api/v1/assets', fetcher)

  const { data } = useSWR(
    'https://basket-api.onrender.com/api/v1/assets',
    fetcher,
    {
      onError: (error) => {
        console.error('Failed to fetch resource: ', error);
      }
    })

  function applyFilter(filters: any) {

    let filteredData = data;

    for (let key in filters) {
      if (key.toLowerCase().includes('date')) {
        filteredData = filteredData.filter((entry: any) => {
          // disregards timezone
          console.log(entry[key].split('T')[0], dayjs(filters[key]).format('YYYY-MM-DD'))
          return (entry[key].split('T')[0] == dayjs(filters[key]).format('YYYY-MM-DD'));
        })
        continue;
      };

      filteredData = filteredData.filter((entry: any) => {
        return (entry[key] as string).toLowerCase().startsWith(String(filters[key]).toLowerCase());
      })
    }

    setFilteredData(filteredData);
  }

  useEffect(() => {
    setFilteredData(data);
  }, [data])

  return (
    <Box>
      <FilterButtons applyFilter={applyFilter} >
        <Button variant='filled' leftSection={<IconTableExport size='20px' />}>Export</Button>
      </FilterButtons>
      <OptionButtons selectedRecords={selectedRecords} trigger={trigger} columns={columns} setColumns={setColumns} />
      <Box h='65vh'>
        <AssetTable
          selectedRecords={selectedRecords}
          setSelectedRecords={setSelectedRecords}
          isMutating={isMutating || !data}
          data={filteredData}
          columns={columns}
        />
      </Box>
    </Box>
  )
}


