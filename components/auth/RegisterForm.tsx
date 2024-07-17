'use client'

import { useState } from 'react'
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useForm } from '@mantine/form';
import { TextInput, Group, Select, PasswordInput, Button } from '@mantine/core';
import { IconMail, IconUsers, IconLock } from '@tabler/icons-react';

import { register } from '../../actions/actions';

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleInitial: z.string().max(1),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  department: z.string(),
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  }
);

export default function RegisterForm() {

  const [loading, setLoading] = useState(false)


  const form = useForm({
    mode: 'uncontrolled',
    validate: zodResolver(schema)
  });

  function handleSubmit(values: typeof form.values) {
    register(values)
  };

  function handleError() {
    console.log("Error!")
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <TextInput label='First Name' placeholder="Gabriel Alfonso" id="firstName" mb='xs'
        key={form.key('firstName')}
        {...form.getInputProps('firstName')}
      />

      <Group justify='space-between'>
        <TextInput label='Last Name' placeholder="Mortelli" id="lastName" mb='xs' w='65%'
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />
        <TextInput label='Middle Initial' placeholder="P" id="middleInitial" mb='xs' w='30%' maxLength={1}
          key={form.key('middleInitial')}
          {...form.getInputProps('middleInitial')}
        />
      </Group>

      <TextInput label='Email' leftSection={<IconMail size={16} />} placeholder="example@gmail.com" id="your-email" mb='xs'
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <PasswordInput label='Password' placeholder='••••••••••••' leftSection={<IconLock size='16px' />} mb='xs'
        key={form.key('password')}
        {...form.getInputProps('password')}
      />
      <PasswordInput label='Confirm Password' placeholder='••••••••••••' leftSection={<IconLock size='16px' />} mb='xs'
        key={form.key('confirmPassword')}
        {...form.getInputProps('confirmPassword')}
      />

      <Select leftSection={<IconUsers size={16} />} placeholder='Select a department...' label='Department' mb='xs'
        data={['Administrative', 'Human Resources', 'Purchasing', 'IT Operations', 'Sales', 'Marketing', 'Accounting', 'Finance']}
        key={form.key('department')}
        {...form.getInputProps('department')}
      >
      </Select>

      <Button type='submit' w='100%' mb='6px'>Register</Button>
    </form>
  )
}
