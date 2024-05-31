'use server'

import { Asset } from "../common/types";
import { revalidatePath } from 'next/cache'

// TODO: Add error hadndling here!
export async function addAsset(value: Asset) {

  console.log("Attempting to make request to server...")

  const res = await fetch('https://basket-api.onrender.com/api/v1/assets', {
    method: 'POST',
    body: JSON.stringify(value)
  });

  if (res.ok) {
    console.log(res);
    console.log("Successfully created asset!");

    return true;

  } else {
    console.error("Internal Server Error!");
  }

  return false;
}

export async function updateAsset(value: Asset) {

  console.log("Attempting to make request to server...")

  console.log(JSON.stringify(value))

  const res = await fetch('https://basket-api.onrender.com/api/v1/assets', {
    method: 'PUT',
    body: JSON.stringify(value)
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


