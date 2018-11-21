## 追书神器
### API
http 和 https 均可以成功请求
#### 排行榜
功能 | 地址
---|---
男女排行榜 | http://api.zhuishushenqi.com/ranking/gender
某一排行榜 | http://api.zhuishushenqi.com/ranking/54d42e72d9de23382e6877fb

#### 主题书单
涉及的参数说明：
duration是时间区间，可选参数为last-seven-days、all，分别对应最近七天和全部时间。sort为类别，可选参数为collectorCount、created、updated，分别对应按收藏数、按创建时间、按最后回复时间来排序。start为开始值。gender值分别可以为 male、female，对应男女。
功能 | 地址
---|---
本周最热 | http://api.zhuishushenqi.com/book-list?duration=last-seven-days&sort=collectorCount&start=0&gender=male
全部书单-按创建时间排序 | http://api.zhuishushenqi.com/book-list?duration=all&sort=created&start=0&gender=male
全部书单-按收藏数排序 | https://api.zhuishushenqi.com/book-list?duration=all&sort=collectorCount&start=20&gender=male

#### 分类
涉及的参数说明：
major是一级分类，minor是二级分类，两者均取自两级分类 API。 type值可以为 new、hot、reputation、over 分别对应新书、热门、口碑、完结四类书单。gender值分别可以为 male、female，对应男女。
功能 | 地址
---|---
两级分类-简单-不含书籍数量 | http://api.zhuishushenqi.com/cats/lv2
两级分类-复杂-含有书籍数量等信息 | http://api.zhuishushenqi.com/cats/lv2/statistics
某一分类详情 | https://api.zhuishushenqi.com/book/by-categories?gender=male&type=new&major=%E7%8E%84%E5%B9%BB&minor=%E4%B8%9C%E6%96%B9%E7%8E%84%E5%B9%BB&start=0&limit=50

#### 搜索
涉及的参数说明：query后接URL编码后的字符串

功能 | 地址
---|---
关键字补全 | http://api.zhuishushenqi.com/book/auto-complete?query=%E5%A4%A9%E8%9A%95%E5%9C%9F%E8%B1%86
模糊查询 | http://api.zhuishushenqi.com/book/fuzzy-search?query=%E5%A4%A9%E8%9A%95%E5%9C%9F%E8%B1%86

#### 书籍
涉及的参数说明：query后接URL编码后的字符串

功能 | 地址
---|---
书籍详情 | http://api.zhuishushenqi.com/book/5816b415b06d1d32157790b1
相关推荐 | http://api.zhuishushenqi.com/book/5816b415b06d1d32157790b1/recommend
直接获取某书默认源|http://api.zhuishushenqi.com/mix-toc/5816b415b06d1d32157790b1
获取某书所有源|http://api.zhuishushenqi.com/toc?view=summary&book=5816b415b06d1d32157790b1
根据链接获取章节内容|http://chapter2.zhuishushenqi.com/chapter/http%3A%2F%2Fbook.my716.com%2FgetBooks.aspx%3Fmethod%3Dcontent%26bookId%3D1228859%26chapterFile%3DU_1228859_201709201834299155_5415_4.txt?k=5dd295b56d27899b&t=1541339692
书籍封面-原图 | http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg
书籍封面-略缩图-大|http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F-coverl
书籍封面-略缩图-小|http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F-covers
用户头像-略缩图|http://statics.zhuishushenqi.com/avatar/0c/b9/0cb9ea56199fd5d886f0adda149fbf48-avatars
用户头像-原图|http://statics.zhuishushenqi.com/avatar/0c/b9/0cb9ea56199fd5d886f0adda149fbf48


## 社区
功能 | 地址
---|---
精选讨论|http://api.zhuishushenqi.com/post/review/best-by-book?book=5816b415b06d1d32157790b1
讨论-按最后更新排序|http://api.zhuishushenqi.com/post/by-book?book=53e56ee335f79bb626a496c9&sort=updated&type=normal,vote&start=0&limit=20
讨论-按最新发布排序|http://api.zhuishushenqi.com/post/by-book?book=53e56ee335f79bb626a496c9&sort=created&type=normal,vote&start=0&limit=20
讨论-按最多回复排序|http://api.zhuishushenqi.com/post/by-book?book=53e56ee335f79bb626a496c9&sort=comment-count&type=normal,vote&start=0&limit=20
某一讨论的详情|http://api.zhuishushenqi.com/post/5bdd0bca7102439e1c623aaf
某一讨论的回复|http://api.zhuishushenqi.com/post/5bdd0bca7102439e1c623aaf/comment
某一讨论的神回复|http://api.zhuishushenqi.com/post/5bdd0bca7102439e1c623aaf/comment/best
书评-按创建时间排序|http://api.zhuishushenqi.com/post/review/by-book?book=53e56ee335f79bb626a496c9&sort=created&start=0&limit=20
书评-按回复数排序|http://api.zhuishushenqi.com/post/review/by-book?book=53e56ee335f79bb626a496c9&sort=comment-count&start=0&limit=20
某一书评的详情|http://api.zhuishushenqi.com/post/review/5b778d980ce5a30f31141716
某一书评的回复|http://api.zhuishushenqi.com/post/review/5b778d980ce5a30f31141716/comment?start=0&limit=30
书荒互助|http://api.zhuishushenqi.com/post/help?duration=all&sort=updated&start=0&limit=20
综合讨论|http://api.zhuishushenqi.com/post/by-block?block=ramble&duration=all&sort=updated&type=all&start=0&limit=20


