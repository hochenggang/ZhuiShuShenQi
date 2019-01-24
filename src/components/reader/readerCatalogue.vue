<template>
  <!-- 目录 -->
  <ul v-if="chapters" class="readerCatalogue" v-scollTop>
    <div class="readerCatalogueContent">
      <li
        v-for="index in range(page*pageCapacity-pageCapacity,page*pageCapacity<totalIndex?page*pageCapacity:totalIndex)"
        @click="reading.index=index,show.catalogue = false"
        :key="index"
      >
        <p>{{ chapters[index].title }}</p>
      </li>
    </div>

    <div class="readerCatalogueControlBar">
      <p @click="page>1? page-=1:page=1">上一页</p>
      <p>
        <input
          type="text"
          v-model="cusPage"
          @keypress.enter="loadCusPage"
          :placeholder="'1 - '+this.maxPage"
        >
      </p>
      <p @click="page<maxPage? page+=1:page=maxPage">下一页</p>
    </div>

    <div class="readerCatalogueMask" @click="show.catalogue=false"></div>
  </ul>
</template>

<script>
export default {
  name: "readerCatalogue",
  directives: {
    scollTop: {
      update: function(el) {
        el.scrollTop = 0;
      }
    }
  },
  props: {
    reading: Object,
    show: Object
  },
  mounted: function() {
    this.chapters = this.loadChapters();
    this.totalIndex = this.chapters.length;
    // 章节量/每页容量=最大页数
    this.maxPage = Math.floor(this.totalIndex / this.pageCapacity) + 1;
    this.page = Math.floor(this.reading.index / this.pageCapacity) + 1;
  },
  data: function() {
    return {
      chapters: null,
      totalIndex: null,
      page: 1,
      pageCapacity: 50,
      maxPage: null,
      cusPage: null
    };
  },

  methods: {
    loadChapters: function() {
      if (this.reading.chapters) {
        if (this.reading.chapters.mixToc) {
          return this.reading.chapters.mixToc.chapters;
        }
      }
    },
    loadCusPage: function() {
      if (!(this.cusPage && this.maxPage)) {
        return false;
      }
      if (this.cusPage <= this.maxPage && this.cusPage > 0) {
        this.page = this.cusPage;
      }
    },
    range: function(start, end) {
      if (end - start > 0) {
        let container = [];
        while (start < end) {
          container.push(start);
          start += 1;
        }
        return container;
      }
    }
  }
};
</script>

<style scoped>
/* .readerCatalogue {
  position: fixed;
  top: 15%;
  left: 15%;
  right: 15%;
  bottom: 20%;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem;

  background-color: rgb(250, 235, 215);
} */

.readerCatalogueContent {
  z-index: 3;
  position: fixed;
  top: 5%;
  left: 10%;
  right: 10%;
  bottom: 15%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem;

  background-color: rgb(250, 235, 215);
}

.readerCatalogueControlBar {
  position: fixed;
  top: 85%;
  left: 10%;
  right: 10%;
  height: 5%;
  min-height: 30px;
  background-color: rgb(250, 235, 215);

  box-shadow: 0px -1px 8px 0px rgba(155, 155, 155, 0.1);

  display: flex;
  justify-content: space-between;

  z-index: 3;
}
.readerCatalogueControlBar p {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33.3%;
  line-height: 100%;

  cursor: pointer;

  font-size: 0.7rem;
  font-weight: lighter;
}

input {
  width: 100%;
  background: transparent;
  border: 1px solid #fff;
  border-radius: 1rem;
  outline: none;
  font-size: 0.8rem;
  padding: 2.5px;
  text-align: center;
  font-weight: lighter;
}

.readerCatalogue li {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  font-size: 0.9rem;
}

.readerCatalogueMask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 5%;

  background-color: rgba(87, 87, 87, 0.9);

  z-index: 2;
}
</style>
