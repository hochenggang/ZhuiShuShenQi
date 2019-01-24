export default {
  // 代理网关，接受以POST请求发送的含有url字段的Json数据，并返回该url的请求结果 
  PROXY_GATEWAY: 'https://web.imhcg.cn/php/proxy/sqlite/',
  // 追书神器的API，详细说明请参考 API.md
  API: {
    statics: "https://statics.zhuishushenqi.com",
    search: "https://api.zhuishushenqi.com/book/fuzzy-search?query=",
    cats: "https://api.zhuishushenqi.com/cats/lv2/statistics",
    ranking: "https://api.zhuishushenqi.com/ranking/gender",
    bookByCat: "https://api.zhuishushenqi.com/book/by-categories",
    bookByRanking: "https://api.zhuishushenqi.com/ranking/",
    mixtocSource:"http://api.zhuishushenqi.com/mix-toc/",
    mixtocChapter: "http://chapter2.zhuishushenqi.com/chapter/",
  },
  Cache: {
    name: 'zhuishuweb_cache',
  }
}




