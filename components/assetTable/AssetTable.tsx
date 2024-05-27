'use client';

import { useState, useEffect } from 'react'
import { Center, ActionIcon } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconClick, IconEdit } from '@tabler/icons-react'

const PAGE_SIZE: number = 15

interface Asset {
  id: number;
  assetType: String;
  model: String;
  serialNo: String;
  bundleNo: number;
  status: String;
  statusUpdated: Date;
  user: String;
  location: String;
  locationRemarks: String;
  lastInventory: String;
}

const renderActions = () => (
  <Center>
    <ActionIcon variant='light' color='var(--mantine-color-green-8)'>
      <IconEdit size='20px' />
    </ActionIcon>
  </Center>
)

const sampleData = {
  id: 1,
  assetType: 'Mouse',
  model: 'Logitech G304',
  serialNo: 'AB1294',
  bundleNo: 34,
  status: 'In Use',
  statusUpdated: (new Date()).toLocaleDateString(),
  user: 'Jan Anthony Murillo',
  location: 'Main Office',
  locationRemarks: 'On the top shelf.',
  lastInventory: (new Date()).toLocaleDateString()
}

const arrSampleData: Asset[] = []

for (let i = 1; i <= 50; i++) {
  sampleData.id = i;
  arrSampleData.push(JSON.parse(JSON.stringify(sampleData)));
}

export default function AssetTable() {

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(arrSampleData.slice(0, PAGE_SIZE));

  const [selectedRecords, setSelectedRecords] = useState<Asset[]>([]);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(arrSampleData.slice(from, to));
  }, [page]);

  return (
    <DataTable
      withTableBorder
      borderRadius="md"
      withColumnBorders
      striped
      highlightOnHover
      records={records}
      // define columns
      columns={[
        {
          accessor: 'id',
          title: 'Asset No.',
          width: 90,
        },
        { accessor: 'assetType', title: 'Asset Type' },
        { accessor: 'model', title: 'Model' },
        { accessor: 'serialNo', title: 'Serial No.' },
        { accessor: 'bundleNo', title: 'Bundle No.' },
        { accessor: 'status', title: 'Status' },
        { accessor: 'statusUpdated', title: 'Status Updated' },
        { accessor: 'user', title: 'User' },
        { accessor: 'location', title: 'Location' },
        { accessor: 'locationRemarks', title: 'Location Remarks' },
        { accessor: 'lastInventory', title: 'Last Inventory' },
        {
          accessor: 'actions',
          title: 'Update',
          width: '0%',
          render: renderActions,
        }
      ]}
      // execute this callback when a row is clicked
      onRowClick={() => { console.log(selectedRecords) }}
      totalRecords={arrSampleData.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p: number) => setPage(p)}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
    />
  );
}
