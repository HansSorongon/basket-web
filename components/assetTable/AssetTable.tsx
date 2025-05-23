'use client';

import dayjs from 'dayjs'
import { titles } from '../../common/types';
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Center, ActionIcon, Button } from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { IconEdit } from '@tabler/icons-react'

import { Asset } from '../../common/types';

const PAGE_SIZE: number = 15

interface AssetTableProps {
  selectedRecords?: Asset[],
  setSelectedRecords?: any, // set to any to silence the bug
  isMutating?: boolean,
  data?: Asset[]
  columns: string[],
  pagination?: boolean,
  emptyState?: any,
  onRowClick?: any
}

const renderActions: DataTableColumn<Asset>['render'] = (record) => (
  <Center>
    <ActionIcon component='a' href={'/update?id=' + record.id} variant='light' color='var(--mantine-color-green-8)'>
      <IconEdit size='20px' />
    </ActionIcon>
  </Center>
)

function generateColumns(columns: string[]): DataTableColumn<Asset>[] {

  const columnProps = []

  for (let title in titles) {
    if (columns.includes(title)) {
      if (title.toLowerCase().includes('date')) {
        columnProps.push({
          accessor: title,
          title: titles[title as keyof typeof titles],
          render: (data: Asset) => dayjs(data[title as keyof Asset]).format('MMM DD YYYY')
        })
      } else {
        columnProps.push({ accessor: title, title: titles[title as keyof typeof titles] })
      }
    }
  }

  if (columns.includes('update')) columnProps.push({ accessor: 'actions', title: 'Update', width: '0%', render: renderActions })

  return columnProps as DataTableColumn<Asset>[];
}

export default function AssetTable({ selectedRecords, setSelectedRecords, isMutating, data, columns, emptyState, onRowClick }: AssetTableProps) {

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
        columns={generateColumns(columns)}
        totalRecords={data ? data.length : 0}
        noRecordsText={"The basket is empty!"}
        recordsPerPage={PAGE_SIZE}
        page={page} // TODO: find a workaround to this
        emptyState={emptyState}
        onPageChange={(p: number) => setPage(p)}
        selectedRecords={selectedRecords}
        onRowClick={onRowClick}
        onSelectedRecordsChange={setSelectedRecords}
        fetching={!data || isMutating ? true : false}
        pinLastColumn
      />
    </>
  );
}


