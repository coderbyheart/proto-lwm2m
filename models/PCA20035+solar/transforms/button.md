---
type: messages
---

# Button Press

Describes a button press.

## Match Expression

```jsonata
appId = 'BUTTON'
```

## Transform Expression

```jsonata
[
    {"bn": "14220/0/", "n": "0", "v": $number(data), "bt": ts }
]
```

## Input Example

```json
{
  "data": "1",
  "appId": "BUTTON",
  "messageType": "DATA",
  "ts": 1676366857236
}
```

## Result Example

```json
[
  {
    "bn": "14220/0/",
    "n": "0",
    "v": 1,
    "bt": 1676366857236
  }
]
```
