export default {
  // 代理网关，接受以POST请求发送的含有url字段的Json数据，并返回该url的请求结果 
  PROX_GATE:'https://web.imhcg.cn/php/proxy/',
  // 追书神器的API，详细说明请参考 API.md
  API:{
    Statics:"https://statics.zhuishushenqi.com",
    Search:"https://api.zhuishushenqi.com/book/fuzzy-search?query=",
    Cats:"https://api.zhuishushenqi.com/cats/lv2/statistics",
    Ranking:"https://api.zhuishushenqi.com/ranking/gender",
    BookByCat:"https://api.zhuishushenqi.com/book/by-categories",
    BookByRanking:"https://api.zhuishushenqi.com/ranking/",
  },
  Cache:{
    'name':'zhuishuweb_cache',
  }
}




