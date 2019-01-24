<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'app'
}

</script>

<style>

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html {
    font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
}

body {
    font-size: 16px;
    background-color: #FFFFFD;
}

p {
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


</style>
