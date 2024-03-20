---
type: messages
---

# Solar Charge gain

The gain measured from the solar shield.

## Match Expression

```jsonata
appId = 'SOLAR'
```

## Transform Expression

```jsonata
[
    {"bn": "14210/0/", "n": "0", "v": $number(data), "bt": ts }
]
```

## Input Example

```json
{
  "appId": "SOLAR",
  "messageType": "DATA",
  "ts": 1681985624779,
  "data": "3.123456"
}
```

## Result Example

```json
[
  {
    "bn": "14210/0/",
    "n": "0",
    "v": 3.123456,
    "bt": 1681985624779
  }
]
```
