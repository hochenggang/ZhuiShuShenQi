<template>
    <!-- 显示器 -->
    <div class="readerContent">
        <transition name="slide-fade">
            <p v-if="ok" v-html="pureText()"></p>
        </transition>
        
    </div>
  
</template>

<script>

export default {
    name: 'readerContent',
    props:{
        chapter:Object,
        ok:Boolean
    },
    methods: {
        pureText:function(){
            let pure = null;
            let raw_text = null;
            // 判断章节内文本内容
            if (this.chapter){
                if (this.chapter.chapter.body){
                    raw_text = this.chapter.chapter.body;
                    pure = '<p>'+raw_text.replace(/\n\n/g, '\n').replace(/\n/g, '</p><p>').replace(/\s/g, '')+'</p>';
                }
            }
            return pure
        } 
    }

       
}
</script>

<style scoped>
.readerContent {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 5%;

    overflow-y: auto;
    -webkit-overflow-scrolling : touch;
    padding: .5rem;

    background-color: rgba(250, 235, 215, 0.616);
}

.readerContent p {
    text-indent: 2rem;
    line-height: 2rem;
    word-wrap: break-word;
    font-family: inherit;
    font-size: 1.1rem;
}

.slide-fade-enter-active {
  transition: all .1s ease-in;
}
.slide-fade-leave-active {
  transition: all .1s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to{
  opacity: 0;
}
</style>
