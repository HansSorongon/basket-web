// TODO: Add error handling here!
//
'use server'

import { Asset } from "../common/types";
import { revalidatePath } from 'next/cache'

export async function addAsset(value: Asset) {

  const data = JSON.stringify(value);

  const res = await fetch('https://basket-api.onrender.com/api/v1/assets', {
    method: 'POST',
    body: data
  });

  console.log(data)


  if (res.ok) {
    console.log(res);
    console.log("Successfully created asset!");

    return true;

  } else {
    console.error("Internal Server Error!");
  }

  return false;
}

export async function updateAsset(values: Asset, id: number) {

  console.log("Attempting to make request to server...")

  const res = await fetch(`https://basket-api.onrender.com/api/v1/assets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values)
  });

  if (res.ok) {
    console.log(res);
    console.log("Successfully updated asset!");

    return true;

  } else {
    console.error("Internal Server Error!");
  }

  return false;
}


export async function deleteAssets(assets: Asset[]) {

  console.log("Deleting assets...")

  let assetIds = assets.map((asset) => {
    return asset.id;
  })

  const baseUrl = 'https://basket-api.onrender.com/api/v1/assets/batch?toDelete='
  const encodedString = encodeURIComponent(JSON.stringify({ ids: assetIds }))
  const fullUrl = baseUrl + encodedString;

  const res = await fetch(fullUrl, {
    method: 'DELETE',
  });

  revalidatePath('/');
}



export async function register(credentials: Record<string, any>) {

  delete credentials.confirmPassword

  const res = await fetch('https://basket-api.onrender.com/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });

  if (!res.ok) {
    console.error("Register failed!");
    return;
  }

  console.log("Register success!");
  console.log(res)

}

export async function authenticate(token: string) {

  const tokenJson = { 'token': token }

  const res = await fetch('https://basket-api.onrender.com/api/v1/auth/verify', {
    method: 'POST',
    body: JSON.stringify(tokenJson)
  });

  console.log(res)

  return res.ok
}

