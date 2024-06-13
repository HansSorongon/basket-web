'use client'

import { Text, TextInput, Button } from '@mantine/core'
import { IconMail } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

import { ForgotPasswordInput } from "./PasswordInput";

export function LoginForm({ loginCallback }: { loginCallback: any }) {

  const form = useForm({
    mode: 'uncontrolled'
  });

  function handleSubmit(values: typeof form.values) {
    loginCallback(values)
  };

  function handleError() {
    console.log("Error!")
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <Text component="label" htmlFor="your-password" size="sm" fw={500}>
          Email
        </Text>
        <TextInput leftSection={<IconMail size={16} />} placeholder="example@gmail.com" id="your-email" mb='xs'
          key={form.key('email')}
          {...form.getInputProps('email')} />

        <ForgotPasswordInput
          key={form.key('password')}
          {...form.getInputProps('password')} />
        <Button type='submit' w='100%' mb='6px' mt='lg'>Login</Button>
      </form>
    </>
  );
}
