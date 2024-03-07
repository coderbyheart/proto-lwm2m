---
type: messages
---

# Geo Location from a device message

## Match Expression

```jsonata
appId = 'GNSS'
```

## Transform Expression

```jsonata
[
    {"bn": "/14201/0/", "n": "0", "v": data.lat, "bt": ts },
    {"n": "1", "v": data.lng },
    {"n": "2", "v": data.alt },
    {"n": "3", "v": data.acc },
    {"n": "4", "v": data.spd },
    {"n": "5", "v": data.hdg },
    {"n": "6", "vs": "GNSS" }
]
```

## Input Example

```json
{
  "appId": "GNSS",
  "messageType": "DATA",
  "ts": 1690820492999,
  "data": {
    "lng": 10.437692463102255,
    "lat": 63.43308707524497,
    "acc": 4.703136444091797,
    "alt": 138.33331298828125,
    "spd": 0.02938256226480007,
    "hdg": 185.11207580566406
  }
}
```

## Result Example

```json
[
  {
    "bn": "/14201/0/",
    "n": "0",
    "v": 63.43308707524497,
    "bt": 1690820492999
  },
  {
    "n": "1",
    "v": 10.437692463102255
  },
  {
    "n": "2",
    "v": 138.33331298828125
  },
  {
    "n": "3",
    "v": 4.703136444091797
  },
  {
    "n": "4",
    "v": 0.02938256226480007
  },
  {
    "n": "5",
    "v": 185.11207580566406
  },
  {
    "n": "6",
    "vs": "GNSS"
  }
]
```
