'use client'

import { PasswordInput, Text, Group, Anchor, Checkbox } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

export function ForgotPasswordInput(props: object) {

  return (
    <>
      <Text component="label" htmlFor="your-password" size="sm" fw={500}>
        Password
      </Text>
      <PasswordInput placeholder="••••••••••••" id="your-password" mb='5px' leftSection={<IconLock size={16} />} {...props} />
      <Group justify='space-between'>
        <Checkbox label='Remember me?' size='xs'></Checkbox>
        <Anchor td='underline' href="#" onClick={(event) => event.preventDefault()} pt={2} fw={500} fz="xs" c='black'>
          Forgot password?
        </Anchor>
      </Group>

    </>
  );
}
