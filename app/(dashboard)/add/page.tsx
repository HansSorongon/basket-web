import {
  Flex,
  Title,
  Divider,
  Paper,
  TextInput
} from '@mantine/core'

import classes from './add.module.css'

export default function AccountabilityForm() {
  return (
    <Flex direction='column'>

      < Title lineClamp={1} >Add Asset</Title >
      <Divider my='md' />

      <Paper bg='var(--mantine-color-gray-0)' w='100%' h='80vh' p='md'>

        <Flex direction='column'>
          <TextInput w='29vh' label='Bundle No.'></TextInput>
        </Flex>

      </Paper>

    </Flex >

  );
}
