---
type: messages
---

# Environment sensor: humidity

## Match Expression

```jsonata
appId = 'HUMID'
```

## Transform Expression

```jsonata
[
    {"bn": "/14205/0/", "n": "1", "v": $number(data), "bt": ts }
]
```

## Input Example

```json
{
  "appId": "HUMID",
  "messageType": "DATA",
  "ts": 1681985384511,
  "data": "23.16"
}
```

## Result Example

```json
[
  {
    "bn": "/14205/0/",
    "n": "1",
    "v": 23.16,
    "bt": 1681985384511
  }
]
```
