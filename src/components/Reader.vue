<template>
    <!-- 阅读器 -->
    <div id="reader">
        <!-- 等待指示器 -->
        <div v-if="!reading.book_chapters_cache" class="full">
            <p class="center-wait"></p>
        </div>

        <!-- 功能区 -->
        <div v-if="reading.book_chapters_cache" class="msg">
            <ul class="menu">
                <li @click="reading.chapter_index-=1" class="menu-item last">
                    <p>
                       <img src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik0xMCw1MDhsNDAyLjUsNDkwTDU3MCw4NThMMzYwLDYxM2g2MzBWNDAzSDM2MGwyMTAtMjQ1TDQxMi41LDE4TDEwLDUwOHoiIHN0eWxlPSJmaWxsOiNBQ0FDQUMiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPiAg">
                    </p>
                </li>
                <li @click="need_catalog = !need_catalog" class="menu-item last">
                    <p>
                        <img v-if="!need_catalog" src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik00NjkuNCw3ODMuNlYxNDAuNWgtNDUuOWMtMS43LDEuMS02LjksNC43LTE1LjcsMTAuNmMtOC44LDYtMTQuMiw5LjYtMTYuMiwxMS4xYy0yLDEuNC02LjcsNC41LTE0LDkuNHMtMTIuNiw3LjgtMTUuNyw4LjljLTMuMSwxLjEtNy45LDMuNC0xNC41LDYuOGMtNi41LDMuNC0xMS45LDUuNS0xNi4yLDYuNGMtNC4zLDAuOC05LjYsMi4xLTE2LjIsMy44Yy02LjUsMS43LTEyLjksMi44LTE5LjEsMy40Yy02LjIsMC42LTEyLjgsMC45LTE5LjYsMC45SDEwdjY3My44aDI3NS42YzE0LjcsMCwzMS42LTEuNiw1MC42LTQuN2MxOS0zLjEsMzktNy45LDYwLTE0LjVjMjEtNi41LDM4LjQtMTYuMiw1Mi4zLTI4LjlDNDYyLjQsODE0LjcsNDY5LjQsODAwLjEsNDY5LjQsNzgzLjZ6IE05OTAsODc1LjVWMjAxLjhINzIzLjdjLTYuOCwwLTEzLjMtMC4zLTE5LjYtMC45Yy02LjItMC42LTEyLjYtMS43LTE5LjEtMy40Yy02LjUtMS43LTExLjktMy0xNi4yLTMuOGMtNC4zLTAuOS05LjYtMy0xNi4yLTYuNGMtNi41LTMuNC0xMS4zLTUuNy0xNC41LTYuOGMtMy4xLTEuMS04LjQtNC4xLTE1LjctOC45cy0xMi4xLTcuOS0xNC05LjRjLTItMS40LTcuNC01LjEtMTYuMi0xMS4xYy04LjgtNi0xNC05LjUtMTUuNy0xMC42aC00NS45djY0My4xYzAsMTYuNCw2LjksMzEuMSwyMC44LDQzLjhjMTMuOSwxMi44LDMxLjMsMjIuNCw1Mi4zLDI4LjljMjEsNi41LDQxLDExLjMsNjAsMTQuNXMzNS45LDQuNyw1MC42LDQuN0g5OTB6IiBzdHlsZT0iZmlsbDojQUNBQ0FDIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4gIA==">
                        <img v-if="need_catalog" src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik00NjkuNCw3ODMuNlYxNDAuNWgtNDUuOWMtMS43LDEuMS02LjksNC43LTE1LjcsMTAuNmMtOC44LDYtMTQuMiw5LjYtMTYuMiwxMS4xYy0yLDEuNC02LjcsNC41LTE0LDkuNHMtMTIuNiw3LjgtMTUuNyw4LjljLTMuMSwxLjEtNy45LDMuNC0xNC41LDYuOGMtNi41LDMuNC0xMS45LDUuNS0xNi4yLDYuNGMtNC4zLDAuOC05LjYsMi4xLTE2LjIsMy44Yy02LjUsMS43LTEyLjksMi44LTE5LjEsMy40Yy02LjIsMC42LTEyLjgsMC45LTE5LjYsMC45SDEwdjY3My44aDI3NS42YzE0LjcsMCwzMS42LTEuNiw1MC42LTQuN2MxOS0zLjEsMzktNy45LDYwLTE0LjVjMjEtNi41LDM4LjQtMTYuMiw1Mi4zLTI4LjlDNDYyLjQsODE0LjcsNDY5LjQsODAwLjEsNDY5LjQsNzgzLjZ6IE05OTAsODc1LjVWMjAxLjhINzIzLjdjLTYuOCwwLTEzLjMtMC4zLTE5LjYtMC45Yy02LjItMC42LTEyLjYtMS43LTE5LjEtMy40Yy02LjUtMS43LTExLjktMy0xNi4yLTMuOGMtNC4zLTAuOS05LjYtMy0xNi4yLTYuNGMtNi41LTMuNC0xMS4zLTUuNy0xNC41LTYuOGMtMy4xLTEuMS04LjQtNC4xLTE1LjctOC45cy0xMi4xLTcuOS0xNC05LjRjLTItMS40LTcuNC01LjEtMTYuMi0xMS4xYy04LjgtNi0xNC05LjUtMTUuNy0xMC42aC00NS45djY0My4xYzAsMTYuNCw2LjksMzEuMSwyMC44LDQzLjhjMTMuOSwxMi44LDMxLjMsMjIuNCw1Mi4zLDI4LjljMjEsNi41LDQxLDExLjMsNjAsMTQuNXMzNS45LDQuNyw1MC42LDQuN0g5OTB6IiBzdHlsZT0iZmlsbDojMzM0NzVmIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4gIA==">
                    </p>
                </li>
                <li @click="reading.collected = !reading.collected" class="menu-item menu">
                    <p>
                        <img v-if="!reading.collected" src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik01MDAsMTc1LjVMMjAyLjUsMThsLTcwLDcwTDIyMCw0MDNMMTAsNjMwLjVMNDUsNzE4aDI2Mi41bDE0OC44LDI4MGg4Ny41bDE0OC44LTI4MEg5NTVsMzUtODcuNUw3ODAsNDAzbDg3LjUtMzE1bC03MC03MEw1MDAsMTc1LjV6IiBzdHlsZT0iZmlsbDojQUNBQ0FDIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4gIA==">
                        <img v-if="reading.collected" src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik01MDAsMTc1LjVMMjAyLjUsMThsLTcwLDcwTDIyMCw0MDNMMTAsNjMwLjVMNDUsNzE4aDI2Mi41bDE0OC44LDI4MGg4Ny41bDE0OC44LTI4MEg5NTVsMzUtODcuNUw3ODAsNDAzbDg3LjUtMzE1bC03MC03MEw1MDAsMTc1LjV6IiBzdHlsZT0iZmlsbDojMzM0NzVmIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4gIA==">
                    </p>
                </li>
                <li @click="reading.chapter_index+=1" class="menu-item next">
                    <p>
                        <img src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik01ODcuNSw5OThMOTkwLDUwOEw1ODcuNSwxOEw0MzAsMTU4bDIxMCwyNDVIMTB2MjEwaDYzMEw0MzAsODU4TDU4Ny41LDk5OHoiIHN0eWxlPSJmaWxsOiNBQ0FDQUMiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPiAg">  
                    </p>
                </li>
            </ul>
        </div>

        <div v-if="need_catalog" class="mask"></div>

        <!-- 目录弹窗 -->
        <ul v-if="need_catalog" class="catalog" ref="catalog">
            <!-- <p class="setting-title">目录</p> -->
            <li v-for="(chapter,index) in reading.book_chapters_cache" @click="reading.chapter_index=index,need_catalog = !need_catalog" class="catalog-item" :key="index">
                <p>{{ chapter.title }}</p>
            </li>
        </ul>

        <!-- 章节文本 -->
        <div ref="text" v-if="reading.chapter_text" class="text">
            <p v-html="reading.chapter_text"></p>
        </div>

    </div>
  
  
