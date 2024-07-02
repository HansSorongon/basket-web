'use client'

import { useState } from 'react'
import {
  Box,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import StepperCard from './StepperCard';
import { zodResolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'

import { SelectSection } from './bundleSections/SelectSection'
import { ModifySection } from './bundleSections/ModifySection'
import { EditSection } from './bundleSections/EditSection';

const schema = z.object({})

export default function BundleContainer() {

  const form = useForm({
    mode: 'uncontrolled',
    validate: zodResolver(schema)
  });

  const [active, setActive] = useState(0);

  return (
    <>
      <StepperCard active={active} setActive={setActive} />

      <Box mt='lg'>

        {
          active == 0 &&
          SelectSection()
        }

        {
          active == 1 &&
          ModifySection()
        }

        {
          active == 2 &&
          EditSection(form)
        }

      </Box>

    </>
  )
}
