---
type: messages
---

# Environment sensor: temperature

## Match Expression

```jsonata
appId = 'TEMP'
```

## Transform Expression

```jsonata
[
    {"bn": 14205, "n": 0, "v": $number(data), "bt": ts }
]
```

## Input Example

```json
{
  "appId": "TEMP",
  "messageType": "DATA",
  "ts": 1676366336476,
  "data": "25.73"
}
```

## Result Example

```json
[
  {
    "bn": 14205,
    "n": 0,
    "v": 25.73,
    "bt": 1676366336476
  }
]
```
