<template>

    <div class="full">
        <HeaderWithSearch></HeaderWithSearch>
        <FuncSwich active="finding"></FuncSwich>
        <ul class="items">
            <li class="item">
            <router-link to="/finding/sort">分类</router-link>
            </li>
            <li class="item">
            <router-link to="/finding/ranking">排行</router-link>
            </li>
        </ul>
    </div>

</template>

<script>
import HeaderWithSearch from "./HeaderWithSearch"
import FuncSwich from "./FuncSwich"
export default {
  name: "Finding",
  components: {
    HeaderWithSearch,
    FuncSwich
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
}
.items {
    width: 100%;
    padding: 0 1rem;
    padding: 0;
    margin-top: 1rem;
}
.item {
    margin: .5rem;
    padding: 1rem;
    border-bottom: 1px solid #d7d7d7;
    border-top: 1px solid #d7d7d7;
}
.item a{
    color: #323232;
}
</style>
