---
type: messages
---

# Battery state of charge

This is the legacy battery state of charge using the modem's battery
information.

## Match Expression

```jsonata
appId = 'BATTERY'
```

## Transform Expression

```jsonata
[
    {"bn": "14202/0/", "n": "0", "v": $number(data), "bt": ts }
]
```

## Input Example

```json
{
  "appId": "BATTERY",
  "messageType": "DATA",
  "ts": 1687448260542,
  "data": "94"
}
```

## Result Example

```json
[
  {
    "bn": "14202/0/",
    "n": "0",
    "v": 94,
    "bt": 1687448260542
  }
]
```
