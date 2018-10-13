## 追书神器 API
#### [DEMO](https://hechenggang.github.io/ZhuiShuShenQi/demo/)
---
```
PROX_GATE = '/api/v1/proxy';
fetch(PROX_GATE, {
		method: "POST",
		body: JSON.stringify({ 'url': 'your-url' }),
    })
    .then(res => res.json())
```