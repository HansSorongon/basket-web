'use client'

import { useState } from 'react'
import {
  Box,
  Button
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import useSWR from 'swr'
import { zodResolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'

import StepperCard from './StepperCard'
import SelectSection from './bundleSections/SelectSection'
import ModifySection from './bundleSections/ModifySection'
import EditSection from './bundleSections/EditSection'
import { Asset } from '../../common/types'

const schema = z.object({})

const fetcher = (url: string) => fetch(url, { method: 'GET' }).then((res) => res.json())


export default function BundleContainer() {

  const { data } = useSWR(
    'https://basket-api.onrender.com/api/v1/assets',
    fetcher,
    {
      onError: (error) => {
        console.error('Failed to fetch resource: ', error)
      }
    })

  const form = useForm({
    mode: 'uncontrolled',
    validate: zodResolver(schema)
  })

  const [active, setActive] = useState(0)
  const [parentAsset, setParentAsset] = useState({})
  const [bundleData, setBundleData] = useState<any>([]) // TODO: make an interface for this

  // modify section
  const initialColumns = ['assetNum', 'assetType', 'serialNum', 'bundleNum', 'status', 'statEffDate',
    'employeeID', 'location', 'locRemarks', 'recInvDate', 'update']

  async function selectParent(parentData: Asset) {
    setParentAsset(parentData)
    setActive(1)
  }

  return (
    <>
      <StepperCard active={active} setActive={setActive} />

      <Box mt='lg'>

        {
          active == 0 &&
          <SelectSection data={data} rowClickCallback={(data: any) => { selectParent(data.record as Asset) }} />
        }

        {
          active == 1 &&
          <ModifySection parentAsset={parentAsset as Asset} assetData={data as Asset[]} />
        }

        {
          active == 2 &&
          <EditSection form={form} />
        }

      </Box>
    </>
  )
}
