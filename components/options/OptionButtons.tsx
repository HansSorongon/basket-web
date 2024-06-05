'use client'
import { Group, Button, Flex, Popover, Checkbox, ScrollArea } from '@mantine/core'
import { titles } from '../../common/types'
import {
  IconCategory,
  IconTarget,
  IconMapPin,
  IconLayoutColumns,
  IconUserPlus,
  IconTrash
} from '@tabler/icons-react'

import classes from './optionButtons.module.css'

import { deleteAssets } from '../../actions/actions'
import { Asset } from '../../common/types';

interface OptionButtonsProps {
  selectedRecords: Asset[],
  trigger: any,
  columns: string[],
  setColumns: any,
}

async function handleDelete(assets: Asset[], trigger: any) {
  await deleteAssets(assets);
  trigger();
}

function getColumnCheckboxes() {
  let sortedTitles = Object.keys(titles).sort();
  let checkboxes = []
  for (let title of sortedTitles) {
    checkboxes.push(<Checkbox value={title} key={title} label={titles[title as keyof typeof titles]}></Checkbox>)
  }

  return checkboxes;
}

export default function OptionsButtonsProps({ selectedRecords, trigger, columns, setColumns }: OptionButtonsProps) {

  return (
    <Flex justify='space-between' w='100%' mb='md'>
      <Group>
        <Button variant='default' className={classes.dashedButton} leftSection={<IconCategory size='20px' />}>Classification</Button>
        <Button variant='default' className={classes.dashedButton} leftSection={<IconTarget size='20px' />}>Status</Button>
        <Button variant='default' className={classes.dashedButton} leftSection={<IconMapPin size='20px' />}>Location</Button>
      </Group>

      <Group>
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
        <Button variant='light' color='rgba(0, 0, 0, 1)' leftSection={<IconUserPlus size='20px' />}>Assign</Button>
        <Button variant='filled' color='var(--mantine-color-red-6)' leftSection={<IconTrash size='20px' />} onClick={() => handleDelete(selectedRecords, trigger)}>Delete</Button>
      </Group>
    </Flex>
  );
}
