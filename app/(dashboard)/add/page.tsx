import {
  Flex,
  Title,
  Divider,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

import { addAsset } from '../../../actions/actions'
import { Asset } from '../../../common/types'
import AssetForm from '../../../components/form/AssetForm'

export default function Add() {

  async function submitCallback(values: Asset) {
    'use server'

    values.warrEndDate = values.warrEndDate ? values.warrEndDate : null;
    values.warrantyDur = +values.warrantyDur
    values.employeeID = values.employeeID ? +values.employeeID : null;

    let status = await addAsset(values as Asset);

    console.log(status);
  };

  return (
    <Flex direction='column'>

      < Title lineClamp={1} >Add Asset</Title >
      <Divider my='md' />
      <AssetForm submitCallback={submitCallback} />

    </Flex >

  );
}
