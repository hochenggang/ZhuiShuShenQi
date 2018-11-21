<template>
<div class="header">
      <ul class="items">
          <li class="item left">
              <p><img class="icon" v-on:click="go_back" src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik0zMzQuMiwxNTAuNEwyNy45LDQ1Ni43QzQsNDgwLjYsNCw1MTkuNCwyNy45LDU0My4zbDMwNi4zLDMwNi4zYzIzLjksMjMuOSw2Mi43LDIzLjksODYuNiwwYzIzLjktMjMuOSwyMy45LTYyLjcsMC04Ni42TDIxOS4xLDU2MS4zaDcwOS42YzMzLjgsMCw2MS4zLTI3LjQsNjEuMy02MS4zYzAtMzMuOC0yNy40LTYxLjMtNjEuMy02MS4zSDIxOS4xbDIwMS43LTIwMS43YzEyLTEyLDE3LjktMjcuNiwxNy45LTQzLjNjMC0xNS43LTYtMzEuNC0xNy45LTQzLjNDMzk2LjksMTI2LjUsMzU4LjEsMTI2LjUsMzM0LjIsMTUwLjR6IiBzdHlsZT0iZmlsbDojRkZGRkZGIj48L3BhdGg+PC9nPjwvc3ZnPiAg"></p>
          </li>
          <li class="item right">
             <p class="text" v-if="msg">{{msg}}</p>
          </li>
      </ul>
  </div>


   
 
                
                

</template>

<script>
export default {
    name: "HeaderWithBack",
    props: ['msg'],
    template: '#template-back-header',
    methods: {
        go_back: function () {
            window.history.back();
        }
    }
};
</script>

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
    width: 40%;
    float: right;
    overflow-x: auto;
    text-align: right;
    white-space: nowrap;
    text-overflow: ellipsis;

}

.icon {
    width: 1rem;
}

.text {
    font-size: 1rem;
    font-weight: lighter;
    color: #fffffd;
}
</style>
