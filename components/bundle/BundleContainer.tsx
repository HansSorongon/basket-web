'use client'

import { useState } from 'react'
import {
  Box,
  Button
} from '@mantine/core'
import { useForm } from '@mantine/form'
import useSWR from 'swr';
import { zodResolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'

import StepperCard from './StepperCard';
import { SelectSection } from './bundleSections/SelectSection'
import { ModifySection } from './bundleSections/ModifySection'
import { EditSection } from './bundleSections/EditSection';

import { Asset } from '../../common/types';

const schema = z.object({})

const fetcher = (url: string) => fetch(url, { method: 'GET' }).then((res) => res.json());


export default function BundleContainer() {

  const { data } = useSWR(
    'https://basket-api.onrender.com/api/v1/assets',
    fetcher,
    {
      onError: (error) => {
        console.error('Failed to fetch resource: ', error);
      }
    })

  const form = useForm({
    mode: 'uncontrolled',
    validate: zodResolver(schema)
  });

  const [active, setActive] = useState(0);
  const [parentAsset, setParentAsset] = useState({})

  return (
    <>
      <StepperCard active={active} setActive={setActive} />

      <Box mt='lg'>

        {
          active == 0 &&
          SelectSection(data, (data: any) => { setParentAsset(data.record), setActive(1) })
        }

        {
          active == 1 &&
          ModifySection(parentAsset as Asset)
        }

        {
          active == 2 &&
          EditSection(form)
        }

      </Box>
    </>
  )
}
