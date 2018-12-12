<template>

    <div id="finding">
        <HeaderWithBack :msg="msg"></HeaderWithBack>
        <div class="full">
            
            <ul class="items" v-if="sortData">
                <p class="text">男生</p>
                <li class="item" v-for="i in sortData.male">
                    <router-link class="title" :to="{ path:'/booklist', query: { gender:'male',from:'sort', major: i.name, msg:i.name}}">
                        {{ i.name }}
                    </router-link> 
                    <!-- <span class="count">
                        {{ i.bookCount }}
                    </span> -->
                </li>
            </ul>

            <ul class="items" v-if="sortData">
                <p class="text">女生</p>
                <li class="item" v-for="i in sortData.female">
                    <router-link class="title" :to="{ path:'/booklist', query: { gender:'female',from:'sort', major: i.name, msg:i.name}}">
                        {{ i.name }}
                    </router-link> 
                    <!-- <span class="count">
                        {{ i.bookCount }}
                    </span> -->
                </li>
            </ul>

            <ul class="items" v-if="rankingData">
                <p class="text">男生</p>
                <li class="item" v-for="i in rankingData.male">
                    <router-link class="title" :to="{ path:'/booklist', query: { gender:'male',from:'ranking', rankId: i._id, msg:i.shortTitle}}">
                        {{ i.shortTitle }}
                    </router-link> 
                </li>
            </ul>

            <ul class="items" v-if="rankingData">
                <p class="text">女生</p>
                <li class="item" v-for="i in rankingData.female">
                    <router-link class="title" :to="{ path:'/booklist', query: { gender:'female', from:'ranking', rankId: i._id, msg:i.shortTitle}}">
                        {{ i.shortTitle }}
                    </router-link> 
                </li>
            </ul>

        </div>

        
    </div>

</template>

<script>
import HeaderWithBack from "./HeaderWithBack";
import Config from "../config";

export default {
  name: "FindingTarget",
  components: {
    HeaderWithBack
  },
  data: function() {
    return {
      msg: "",
      target: this.$route.params.target,
      Data: "",
      sortData: "",
      rankingData: ""
    };
  },
  beforeMount: function() {
    switch (this.target) {
      case "sort":
        // 请求分类
        this.request(Config.API.Cats, "sortData");
        break;

      case "ranking":
        // 请求排行
        this.request(Config.API.Ranking, "rankingData");
        break;

      default:
        break;
    }
  },
  methods: {
    request: function(url, to) {
      fetch(Config.PROX_GATE, {
        method: "POST",
        body: JSON.stringify({
          url: url
        })
      })
        .then(res => res.json())
        .then(res => {
          if (to == "sortData") {
            this.sortData = res;
          } else if (to == "rankingData") {
            this.rankingData = res;
          }
        });
    }
  }
}
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
  padding: 0.5rem;
  width: 100%;
}

.item {
  display: inline-block;
  margin-top: 0.2rem;
  background-color: #fff2f2;
  padding: 0.5rem;
  margin: .2rem;
  text-align: center;
}

.title {
  font-size: 1rem;
  font-weight: bold;
  color: #b93221;
  cursor: pointer;
  display: block;
}

.count {
  font-size: 0.9rem;
  font-weight: lighter;
  color: #b93221;
  margin-top: 0.2em;
}

.text {
  font-size: 1rem;
  font-weight: bold;
  color: #121212;
  margin: 0.2em;
}


</style>
