<template>
  <div class="header">
      <ul class="items">
          <li class="item left">
              <router-link id="logo" to="/">追书</router-link>
          </li>
          <li class="item right">
              <p class="input-box">
                  <span class="input-icon">
                      <img v-if="!show_search_input" v-on:click="swich" src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik05NzEuOSw5NzEuOWMtMjQuMSwyNC4xLTYzLjIsMjQuMS04Ny4zLDBMNjk1LjEsNzgyLjVDNjIzLjYsODM1LjksNTM1LjIsODY4LDQzOSw4NjhDMjAyLjEsODY4LDEwLDY3NS45LDEwLDQzOUMxMCwyMDIuMSwyMDIuMSwxMCw0MzksMTBjMjM2LjksMCw0MjksMTkyLjEsNDI5LDQyOWMwLDk2LjEtMzIsMTg0LjYtODUuNSwyNTYuMmwxODkuNCwxODkuNEM5OTYsOTA4LjcsOTk2LDk0Ny44LDk3MS45LDk3MS45eiBNNDM5LDEzMi42Yy0xNjkuMiwwLTMwNi40LDEzNy4yLTMwNi40LDMwNi40YzAsMTY5LjIsMTM3LjIsMzA2LjQsMzA2LjQsMzA2LjRTNzQ1LjQsNjA4LjIsNzQ1LjQsNDM5Qzc0NS40LDI2OS44LDYwOC4yLDEzMi42LDQzOSwxMzIuNnoiIHN0eWxlPSJmaWxsOiNGRkZGRkYiPjwvcGF0aD48L2c+PC9zdmc+ICA=">
                  </span>
                  <input class="input" v-model="keyword" v-on:blur="swich" v-on:keyup.13="redirect_to_search" v-if="show_search_input" type="text" v-focus>
              </p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "HeaderWithSearch",
  data: function () {
        return {
            show_search_input: false,
            keyword:'',
        }
    },
  methods: {
      swich: function () {
          this.show_search_input = !this.show_search_input;
      },
      redirect_to_search: function (e) {
          let redirect_url = '/search/?key_word=' + this.keyword;
          this.$router.push(redirect_url);
      }
  },
  directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #b93221;
}

.items {
    width: 100%;
    height: 100%;
}

.item {
    line-height: 50px;
    height: 50px;
    margin: 0 1em;
}

.left {
     float: left;
}

.right {
     float: right;
}

.logo {
    font-size: 1em;
    color: #FFFFFD;
    font-weight: bold;
}

/* .input-box {
    display: table;
} */
.input-icon img {
    width: 1.1em;
}

.input {
    /* display: table-cell;
    vertical-align: middle; */
    font-size: .9rem;
    width: 9em;
    border: none;
    border-radius: 1rem;
    padding: .2rem .5rem;
    outline: none;
    opacity: .5;
}
</style>
