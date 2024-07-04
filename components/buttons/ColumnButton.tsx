'use client'

import { Button, Flex, Popover, Checkbox, ScrollArea } from '@mantine/core'
import { titles } from '../../common/types'

import {
  IconLayoutColumns,
} from '@tabler/icons-react'

function getColumnCheckboxes() {
  let sortedTitles = Object.keys(titles).sort();
  let checkboxes = []
  for (let title of sortedTitles) {
    checkboxes.push(<Checkbox value={title} key={title} label={titles[title as keyof typeof titles]}></Checkbox>)
  }

  return checkboxes;
}

export default function ColumnButton({ columns, setColumns }: { columns: string[], setColumns: any }) {
  return (
    <Popover position='bottom-start'>
      <Popover.Target>
        <Button variant='light' color='rgba(0, 0, 0, 1)' leftSection={<IconLayoutColumns size='20px' />}>Columns</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Checkbox.Group value={columns} onChange={setColumns}>
          <ScrollArea h={200}>
            <Flex direction='column' gap='xs'>
              {getColumnCheckboxes()}
            </Flex>
          </ScrollArea>
        </Checkbox.Group>
      </Popover.Dropdown>
    </Popover>
  )
}
