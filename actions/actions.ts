'use server'

import { Asset } from "../common/types";

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

export async function deleteAssets(assets: Asset[]) {

  let assetIds = assets.map((asset) => {
    return asset.id;
  })

  console.log(assetIds);

  const res = await fetch('https://basket-api.onrender.com/api/v1/assets', {
    method: 'POST',
    body: JSON.stringify(assets)
  });

  if (res.ok) {
    console.log(res);
  }

}
