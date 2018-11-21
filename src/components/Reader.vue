<template>

        
    <div id="book">
        <HeaderWithBack :msg="msg"></HeaderWithBack>
        <div id="read-background"></div>
        <div id="book-area">
            <div v-if="!book_source_id" id="book-source-selector">
                <ul id="book-source-items">
                    <li class="book-source-item" v-for="source in book_source_ajax" :key="source['_id']">
                        <div class="book-source-item-content">
                            <p>来自：{{source['source']}}</p>
                            <p>最新：{{source['lastChapter']}}</p>
                        </div>
                        <div @click="ensure_book_source" v-bind:source_id="source['_id']" class="book-source-select-button">选定</div>
                    </li>
                </ul>
            </div>

            <div v-if="book_source_id && !chapters" id="book-source-selector">
                <div id="full">
                    <p id="info_waiting"></p>
                </div>
            </div>

            <div v-if="now_chapter_content['ok'] && !show_chapter_list" id="book-read-area">
                <p class="book-text" v-if="is_vip" v-html="now_chapter_content['chapter']['cpContent']"></p>
                <p class="book-text" v-if="!is_vip" v-html="now_chapter_content['chapter']['body']"></p>
            </div>

            <div v-if="show_chapter_list" id="book-chapter-selector">
                <ul id="book-chapter-items">
                    <li class="book-chapter-item" v-for="(chapter,index) in chapters['chapters']" :key="index">
                        <p @click="set_index" v-bind:chapter_index="index">{{chapter['title']}}</p>
                    </li>
                </ul>
            </div>

            <div v-if="now_chapter_content['ok'] && show_control_bar" id="book-read-cotrol">
                <ul id="book-read-cotrol-bar">
                    <li @click="show_chapter_list_func" class="book-read-cotrol-bar-item">
                        {{show_chapter_list?'正文':'目录'}}
                    </li>
                    <li @click="full_screen" class="book-read-cotrol-bar-item">
                        {{isFullscreen?'退出全屏':'全屏'}}
                    </li>
                    <li @click="put_to_mybook" class="book-read-cotrol-bar-item">
                        {{is_collecting?'已收藏':'收藏'}}
                    </li>
                    <li @click="add_index" class="book-read-cotrol-bar-item">
                        下一章
                    </li>
                </ul>
            </div>
        </div>

    </div>        
  
  
</template>

<script>
import HeaderWithBack from './HeaderWithBack'
import Config from '../config'

