'use server'

import { cookies } from 'next/headers'

import { Asset } from "../common/types";
import { revalidatePath } from 'next/cache'

import { redirect } from 'next/navigation';

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
    cache: 'no-store'
  });

  if (res.ok) {
    console.log('Deleted assets.')
  }

  revalidatePath('/');
}

export async function deleteParams(paramType: string, paramIds: number[]) {

  console.log("Deleting params...")
  console.log(paramType)
  console.log(paramIds)

  const baseUrl = 'https://basket-api.onrender.com/api/v1/maintenance/' + paramType + '?toDelete='
  const encodedString = encodeURIComponent(JSON.stringify({ ids: paramIds }))
  const fullUrl = baseUrl + encodedString

  console.log(fullUrl)

  const res = await fetch(fullUrl, {
    method: 'DELETE',
    cache: 'no-store'
  });

  if (res.ok) {
    console.log('Deleted params.')
  }

  revalidatePath('/dataMaintenance');
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
  redirect('/login')
}

export async function authenticate(token: string) {

  const tokenJson = { 'token': token }

  const res = await fetch('https://basket-api.onrender.com/api/v1/auth/verify', {
    method: 'POST',
    body: JSON.stringify(tokenJson)
  })

  if (res.ok) {
    const body = await res.json();
    return body;
  }

  return {};
}

export async function logout() {
  cookies().delete('Auth')
  redirect('/login')
}

export async function unbundleAssets(bundleId: number, assetIds: number[]) {

  const url = 'https://basket-api.onrender.com/api/v1/bundles/removeFrom/' + bundleId

  const res = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ 'assetIDs': assetIds })
  })

  if (res.ok) {
    console.log("Successfully unbundled assets.")
  }

}

export async function bundleAssets(bundleId: number, assetIds: number[]) {

  console.log("Attempting to bundle assets...")

  const url = 'https://basket-api.onrender.com/api/v1/bundles/addTo/' + bundleId

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ 'assetIDs': assetIds })
  })

  if (res.ok) {
    console.log("Successfully bundled assets.")
  }

}

export async function createBundle(id: number) {

  const url = 'https://basket-api.onrender.com/api/v1/bundles'

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ 'id': id })
  })

  if (res.ok) {
    const body = await res.json()
    return body['id']
  }

  return null
}

export async function updateBundle(values: any, id: number) {

  console.log(values)

  const url = 'https://basket-api.onrender.com/api/v1/bundles/' + id

  const res = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(values)
  })

  if (res.ok) {
    console.log('Updated bundle details!')
    return
  }

  console.log('Updating failed!')
}
