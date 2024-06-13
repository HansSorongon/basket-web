'use client'

import { useState } from 'react'
import { Stepper, Paper } from '@mantine/core'

export default function StepperCard({ active, setActive }: { active: number, setActive: any }) {

  // const nextStep = () => setActive((current: number) => (current < 3 ? current + 1 : current));
  // const prevStep = () => setActive((current: number) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Paper shadow='xs' withBorder={true} py='xl' px='15%' radius='xl'>
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label='Select Parent Asset' description='Select an asset to be the parent'>
          </Stepper.Step>
          <Stepper.Step label='Modify Bundle' description='Add assets to the bundle'>
          </Stepper.Step>
          <Stepper.Step label='Edit Details' description='Edit the details of the bundle'>
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Paper>
    </>
  )
}
