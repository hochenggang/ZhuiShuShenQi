<template>
  <!-- 阅读器 -->
  <div class="reader">
    <Loading v-if="!ok"></Loading>
    <readerContent :ok="ok" :chapter="reading.chapter"></readerContent>
    <readerControlBar :reading="reading" :show="show"></readerControlBar>
    <readerCatalogue v-if="show.catalogue" :reading="reading" :show="show"></readerCatalogue>
  </div>
</template>

<script>
// 通过路由接收书籍ID
// 检查缓存 -> 有则直接加载缓存，没有缓存进入下一步
// 书籍ID -> 默认书源
// 请求目录，请求第一章
// 阅读器加载完成

// 引用配置
import Config from "../../config";
// 导入等待指示器
import Loading from "../loading/loadingStyle01.vue";
import readerContent from "./readerContent.vue";
import readerControlBar from "./readerControlBar.vue";
import readerCatalogue from "./readerCatalogue.vue";

export default {
  name: "reader",
  components: {
    Loading,
    readerContent,
    readerControlBar,
    readerCatalogue
  },
  data: function() {
    return {
      ok: false,
      reading: {
        bookId: null,
        chapters: null,
        index: 0,
        chapter: null,
        collected: false
      },
      cache: false,
      show: {
        catalogue: false
      }
    };
  },

  mounted: function() {
    // 挂载组件后开始载入缓存
    // 缓存的值为字符串或未定义
    // 如果未定义，为缓存赋值为一个空的对象
    if (!localStorage[Config.Cache.name]) {
      localStorage[Config.Cache.name] = JSON.stringify({
        books: {}
      });
    }
    // 获取非空缓存,加载到当前组件
    this.cache = JSON.parse(localStorage[Config.Cache.name]);
    // 校验
    if (this.cache) {
      console.log("阅读器成功加载浏览器缓存");
    } else {
      return false;
    }

    // 第二步: 加载书源
    // 获取通过路由传入的书籍ID
    this.reading.bookId = this.$route.query.bookId;
    // 检查该书籍缓存是否存在
    // 结果为的值为字符串或未定义
    if (this.cache.books[this.reading.bookId]) {
      console.log("查找到本地缓存");
      // 接下来读取缓存中的书源和阅读进度索引
      let cache = this.cache.books[this.reading.bookId];
      this.reading.collected = true;
      this.reading.bookId = cache.bookId;
      this.reading.index = cache.index;
      // 请求默认源数据
      this.loadSource(Config.API.mixtocSource + this.reading.bookId);
    } else {
      console.log("没找到该书的本地缓存");
      // 请求默认源数据
      this.loadSource(Config.API.mixtocSource + this.reading.bookId);
    }

    // 监听返回，重置标题
    window.addEventListener('popstate',function(){
      console.log('返回');
      document.title = '追书Web';
    })
  },
  methods: {
    // 加载默认书源
    get: function(url, saveTo = { obj: null, key: null }, callback = null) {
      return fetch(Config.PROXY_GATEWAY, {
        headers: {
          "content-type": "application/json"
        },
        method: "post",
        body: JSON.stringify({
          url: url
        })
      }).then(response => {
        if (response.status === 200) {
          response.json().then(response => {
            // 保存请求结果
            saveTo.obj[saveTo.key] = response;
            if (callback) {
              callback();
            }
          });
        }
      });
    },
    loadSource: function(url) {
      // 加载书源并回调加载章节
      this.get(url, { obj: this.reading, key: "chapters" }, this.loadChapter);
    },
    loadChapter: function() {
      // 重置状态
      if (this.ok) {
        this.ok = false;
        this.chapter = null;
      }

      // 生成章节链接
      let chapterUrl = null;
      if (this.reading.chapters) {
        // 默认源的情况
        if (this.reading.chapters.mixToc) {
          chapterUrl = escape(
            this.reading.chapters.mixToc.chapters[this.reading.index].link
          );
        }
        // 如果需要换源，再判断其它情况
      }
      let url = Config.API.mixtocChapter + chapterUrl;

      // 请求章节内容
      this.get(url, { obj: this.reading, key: "chapter" }, () => {
        // 恢复状态
        this.ok = true;
        // 设置标题
        document.title = this.reading.chapters.mixToc.chapters[this.reading.index].title;
        // 刷新缓存
        if(this.reading.collected){
            this.createCache()
        }
      });
    },
    // 更新缓存
    createCache: function() {
      // 以书籍ID为键注入缓存
      this.cache.books[this.reading.bookId] = {
        bookId: this.reading.bookId,
        index: this.reading.index
      };

      localStorage[Config.Cache.name] = JSON.stringify(this.cache);
    }

  },
  watch: {
    "reading.index": function() {
      // 检测章节数据
      if (!this.reading.chapters){
        return false
      }
      console.log("索引变化，即将加载需要的章节");
      if (this.reading.index < 0) {
        this.reading.index = 0;
        alert("已经是开头了！");
        return false;
      } else if (this.reading.index >= this.reading.chapters.length) {
        this.reading.chapter_index = this.reading.index - 1;
        alert("读完了喔！");
        return false;
      }
      // 如果目录缓存存在，按照链接加载章节
      if (this.reading.chapters) {
        // 加载章节内容
        this.loadChapter();
      }
    },
    // 监听收藏按钮
    "reading.collected": function() {
      // 开启收藏
      if (this.reading.collected) {
        this.createCache();
        console.log('建立缓存，书籍ID为'+this.reading.bookId);
      }
      // 取消收藏
      else {
        // 删除正在阅读的书籍并刷新缓存
        delete this.cache.books[this.reading.bookId];
        localStorage[Config.Cache.name] = JSON.stringify(this.cache);
        console.log('删除缓存，书籍ID为'+this.reading.bookId);

      }
    }
  }
};
</script>

<style>
.reader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(250, 235, 215, 0.6);
}
</style>
