'use server'

import { Asset } from "../common/types";

export async function addAsset(value: Asset) {

  const res = await fetch('https://basket-api.onrender.com/api/v1/assets', {
    method: 'POST',
    body: JSON.stringify(value)
  });

  if (res.ok) {
    console.log(res);
  }

}

