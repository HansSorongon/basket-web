'use client'
import { Group, Button, Flex, Popover, Checkbox, Transition } from '@mantine/core'
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
}

async function handleDelete(assets: Asset[], trigger: any) {
  await deleteAssets(assets);
  trigger();
}

export default function OptionsButtonsProps({ data, selectedRecords, trigger }: OptionButtonsProps) {

  return (
    <Flex justify='space-between' w='100%' mb='md'>
      <Group>
        <Button variant='default' className={classes.dashedButton} leftSection={<IconCategory size='20px' />}>Classification</Button>
        <Button variant='default' className={classes.dashedButton} leftSection={<IconTarget size='20px' />}>Status</Button>
        <Button variant='default' className={classes.dashedButton} leftSection={<IconMapPin size='20px' />}>Location</Button>
      </Group>

      <Group>
        <Popover>
          <Popover.Target>
            <Button variant='light' color='rgba(0, 0, 0, 1)' leftSection={<IconLayoutColumns size='20px' />}>Columns</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Flex direction='column' gap='xs'>
              <Checkbox label="Asset Number" />
              <Checkbox label="Asset Model" />
              <Checkbox label="Sales Invoice" />
              <Checkbox label="Market Circle" />
            </Flex>
          </Popover.Dropdown>
        </Popover>
        <Button variant='light' color='rgba(0, 0, 0, 1)' leftSection={<IconUserPlus size='20px' />}>Assign</Button>
        <Button classNames={{ root: classes.root }} disabled={selectedRecords.length > 0 ? false : true} variant='filled' color='var(--mantine-color-red-6)' leftSection={<IconTrash size='20px' />} onClick={() => handleDelete(selectedRecords, trigger)}>Delete</Button>
      </Group>
    </Flex >
  );
}
