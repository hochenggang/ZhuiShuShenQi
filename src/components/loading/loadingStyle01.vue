<template>
    <!-- 等待指示器 -->
    <div class="loading-full">
        <p class="loading-center"></p>
    </div>
</template>
<script>
export default {
    name:"loading"
}
</script>

<style scoped>
.loading-full {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    display: flex;
    justify-content: center;
    align-items: center;

}

.loading-center {
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('https://cdn.imhcg.cn/html/icon/wait.gif');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
