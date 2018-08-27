## 追书神器 API
---
```json
{
	"info": "追书神器API，使用腾讯云服务器中转，支持跨域。感谢 https://github.com/xiadd",
	"target": {
		"书籍的分类及子类": {
			"method": "GET",
			"url": "/api/v1/zssq/catalog"
		},
		"书籍的分类详情(子类为可选参数))": {
			"method": "GET",
			"url": "/api/v1/zssq/catalog/detail?major=<主分类>(&mins=<子类>)"
		},
		"排名分类": {
			"method": "GET",
			"url": "/api/v1/zssq/ranking/gender"
		},
		"排名详情": {
			"method": "GET",
			"url": "/api/v1/zssq/ranking/<排名的 id>"
		},
		"搜索书名或者作者": {
			"method": "GET",
			"url": "/api/v1/zssq/search/<关键字或作者>"
		},
		"某本书的源": {
			"method": "GET",
			"url": "/api/v1/zssq/atoc/<书的 id>"
		},
		"某本书的详情": {
			"method": "GET",
			"url": "/api/v1/zssq/book/<书的 id>"
		},
		"某源的章节列表": {
			"method": "GET",
			"url": "/api/v1/zssq/btoc/<源的 id>"
		},
		"获取某书的章节内容": {
			"method": "GET",
			"url": "/api/v1/zssq/chapter?link=<章节链接>"
		}
	}
}
```