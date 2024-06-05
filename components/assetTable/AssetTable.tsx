'use client';

import dayjs from 'dayjs'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Center, ActionIcon, Button } from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { IconEdit } from '@tabler/icons-react'

import { Asset } from '../../common/types';

const PAGE_SIZE: number = 15

interface AssetTableProps {
  selectedRecords: Asset[],
  setSelectedRecords: any, // set to any to silence the bug
  isMutating?: boolean,
  data?: Asset[]
}

const renderActions: DataTableColumn<Asset>['render'] = (record) => (
  <Center>
    <ActionIcon component='a' href={'/update?id=' + record.id} variant='light' color='var(--mantine-color-green-8)'>
      <IconEdit size='20px' />
    </ActionIcon>
  </Center>
)

export default function AssetTable({ selectedRecords, setSelectedRecords, isMutating, data }: AssetTableProps) {

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<Asset[]>([]);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;

    if (data) {
      setRecords(data.slice(from, to));
    }
  }, [data, page]);


  return (
    <>
      <DataTable
        withTableBorder
        borderRadius="md"
        withColumnBorders
        striped
        highlightOnHover
        records={records}
        columns={[
          {
            accessor: 'assetNum',
            title: 'Asset No.',
            width: 80,
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
        totalRecords={data ? data.length : 0}
        noRecordsText={"The basket is empty!"}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p: number) => setPage(p)}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        fetching={!data || isMutating ? true : false}
      />
    </>
  );
}
