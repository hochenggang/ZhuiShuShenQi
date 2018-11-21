<template>
    <div class="swich">
        <ul class="items">
            <li class="item">
                <router-link to="/mybook">书架</router-link>
            </li>
            <li class="item">
                <router-link to="/finding">发现</router-link>
            </li>
        </ul>
    </div>  
</template>

<script>
export default {
    name: "FuncSwich",
};
</script>

<style scoped>
.swich {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #b93221;
}

.items {
    width: 100%;
    height: 100%;
    text-align: center;
}

.item {
    line-height: 50px;
    margin: 0 1em;
    display: inline;
}

.item a {
    color: #d5847a;
}

a.router-link-active {
    color: #fffffd;
}

</style>
