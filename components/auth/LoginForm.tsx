'use client'
import { useState } from 'react'
import { Text, TextInput, Button, Loader, Alert, Transition } from '@mantine/core'
import { IconMail, IconInfoCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

import { ForgotPasswordInput } from "./PasswordInput";

export function LoginForm({ loginCallback }: { loginCallback: any }) {

  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled'
  });

  async function handleSubmit(values: typeof form.values) {

    setLoading(true);
    const res = await loginCallback(values);
    setLoading(false);

    if (res == 'Failed') setFailed(true);

  };

  function handleError() {
    console.log("Error!");
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>

        <Transition
          mounted={failed}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => <Alert style={styles} py='xs' radius='sm' mb='sm' variant="light" color="red" title="Login credentials invalid!" icon={<IconInfoCircle />} />}

        </Transition>

        <Text component="label" htmlFor="your-password" size="sm" fw={500}>
          Email
        </Text>
        <TextInput leftSection={<IconMail size={16} />} placeholder="example@gmail.com" id="your-email" mb='xs'
          key={form.key('email')}
          {...form.getInputProps('email')} />

        <ForgotPasswordInput
          key={form.key('password')}
          {...form.getInputProps('password')} />
        <Button type='submit' w='100%' mb='6px' mt='md'>{loading ? <Loader color='white' type='dots' size='sm' /> : 'Log In'}</Button>
      </form>
    </>
  );
}
