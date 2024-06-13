'use server'

import { cookies } from 'next/headers'

import { Asset } from "../common/types";
import { revalidatePath } from 'next/cache'

// TODO: Add error hadndling here!
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

export async function login(credentials: Record<string, any>) {

  const res = await fetch('https://basket-api.onrender.com/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });

  if (!res.ok) {
    console.error("Login failed!");
    return;
  }

  console.log("Login success!");

  console.log(res)

  const resCookies = res.headers.get('set-cookie');

  if (resCookies) {
    const authCookie = resCookies.split(';')[0].split('=')[1];
    cookies().set('Auth', authCookie);
  }

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

