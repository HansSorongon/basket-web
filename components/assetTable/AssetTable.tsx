'use client';

import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { Center, ActionIcon } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconEdit } from '@tabler/icons-react'

import { Asset } from '../../common/types';

const PAGE_SIZE: number = 15

const renderActions = () => (
  <Center>
    <ActionIcon variant='light' color='var(--mantine-color-green-8)'>
      <IconEdit size='20px' />
    </ActionIcon>
  </Center>
)

export default function AssetTable(props: { importedRecords: Array<Asset> }) {

  const { importedRecords } = props;

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(importedRecords.slice(0, PAGE_SIZE));

  const [selectedRecords, setSelectedRecords] = useState<Array<Asset>>([]);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;

    setRecords(importedRecords.slice(from, to));
  }, [page]);

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
            accessor: 'id',
            title: 'Asset No.',
            width: 90,
          },
          { accessor: 'assetType', title: 'Asset Type' },
          { accessor: 'assetModel', title: 'Model' },
          { accessor: 'serialNum', title: 'Serial No.' },
          { accessor: 'bundleNum', title: 'Bundle No.' },
          { accessor: 'status', title: 'Status' },
          {
            accessor: 'statEffDate',
            title: 'Status Updated',
            render: ({ statEffDate }) => dayjs(statEffDate).format('MMM DD, YYYY'),
          },
          // employee ID
          { accessor: 'employeeID', title: 'User' },
          { accessor: 'location', title: 'Location' },
          { accessor: 'locRemarks', title: 'Location Remarks' },
          {
            accessor: 'recInvDate',
            title: 'Last Inventory',
            render: ({ recInvDate }) => dayjs(recInvDate).format('MMM DD, YYYY'),
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
        totalRecords={importedRecords.length}
        noRecordsText={"The basket is empty!"}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p: number) => setPage(p)}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
      />
    </>
  );
}
