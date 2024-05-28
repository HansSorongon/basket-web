'use client';

import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { Center, ActionIcon } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconEdit } from '@tabler/icons-react'

const PAGE_SIZE: number = 15

// TODO: fix this to be the same as the schema
interface Asset {
  ID: number;
  Type: String;
  AssetModel: String;
  SerialNum: String;
  BundleNum: number;
  UpdatedAt: Date;
  RecInvDate: Date;
  Status: String;
  EmployeeID: String;
  Location: String;
  LocRemarks: String;
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

// TODO: change the any type of importedRecords to the interface once finished with the table
export default function AssetTable(props: { importedRecords: Array<any> }) {

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(arrSampleData.slice(0, PAGE_SIZE));
  const [selectedRecords, setSelectedRecords] = useState<Asset[]>([]);

  const { importedRecords } = props;

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(importedRecords.slice(from, to));
  }, [page]);

  console.log(importedRecords[0])

  return (
    <>
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
            accessor: 'ID',
            title: 'Asset No.',
            width: 90,
          },
          { accessor: 'Type', title: 'Asset Type' },
          { accessor: 'AssetModel', title: 'Model' },
          { accessor: 'SerialNum', title: 'Serial No.' },
          { accessor: 'BundleNum', title: 'Bundle No.' },
          { accessor: 'Status', title: 'Status' },
          {
            accessor: 'UpdatedAt',
            title: 'Status Updated',
            render: ({ UpdatedAt }) => dayjs(UpdatedAt).format('MMM DD, YYYY'),
          },
          { accessor: 'EmployeeID', title: 'User' },
          { accessor: 'Location', title: 'Location' },
          { accessor: 'LocRemarks', title: 'Location Remarks' },
          {
            accessor: 'RecInvDate',
            title: 'Last Inventory',
            render: ({ RecInvDate }) => dayjs(RecInvDate).format('MMM DD, YYYY'),
          },

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
    </>
  );
}
