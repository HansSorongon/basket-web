
import { Title, Text, Box } from '@mantine/core'
import { redirect } from 'next/navigation'
import AssetForm from "../../../components/form/AssetForm";

import { Asset } from '../../../common/types';

import { updateAsset } from '../../../actions/actions';

async function getAsset(id: any) {

  const url = 'https://basket-api.onrender.com/api/v1/assets/' + String(id);

  const res = await fetch(url, {
    method: 'GET',
  });
  const data = await res.json();

  return data;
}

async function submitCallback(values: Asset, id: number) {
  'use server'

  values.warrEndDate = values.warrEndDate ? values.warrEndDate : null;
  values.warrantyDur = +values.warrantyDur
  values.employeeID = values.employeeID ? +values.employeeID : null;

  await updateAsset(values, id);

  redirect('/')
}

export default async function Update({ searchParams }: { searchParams: { id: number } }) {

  return (
    <>
      {
        searchParams['id'] ?
          <AssetForm submitCallback={submitCallback} values={await getAsset(searchParams['id'])} formTitle={'Update Asset'} />
          :
          <Box>
            <Title>No ID found!</Title>
            <Text>Did you try to edit the URL manually?</Text>
          </Box>
      }
    </>
  );

}

