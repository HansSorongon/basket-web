'use server'


export async function addAsset() {
  console.log("Attempting to post data...")

  const res = await fetch('https://basket-api.onrender.com/api/v1/assets', {
    method: 'POST',
    body: JSON.stringify(
      {
        "assetNum": "TestNum",
        "assetType": "Mouse",
        "assetModel": "Ballsy Bear",
        "specs": "Test Specs",
        "serialNum": "1234567890",
        "pchOrder": "Test PchOrder",
        "salesInv": "Test SalesInv",
        "delivRct": "Test DelivRct",
        "supplier": "Test Supplier",
        "acqDate": "2024-05-27T16:55:45.596847+08:00",
        "warrantyDur": 12,
        "warrEndDate": null,
        "currency": "USD",
        "unitCost": "100",
        "pezaZone": "Test PEZAZone",
        "mktCircle": "Test MktCircle",
        "class": "Test Class",
        "remarks": "Test Remarks",
        "status": "Active",
        "statEffDate": "2024-05-27T16:55:45.596847+08:00",
        "location": "Test Location",
        "locRemarks": "Test LocRemarks",
        "locEffDate": "2024-05-27T16:55:45.596847+08:00",
        "invRemarks": "Test InvRemarks",
        "recInvDate": "0001-01-01T08:00:00+08:00",
        "employeeID": null
      }
    )
  });

  if (res.ok) {
    console.log(res);
  }

}