export default {
    name: 'Reader',
    components:{
      HeaderWithBack,
    },
    data: function () {
        return {
            book_id: '',
            book_source_ajax: '',
            book_source_id: '',
            chapters: '',
            now_index: '',
            msg: '',
            chapter_link: '',
            chapter_title: '',
            now_chapter_content: '',
            is_vip: '',
            chapter_status: '',
            show_chapter_list: false,
            show_control_bar: true,
            isFullscreen: false,
            is_collecting: false,
        }
    },
    watch: {
        chapters: function () {
            // 尝试读取index
            if (!this.now_index) {
                this.now_index = 0;
                this.load_chapter();
            } else {
                this.load_chapter();
            }
        },
        now_index: function () {
            // 如果收藏容器存在
            if (!!(localStorage.mybooks)) {
                // 更新收藏状态
                if (!!((JSON.parse(localStorage.mybooks))[this.book_id])) {
                    this.is_collecting = true;
                }

                if (this.is_collecting) {
                    this.save_book_to_localstorage();
                }
            }
            // 如果已经缓存了章节，直接跳转，否则不执行
            if (this.chapters) {
                this.load_chapter();
            }
        },
    },
    beforeMount: function () {
        this.book_id = this.$route.query.book_id;
        // 检查收藏容器是否存在
        if (!!(localStorage.mybooks)) {
            // 检查是否有收藏记录
            if (!!((JSON.parse(localStorage.mybooks))[this.book_id])) {
                let book_info = JSON.parse((JSON.parse(localStorage.mybooks))[this.book_id])
                this.book_id = book_info.book_id;
                this.book_source_id = book_info.book_source_id;
                this.now_index = book_info.now_index;
            }
        }

        // 判断书源，返回选择器或者直接加载章节
        if (!this.book_source_id) {
            this.get_book_source();
            this.msg = '书源选择';
        } else {
            this.get_chapters();
        }
    },
    methods: {
        get_book_source: function () {
            fetch(Config.PROX_GATE, {
                    method: "POST",
                    body: JSON.stringify({
                        'url': 'http://api.zhuishushenqi.com/atoc?view=summary&book=' + this.book_id
                    }),
                })
                .then(res => res.json())
                .then(res => {
                    this.book_source_ajax = res
                })
        },
        ensure_book_source: function (e) {
            let source_id = e.target.getAttribute('source_id');
            if (source_id) {
                this.book_source_id = source_id;
                this.get_chapters();
            }
        },
        get_chapters: function () {
            fetch(Config.PROX_GATE, {
                    method: "POST",
                    body: JSON.stringify({
                        'url': 'http://api.zhuishushenqi.com/atoc/' + this.book_source_id + '?view=chapters'
                    }),
                })
                .then(res => res.json())
                .then(res => {
                    this.chapters = res
                })
        },
        load_chapter: function () {
            this.chapter_link = this.chapters['chapters'][this.now_index]['link'];
            this.chapter_title = this.chapters['chapters'][this.now_index]['title'];
            this.msg = this.chapter_title;
            fetch(Config.PROX_GATE, {
                    method: "POST",
                    body: JSON.stringify({
                        'url': 'http://chapter2.zhuishushenqi.com/chapter/' + encodeURIComponent(this.chapter_link)
                    }),
                })
                .then(res => res.json())
                .then(res => {
                    this.now_chapter_content = res;
                    if (res.ok) {
                        this.chapter_status = true;
                        this.is_vip = this.now_chapter_content.chapter.hasOwnProperty('cpContent');
                        if (this.is_vip) {
                            this.now_chapter_content.chapter.cpContent = (this.now_chapter_content.chapter.cpContent).replace(/\n\n/g, '\n').replace(/\n/g, '</p><p>').replace(/\s/g, '');
                        } else {
                            this.now_chapter_content.chapter.body = (this.now_chapter_content.chapter.body).replace(/\n\n/g, '\n').replace(/\n/g, '</p><p>').replace(/\s/g, '');
                        }
                        // 初始化滚动条
                        if (document.querySelector('#book-read-area')) {
                            document.querySelector('#book-read-area').scrollTop = 0;
                        }

                    } else {
                        this.chapter_status = false;
                        alert('源好坏了，\n建议换源再试。');
                    }
                })
        },
        show_chapter_list_func: function () {
            this.show_chapter_list = !this.show_chapter_list;
            // 重置阅读区进度条
            if (!this.show_chapter_list) {
                this.$nextTick(
                    function () {
                        var readbox = document.querySelector('#book-read-area');
                        // 根据阅读进度控制目录进度条
                        if (readbox) {
                            readbox.scrollTop = 0;
                        }
                    }
                )
            }
            // 根据阅读进度控制目录进度条
            if (this.show_chapter_list) {
                this.$nextTick(
                    function () {
                        var chapterbox = document.querySelector('#book-chapter-selector');
                        if (chapterbox && this.show_chapter_list) {
                            chapterbox.scrollTop = document.querySelector('#book-chapter-selector').scrollHeight * this.now_index / this.chapters.chapters.length;
                        }
                    }
                )
            }
        },
        set_index: function (e) {
            let index = e.target.getAttribute('chapter_index');
            if (index) {
                this.now_index = index;
                this.show_chapter_list = !this.show_chapter_list;
            }
        },
        add_index: function () {
            // 判断是不是最后了
            if (this.now_index < (this.chapters.chapters.length - 1)) {
                this.now_index = parseFloat(this.now_index) + 1;
            } else {
                alert('已经是最后一章了。');
            }
        },
        full_screen: function () {
            let isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            var el = document.querySelector('#app');
            if (!isFullscreen) { //进入全屏,多重短路表达式
                this.isFullscreen = true;
                el.style.top = '0px';
                el.style.bottom = '0px';
                el.style.zIndex = '2';
                fullScreen(el);
            } else { //退出全屏,三目运算符
                this.isFullscreen = false;
                el.style.top = '50px';
                el.style.bottom = '50px';
                el.style.zIndex = '1';
                fullExit(el);
            }

            //全屏  
            function fullScreen(element) {
                //IE 10及以下ActiveXObject  
                if (window.ActiveXObject) {
                    var WsShell = new ActiveXObject('WScript.Shell')
                    WsShell.SendKeys('{F11}');
                }
                // Webkit (works in Safari5.1 and Chrome 15)  
                else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                }
                //HTML W3C 提议  
                else if (element.requestFullScreen) {
                    element.requestFullScreen();
                }
                //IE11  
                else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }

                // Firefox (works in nightly)  
                else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                }
            }

            //退出全屏  
            function fullExit(element) {
                // var element = document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");   
                //IE ActiveXObject  
                if (window.ActiveXObject) {
                    var WsShell = new ActiveXObject('WScript.Shell')
                    WsShell.SendKeys('{F11}');
                }
                // Webkit (works in Safari5.1 and Chrome 15)  
                else if (element.webkitRequestFullScreen) {
                    document.webkitCancelFullScreen();
                }
                //HTML5 W3C 提议  
                else if (element.requestFullScreen) {
                    document.exitFullscreen();
                }
                //IE 11  
                else if (element.msRequestFullscreen) {
                    document.msExitFullscreen();
                }

                // Firefox (works in nightly)  
                else if (element.mozRequestFullScreen) {
                    document.mozCancelFullScreen();
                }
            }
        },
        put_to_mybook: function () {
            // 判断收藏状态，若已收藏，执行取消收藏操作，反之则反之
            if (this.is_collecting) {
                this.is_collecting = false;
                let mybooks = JSON.parse(localStorage.mybooks);
                delete mybooks[this.book_id];
                localStorage.mybooks = JSON.stringify(mybooks);
            } else {
                // 保存记录
                this.save_book_to_localstorage();
                this.is_collecting = true;
            }
        },
        save_book_to_localstorage: function () {
            // 开始收集信息
            let book_info = {
                book_id: this.book_id,
                book_source_id: this.book_source_id,
                now_index: this.now_index,
            }
            var mybooks = localStorage.mybooks;
            if (mybooks) {
                mybooks = JSON.parse(localStorage.mybooks);
                save(book_info);
            } else {
                mybooks = {};
                save(book_info);
            }
            function save(book_info) {
                mybooks[book_info.book_id] = JSON.stringify(book_info);
                localStorage.mybooks = JSON.stringify(mybooks);
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#book-read-area {
    position: fixed;
    overflow-y: scroll;
    top: 50px;
    bottom: 50px;
    width: 100%;
    background-color: antiquewhite;
    
}
.book-text{
    text-indent: 2em;
    line-height: 2rem;
    word-wrap: break-word;
    font-family: Microsoft YaHei;
    font-size: 1.2rem;
    /* line-height: 100%; */
    margin: 0;
    padding: .5rem;
}
.book-text p{
    line-height:2rem;
}
#book-source-selector {
    margin: 0 auto;
    padding: .5rem;
    width: calc(100% - 1rem);
    position: fixed;
    overflow-y: scroll;
    top: 50px;
    bottom: 0px;
}

.book-source-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem;
    border-bottom: 1px solid #d5847a;
}

.book-source-item-content {
    font-size: 1rem;
    font-weight: lighter;
    color: #323232;
}

.book-source-select-button {
    border: 1px solid #b93221;
    padding: .5rem;
    border-radius: 1rem;
    color: #b93221;
    min-width: 2rem;
    margin-left: .5rem;
    cursor: pointer;
}

#book-chapter-selector {
    margin: 0 auto;
    padding: .5rem;
    width: calc(100% - 1rem);
    position: fixed;
    overflow-y: scroll;
    top: 50px;
    bottom: 50px;
    background-color: antiquewhite;
}

.book-chapter-item {
    padding: .5rem 0;
    border-bottom: 1px solid #d5847a;
    font-size: 1rem;
    font-weight: lighter;
    cursor: pointer;
}

#book-read-cotrol {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #b93221;
    color: #FFFFFD;
}

#book-read-cotrol-bar {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-around;
}

.book-read-cotrol-bar-item {
    cursor: pointer;
}

#full {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

#info_waiting {
    padding: 0;
    margin: 0;
    width: 30px;
    height: 30px;
    background-image: url('https://i.loli.net/2018/11/06/5be17e54b2acc.gif');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
