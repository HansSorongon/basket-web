
import { Flex, Title, Divider } from '@mantine/core'

import BundleContainer from '../../../components/bundle/BundleContainer'

function SelectParentAssetsSection() {
  return (
    <Title>Select Parent Assets</Title>
  )
}

function ModifyBundleSection() {
  return (
    <Title>Modify Bundle</Title>
  )
}

function EditDetailsSection() {
  return (
    <Title>Edit Details</Title>
  )
}

export default function Bundle() {
  return (
    <Flex direction='column'>

      < Title lineClamp={1}>Bundle Assets</Title >
      <Divider my='md' />

      <BundleContainer />

    </Flex >
  );
}
