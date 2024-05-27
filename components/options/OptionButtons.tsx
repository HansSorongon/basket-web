import { Group, Button, Flex } from '@mantine/core'
import {
  IconCategory,
  IconTarget,
  IconMapPin,
  IconLayoutColumns,
  IconUserPlus,
  IconTrash
} from '@tabler/icons-react'

import classes from './optionButtons.module.css'

export default function FilterButtons() {
  return (
    <Flex justify='space-between' w='100%' mb='md'>
      <Group>
        <Button variant='default' className={classes.dashedButton} leftSection={<IconCategory size='20px' />}>Classification</Button>
        <Button variant='default' className={classes.dashedButton} leftSection={<IconTarget size='20px' />}>Status</Button>
        <Button variant='default' className={classes.dashedButton} leftSection={<IconMapPin size='20px' />}>Location</Button>
      </Group>

      <Group>
        <Button variant='light' color='rgba(0, 0, 0, 1)' leftSection={<IconLayoutColumns size='20px' />}>Columns</Button>
        <Button variant='light' color='rgba(0, 0, 0, 1)' leftSection={<IconUserPlus size='20px' />}>Assign</Button>
        <Button variant='filled' color='var(--mantine-color-red-6)' leftSection={<IconTrash size='20px' />}>Delete</Button>
      </Group>
    </Flex>
  );
}