</template>

<script>
// 通过路由接收书籍ID
// 检查缓存 -> 有则直接加载缓存，没有缓存进入下一步
// 书籍ID -> 默认书源
// 请求目录，请求第一章
// 阅读器加载完成

import Config from '../config';
import axios from 'axios';

export default {
    name: 'Reader_new',
    components:{

    },
    data: function () {
        return {
            reading:{
                book_id: false,
                book_source_id: false,
                book_source_cache: false,
                book_chapters_cache: false,
                chapter_index: 0,
                chapter_text: false,
                collected:false
            },
            cache:false,
            need_catalog:false,
        }
    },
 
    mounted: function () {
        // 第一步: 载入缓存
        // 缓存的值为字符串或未定义
        // 如果未定义，为缓存赋值为一个空的对象
        if (!localStorage[Config.Cache.name]){
            localStorage[Config.Cache.name] = JSON.stringify({
                'books':{},
                'setting':{},
            });
        }
        // 获取非空缓存,加载到当前组件
        this.cache = JSON.parse(localStorage[Config.Cache.name]);

        // 校验
        if(this.cache){
           console.log('阅读器成功加载浏览器缓存'); 
        }

        // 第二步: 加载书籍
        // 获取通过路由传入的书籍ID
        this.reading.book_id = this.$route.query.book_id;

        // 检查该书籍缓存是否存在
        // 结果为的值为字符串或未定义
        if(this.cache.books[this.reading.book_id]){
            console.log('查找到本地缓存');
            // 接下来读取缓存中的书源和阅读进度索引
            let cache = this.cache.books[this.reading.book_id];
            this.reading.collected = true;
            this.reading.book_id = cache.book_id;
            this.reading.book_source_id = cache.book_source_id;
            this.reading.chapter_index = cache.chapter_index;
            // 请求默认源数据
            let post_data =  JSON.stringify({
                'url':'http://api.zhuishushenqi.com/mix-toc/' + this.reading.book_id
            });
            // 加载默认书源
            this.load_mix_toc(post_data);

        }else{
            console.log('没找到该书的本地缓存');
            // 请求默认源数据
            let post_data =  JSON.stringify({
                'url':'http://api.zhuishushenqi.com/mix-toc/' + this.reading.book_id
            });
            // 加载默认书源
            this.load_mix_toc(post_data);
        }
  
    },
    watch: {
        // 监听目录缓存
        'reading.book_chapters_cache':function(){
            console.log('目录变化，即将加载需要的章节');
            this.load_chapter();
        },
        // 监听索引
        'reading.chapter_index':function(){
            console.log('索引变化，即将加载需要的章节');
            if (this.reading.chapter_index < 0){
                this.reading.chapter_index = 0;
                alert('第一章了喔！');
            }else if (this.reading.chapter_index >= this.reading.book_chapters_cache.length){
                this.reading.chapter_index = this.reading.chapter_index-1;
                alert('最后一章了喔！');
            }
            // 如果目录缓存存在，按照链接加载章节
            if (this.reading.book_chapters_cache){
                // 加载章节内容
                this.load_chapter();
            } 
        },
        // 监听收藏按钮
        'reading.collected':function(){
            // 如果开启收藏
            if(this.reading.collected){
                this.update_cache();
            }
            // 如果取消收藏
            else{
                delete this.cache.books[this.reading.book_id];
                localStorage[Config.Cache.name] = JSON.stringify(this.cache);
            }
        },
        // 监听目录出现
        'need_catalog':function(){
            // 使目录滚动条位置跟随阅读进度
            this.$nextTick(function () {
                if(this.$refs.catalog){
                    this.$refs.catalog.scrollTop = this.$refs.catalog.scrollHeight*(this.reading.chapter_index/(this.reading.book_chapters_cache.length));
                }
                
            })
            
        }
    },
    methods: {
   
        // 加载默认书源
        load_mix_toc:function(post_data){
            axios({
                method: 'post',
                url: Config.PROX_GATE,
                data: post_data,
                responseType: 'json',
                })
                .then(response => {
                    console.log('默认源返回了数据','状态为 '+response.data.ok);
                    if (response.data.ok){
                        this.reading.book_chapters_cache = response.data.mixToc.chapters;

                    }else{
                        console.log('请求默认源失败');
                        // 失败后的逻辑
                    }
                })
        },

        load_chapter: function () {
            let post_data = JSON.stringify({
                'url':'http://chapter2.zhuishushenqi.com/chapter/'+escape(this.reading.book_chapters_cache[this.reading.chapter_index].link)
            });
            // 设置标题为章节名
            document.title = this.reading.book_chapters_cache[this.reading.chapter_index].title;
            axios({
                method: 'post',
                url: Config.PROX_GATE,
                data: post_data,
                responseType: 'json',
                })
                .then(response => {
                    console.log('章节返回了数据','状态为 '+response.data.ok);
                    if (response.data.ok){
                        // 获取原始章节文字
                        let raw_text = response.data.chapter.body;
                        // 处理文章，提高阅读体验
                        this.reading.chapter_text = '<p>'+raw_text.replace(/\n\n/g, '\n').replace(/\n/g, '</p><p>').replace(/\s/g, '')+'</p>';
                        
                        // 重置滚动条
                        if (this.$refs.text){
                            this.$refs.text.scrollTop = 0;
                        }
                        // 当书籍被设置为已收藏，更新缓存
                        if(this.reading.collected){
                            
                            this.update_cache();
                            console.log('缓存已刷新');
                        }
                    }else{
                        console.log('请求失败');
                        // 失败后的逻辑
                    }
                })
            
                    
        },
        // 更新缓存
        update_cache:function(){
            // 通过书籍ID为缓存赋值
            this.cache.books[this.reading.book_id] = {
                book_id: this.reading.book_id,
                book_source_id: this.reading.book_source_id,
                chapter_index: this.reading.chapter_index,
            };

            localStorage[Config.Cache.name] = JSON.stringify(this.cache);
        },
        show_catalog:function(){
            
        }
        
    }

       
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.full-center {
    padding: 0;
    margin: 0;
}
.center-wait {
    padding: 0;
    margin: 0;
    width: 30px;
    height: 30px;
    background-image: url('https://cdn.imhcg.cn/html/icon/wait.gif');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.text {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 25px;

    overflow-y: auto;
    -webkit-overflow-scrolling : touch;
    padding: .5rem;

    z-index: 1;

    background-color: rgba(250, 235, 215, 0.616);
    
}

.text p {
    text-indent: 2rem;
    line-height: 2rem;
    word-wrap: break-word;
    font-family: Microsoft YaHei;
    font-size: 1.2rem;
}


.msg {
    z-index: 1;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 25px;

    background-color: rgba(250, 235, 215, 0.616);

}
.msg-text {
    font-size: 10px;
    color: rgb(82, 82, 82);
    text-align: center;
    line-height: 25px;
    overflow-x: auto;
}

.menu {
    display: flex;
    justify-content: space-between;

    position: absolute;
    bottom: 0;

    width: 100%;
    height: 100%;
    

    z-index: 2;
}

.menu-item {
    position: relative;
    width: 25%;
    z-index: 2;
    cursor: pointer;
}
.menu-item p{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
}

.menu-item p img{
    width: 15px;
    height: 15px;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 25px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
}

.catalog {
    position: fixed;
    top: 50px;
    left: 25px;
    right: 25px;
    bottom: 50px;
    z-index: 3;
    padding: 1rem;
    border-radius: 5px;
    overflow-y: auto;
    background-color: rgb(250, 235, 215);
}

.catalog-item {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding-bottom: .5rem;
    border-bottom: 1px solid #fff;
    cursor: pointer;
}



</style>
