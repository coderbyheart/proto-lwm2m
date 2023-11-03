---
type: messages
---

# Geo Location from ground fix

Uses the ground fix response from nRF Cloud location services for a device geo
location.

## Match Expression

```jsonata
appId = 'GROUND_FIX' and $exists(data.lat) and $exists(data.lon) and $exists(data.uncertainty) and $exists(data.fulfilledWith)
```

## Transform Expression

```jsonata
[
    {"bn": 14201, "n": 0, "v": data.lat, "bt": $millis() },
    {"n": 1, "v": data.lon },
    {"n": 3, "v": data.uncertainty },
    {"n": 6, "vs": data.fulfilledWith }
]
```

## Input Example

```json
{
  "appId": "GROUND_FIX",
  "messageType": "DATA",
  "data": {
    "lat": 59.3381238,
    "lon": 18.00908089,
    "uncertainty": 883.66,
    "fulfilledWith": "MCELL"
  }
}
```

## Result Example

```json
[
  {
    "bn": 14201,
    "n": 0,
    "v": 59.3381238,
    "bt": 1699999999999
  },
  {
    "n": 1,
    "v": 18.00908089
  },
  {
    "n": 3,
    "v": 883.66
  },
  {
    "n": 6,
    "vs": "MCELL"
  }
]
```
