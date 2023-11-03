---
type: messages
---

# Environment sensor: air quality

The Bosch BME680 sensor calculates an Air Quality Index.

See
<https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme680-ds001.pdf>

## Match Expression

```jsonata
appId = 'AIR_QUAL'
```

## Transform Expression

```jsonata
[
    {"bn": 14205, "n": 10, "v": $number(data), "bt": ts }
]
```

## Input Example

```json
{
  "appId": "AIR_QUAL",
  "messageType": "DATA",
  "ts": 1681985384511,
  "data": "177"
}
```

## Result Example

```json
[
  {
    "bn": 14205,
    "n": 10,
    "v": 177,
    "bt": 1681985384511
  }
]
```
