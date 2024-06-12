
import { Flex, Title, Divider, Stepper } from '@mantine/core'

import StepperCard from '../../../components/bundle/StepperCard';

export default function Bundle() {

  return (
    <Flex direction='column'>

      < Title lineClamp={1}>Bundle Assets</Title >
      <Divider my='md' />

      <StepperCard />

    </Flex >

  );
}
