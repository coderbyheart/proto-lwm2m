---
type: messages
---

# Device info

## Match Expression

```jsonata
appId = 'DEVICE' and $exists(data.deviceInfo)
```

## Transform Expression

```jsonata
[
    {"bn": "/14204/0/", "n": "0", "vs": data.deviceInfo.imei, "bt": ts },
    {"n": "1", "vs": data.deviceInfo.iccid },
    {"n": "2", "vs": data.deviceInfo.modemFirmware },
    {"n": "3", "vs": data.deviceInfo.appVersion },
    {"n": "4", "vs": data.deviceInfo.board },
    {"n": "5", "vs": data.deviceInfo.bat }
]
```

## Input Example

```json
{
  "appId": "DEVICE",
  "messageType": "DATA",
  "ts": 1676369307189,
  "data": {
    "deviceInfo": {
      "imei": "350457794611739",
      "iccid": "8931080620054223678",
      "modemFirmware": "mfw_nrf9160_1.3.3",
      "board": "thingy91_nrf9160",
      "appVersion": "0.0.0-development"
    }
  }
}
```

## Result Example

```json
[
  {
    "bn": "/14204/0/",
    "n": "0",
    "vs": "350457794611739",
    "bt": 1676369307189
  },
  {
    "n": "1",
    "vs": "8931080620054223678"
  },
  {
    "n": "2",
    "vs": "mfw_nrf9160_1.3.3"
  },
  {
    "n": "3",
    "vs": "0.0.0-development"
  },
  {
    "n": "4",
    "vs": "thingy91_nrf9160"
  }
]
```
