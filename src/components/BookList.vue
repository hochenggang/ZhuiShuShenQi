<template>
    <div id="search">
        <HeaderWithBack :msg="query.msg"></HeaderWithBack>
        <div class="full">
            <div v-if="Books">
                <ul id="items">
                    <li class="item" v-for="book in Books" :key="book._id">
                        <router-link class="title" :to="{ path:'/reader', query: { book_id: book['_id']}}">
                            {{book['title']}}
                        </router-link> 

                        <router-link class="author" :to="{ path:'/search', query: { key_word: book['author']}}">
                            {{book['author']}}
                        </router-link>

                        <p class="brief">
                            {{book['shortIntro']}}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  
  
</template>

<script>
import HeaderWithBack from "./HeaderWithBack";
import Config from "../config";

export default {
  name: "BookList",
  // props:['from','rankingId','major','minor'],
  components: {
    HeaderWithBack
  },
  data: function() {
    return {
      Books: "",
      query:{
        msg:this.$route.query.msg,
        gender:this.$route.query.gender,
        from:this.$route.query.from,
        major:this.$route.query.major,
        minor:this.$route.query.minor,
        rankId:this.$route.query.rankId,
      },
      start:0,
    }
  },
  beforeMount: function() {
    // console.log(this.query);
    switch (this.query.from) {
      case "sort":
        // 请求分类
        this.request(Config.API.BookByCat + '?gender='+this.query.gender+'&type=new&major='+this.query.major+'&minor='+(this.query.minor?this.query.minor:'')+'&start='+this.start+'&limit=20');
        break;

      case "ranking":
        // 请求排行
        this.request(Config.API.BookByRanking + this.query.rankId);
        break;

      default:
        break;
    }
  },
  watch: {
    $route: function() {
      
    }
  },
  methods: {
    request: function(url) {
      fetch(Config.PROX_GATE, {
        method: "POST",
        body: JSON.stringify({
          url: url
        })
      })
        .then(res => res.json())
        .then(res => {
          
            this.Books = res.ranking?res.ranking.books:res.books;
        });
    }
  }
};
</script>

<style scoped>
.full {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
}

.items {
  width: 100%;
}

.item {
  margin-top: 0.2rem;
  background-color: #fff2f2;
  padding: 0.5rem;
}

.title {
  font-size: 1rem;
  font-weight: bold;
  color: #b93221;
  cursor: pointer;
  display: block;
}

.author {
  font-size: 0.9rem;
  font-weight: lighter;
  color: #b93221;
  margin-top: 0.2em;
}

.brief {
  font-size: 0.9rem;
  font-weight: lighter;
  margin-top: 0.2em;
}

</style>
