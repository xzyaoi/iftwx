# Install

```
pip install wxpush
```

# Usage

```
from wxpush import pusher
p = pusher.Pusher("channelId","posterName")
p.send("title", "content")
```