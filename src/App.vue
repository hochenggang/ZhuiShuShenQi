<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
}

</script>

<style>
body {
    margin: 0;
    padding: 0;
    width: 100%;
    font-size: 1rem;
    font-family: "Microsoft YaHei";
    background-color: #FFFFFD;
}
p {
    margin: 0;
    color: #323232;
}
a {
    cursor: pointer;
    text-decoration: none;
    color: #FFFFFD;
}
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
img {
    width: 100%;
    border-radius: .3rem;
}

#app {
    width: 100%;
    height: 100%;
    background-color: #FFFFFD;
}
</style>
