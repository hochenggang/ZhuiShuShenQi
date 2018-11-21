<template>
    <div id="search">
        <HeaderWithBack :msg="key_word"></HeaderWithBack>
        <div class="full">
            <div v-if="Search_data">
                <ul id="items">
                    <li class="item" v-for="book in Search_data['books']" :key="book._id">
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
  name: "Search",
  components: {
    HeaderWithBack
  },
  data: function() {
    return {
      Search_data: "",
      key_word: ""
    };
  },
  beforeMount: function() {
    this.search();
  },
  watch: {
    $route: function() {
      this.search();
    }
  },
  methods: {
    search: function() {
      this.key_word = this.$route.query.key_word;
      fetch(Config.PROX_GATE, {
        method: "POST",
        body: JSON.stringify({
          url: Config.API.Search + this.key_word
        })
      })
        .then(res => res.json())
        .then(res => {
          this.Search_data = res;
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
