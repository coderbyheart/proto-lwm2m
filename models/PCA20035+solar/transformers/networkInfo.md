---
type: messages
---

# Network info

## Match Expression

```jsonata
appId = 'DEVICE' and $exists(data.networkInfo)
```

## Transform Expression

```jsonata
[
    {"bn": 14203, "n": 0, "vs": data.networkInfo.networkMode, "bt": ts },
    {"n": 1, "v": data.networkInfo.currentBand },
    {"n": 2, "v": data.networkInfo.rsrp },
    {"n": 3, "v": data.networkInfo.areaCode },
    {"n": 4, "v": data.networkInfo.cellID },
    {"n": 5, "v": data.networkInfo.mccmnc },
    {"n": 6, "vs": data.networkInfo.ipAddress },
    {"n": 11, "v": data.networkInfo.eest }
]
```

## Input Example

```json
{
  "appId": "DEVICE",
  "messageType": "DATA",
  "ts": 1676369307222,
  "data": {
    "networkInfo": {
      "currentBand": 20,
      "networkMode": "LTE-M",
      "rsrp": -79,
      "areaCode": 6,
      "mccmnc": 24001,
      "cellID": 56879116,
      "ipAddress": "10.160.243.113"
    }
  }
}
```

## Result Example

```json
[
  {
    "bn": 14203,
    "n": 0,
    "vs": "LTE-M",
    "bt": 1676369307222
  },
  {
    "n": 1,
    "v": 20
  },
  {
    "n": 2,
    "v": -79
  },
  {
    "n": 3,
    "v": 6
  },
  {
    "n": 4,
    "v": 56879116
  },
  {
    "n": 5,
    "v": 24001
  },
  {
    "n": 6,
    "vs": "10.160.243.113"
  }
]
```
