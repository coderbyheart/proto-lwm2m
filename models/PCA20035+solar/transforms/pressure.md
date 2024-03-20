---
type: messages
---

# Environment sensor: atmospheric pressure

## Match Expression

```jsonata
appId = 'AIR_PRESS'
```

## Transform Expression

```jsonata
[
    {"bn": "14205/0/", "n": "2", "v": $number(data)*10, "bt": ts }
]
```

## Input Example

```json
{
  "appId": "AIR_PRESS",
  "messageType": "DATA",
  "ts": 1681985384511,
  "data": "102.31"
}
```

## Result Example

```json
[
  {
    "bn": "14205/0/",
    "n": "2",
    "v": 1023.1,
    "bt": 1681985384511
  }
]
```
