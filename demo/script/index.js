console.log('开始执行 index.js');
// 代理网关
PROX_GATE = 'https://api.imhcg.cn/api/v1/proxy'

/////////////////////////////////////
//   组件
// 附带搜索的头部
const SearchHead = {
    template: '#template-search-header',
    data: function () {
        return {
            show_search_input: false,
        }
    },
    methods: {
        swich_icon_input: function () {
            this.show_search_input = !this.show_search_input;
            if (this.show_search_input) {
                this.$nextTick(
                    function () {
                        document.querySelector('#search-header-input').focus();
                    }
                )
            }
        },
        redirect_to_search: function (e) {
            let key_word = e.target.value;
            let redirect_url = '/search/?key_word=' + key_word;
            this.$router.push(redirect_url);
            console.log('重定向到 ' + redirect_url)
        }
    }
}

// 附带返回的头部
const BackHead = {
    props: ['msg'],
    template: '#template-back-header',
    methods: {
        go_back: function () {
            window.history.back();
        }
    }
}

// 功能页切换器
const FuncSwich = {
    props: ['active'],
    template: '#template-func-swich',
    beforeMount: function () {
        this.$nextTick(
            function () {
                let active_item_id = 'func-swich-' + this.active;
                console.log('活跃标签切换到 ' + active_item_id);
                document.querySelector('#' + active_item_id).setAttribute('class', 'func-swich-item-active');
            }
        )
    }
}

// 书架
const MyBook = {
    components: {
        'search-head': SearchHead,
        'func-swich': FuncSwich
    },
    template: `#template-mybook`,
    data: function () {
        return {
            Book_data: [],
        }
    },
    beforeMount: function () {
        let id_list = Object.keys(JSON.parse(localStorage.mybooks));
        id_list.forEach(id => {
            fetch(PROX_GATE, {
                method: "POST",
                body: JSON.stringify({
                    'url': 'http://api.zhuishushenqi.com/book/'+id
                }),
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.Book_data.push(res);
            })
            
        })
    }
}

// 发现
const Finding = {
    components: {
        'search-head': SearchHead,
        'func-swich': FuncSwich
    },
    template: '#template-finding'
}

// 分类
const Sort = {
    template: '#template-sort',
    components: {
        'back-head': BackHead,
    },
    data: function () {
        return {
            Sort_data: '',
        }
    },
    beforeMount: function () {
        fetch(PROX_GATE, {
                method: "POST",
                body: JSON.stringify({
                    'url': 'http://api.zhuishushenqi.com/cats/lv2/statistics'
                }),
            })
            .then(res => res.json())
            .then(res => {
                this.Sort_data = res
            })
    }
}
// 排行
const Ranking = {
    components: {
        'back-head': BackHead,
    },
    template: '#template-ranking',
    data: function () {
        return {
            Ranking_data: '',
        }
    },
    beforeMount: function () {
        fetch(PROX_GATE, {
                method: "POST",
                body: JSON.stringify({
                    'url': 'http://api.zhuishushenqi.com/ranking/gender'
                }),
            })
            .then(res => res.json())
            .then(res => {
                this.Ranking_data = res
            })
    }
}
// 搜索
const Search = {
    components: {
        'back-head': BackHead,
    },
    template: '#template-search',
    data: function () {
        return {
            Search_data: '',
            key_word: '',
        }
    },
    beforeMount: function () {
        this.key_word = this.$route.query.key_word;
        console.log('开始搜索关键词：' + this.key_word);
        fetch(PROX_GATE, {
                method: "POST",
                body: JSON.stringify({
                    'url': 'http://api.zhuishushenqi.com/book/fuzzy-search?query=' + this.key_word
                }),
            })
            .then(res => res.json())
            .then(res => {
                this.Search_data = res
            })
    }
}
// 加载书籍列表，包括分类和排行
const BookList = {
    template: '#template-book-list',
    components: {
        'back-head': BackHead,
    },
    data: function () {
        return {
            gender: '',
            major: '',
            Major_data: '',
            major_start: 0,
            Ranking_data: '',
            ranking_id: '',
            msg: '',
        }
    },
    beforeMount: function () {
        let action = this.$route.query.action;
        // 加载分类书单
        if (action === 'sort-major') {

            this.gender = this.$route.query.gender;
            this.major = this.$route.query.major;
            this.get_major_sort();
            this.msg = this.$route.query.msg;
            console.log('加载分类' + this.major)
        }
        // 加载排行书单
        else if (action === 'ranking') {
            console.log('加载排行榜')
            this.ranking_id = this.$route.query._id;
            this.get_ranking();
            this.msg = this.$route.query.msg;
        }
    },
    methods: {
        get_major_sort: function () {
            fetch(PROX_GATE, {
                    method: "POST",
                    body: JSON.stringify({
                        'url': 'https://api.zhuishushenqi.com/book/by-categories?gender=' + this.gender + '&type=hot&major=' + this.major + '&minor=&start=' + this.major_start + '&limit=10'
                    }),
                })
                .then(res => res.json())
                .then(res => {
                    this.Major_data = res
                })
        },
        get_ranking: function () {
            fetch(PROX_GATE, {
                    method: "POST",
                    body: JSON.stringify({
                        'url': 'http://api.zhuishushenqi.com/ranking/' + this.ranking_id
                    }),
                })
                .then(res => res.json())
                .then(res => {
                    this.Ranking_data = res
                })
        },
        load_next_page: function () {
            console.log('加载更多');
            this.major_start += 1;
            this.get_major_sort();
            // 数据刷新后返回顶部
            document.body.scrollTop = 0;
        }
    }
}
// 书籍页
const Book = {
    template: '#template-book',
    components: {
        'back-head': BackHead,
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
            console.log('检测到章节数据变动');
            // 尝试读取index
            if (!this.now_index) {
                this.now_index = 0;
                this.load_chapter();
            } else {
                this.load_chapter();
            }
        },
        now_index: function () {
            console.log('检测到索引变动')
            // 更新收藏状态
            this.is_collecting = !!((JSON.parse(localStorage.mybooks))[this.book_id]);
            // 如果已经缓存了章节，直接跳转，否则不执行
            if (this.chapters) {
                this.load_chapter();
                if (this.is_collecting) {
                    this.put_to_mybook();
                }
            }
        },
    },
    beforeMount: function () {
        this.book_id = this.$route.query.book_id;
        console.log('初始化阅读组件，书籍 id 为 ', this.book_id);
        // 检查是否有收藏记录
        if (!!((JSON.parse(localStorage.mybooks))[this.book_id])) {
            console.log('读取记录');
            let book_info = JSON.parse((JSON.parse(localStorage.mybooks))[this.book_id])
            console.log(book_info);
            this.book_id = book_info.book_id;
            this.book_source_id = book_info.book_source_id;
            this.now_index = book_info.now_index;
        }
        // 判断书源，返回选择器或者直接加载章节
        if (!this.book_source_id) {
            this.get_book_source();
            this.msg = '书源选择'
        } else {
            this.get_chapters();
        }
    },
    methods: {
        get_book_source: function () {
            console.log('正在获取书源');
            fetch(PROX_GATE, {
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
            console.log('书源已确认，即将加载章节数据');
            let source_id = e.target.getAttribute('source_id');
            if (source_id) {
                this.book_source_id = source_id;
                this.get_chapters();
            }
        },
        get_chapters: function () {
            console.log('正在获取书籍所有章节');
            fetch(PROX_GATE, {
                    method: "POST",
                    body: JSON.stringify({
                        'url': 'https://api.zhuishushenqi.com/atoc/' + this.book_source_id + '?view=chapters'
                    }),
                })
                .then(res => res.json())
                .then(res => {
                    this.chapters = res
                })
        },
        load_chapter: function () {
            console.log('正在根据索引加载当前章节');
            this.chapter_link = this.chapters['chapters'][this.now_index]['link'];
            this.chapter_title = this.chapters['chapters'][this.now_index]['title'];
            this.msg = this.chapter_title;
            fetch(PROX_GATE, {
                    method: "POST",
                    body: JSON.stringify({
                        'url': 'https://chapterup.zhuishushenqi.com/chapter/' + this.chapter_link
                    }),
                })
                .then(res => res.json())
                .then(res => {
                    this.now_chapter_content = res;
                    if (res.ok) {
                        this.chapter_status = true;
                        this.is_vip = this.now_chapter_content.chapter.hasOwnProperty('cpContent');
                        if (this.is_vip) {
                            this.now_chapter_content.chapter.cpContent = (this.now_chapter_content.chapter.cpContent).replace(/\n\n/g, '\n').replace(/\n/g, '<br/><br/>').replace(/\s/g, '');
                        } else {
                            this.now_chapter_content.chapter.body = (this.now_chapter_content.chapter.body).replace(/\n\n/g, '\n').replace(/\n/g, '<br/><br/>').replace(/\s/g, '');
                        }
                        // 初始化滚动条
                        if (document.querySelector('#book-read-area')) {
                            document.querySelector('#book-read-area').scrollTop = 0;
                        }

                    } else {
                        this.chapter_status = false;
                        console.log('读取章节内容出错，具体原因为：' + this.now_chapter_content.message);
                        alert('当前源好像坏了，\n建议换源再试。');
                    }
                })
        },
        show_chapter_list_func: function () {
            console.log('切换目录/正文');
            this.show_chapter_list = !this.show_chapter_list;
            if (this.show_chapter_list) {
                document.querySelector('#book-area').scrollTop = 0;
            }
        },
        set_index: function (e) {
            console.log('检测到目录操作，正在设置索引');
            let index = e.target.getAttribute('chapter_index');
            if (index) {
                this.now_index = index;
                this.show_chapter_list = !this.show_chapter_list;
            }
        },
        add_index: function () {
            // 有些时候会被当做字符串
            this.now_index = parseFloat(this.now_index) + 1;
        },
        full_screen: function () {
            console.log('全屏操作');
            let isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            var el = document.querySelector('#app');
            if (!isFullscreen) { //进入全屏,多重短路表达式
                this.isFullscreen = true;
                el.style.top = '0px';
                el.style.bottom = '0px';
                el.style.zIndex = '2';
                fullScreen();
            } else { //退出全屏,三目运算符
                this.isFullscreen = false;
                el.style.top = '50px';
                el.style.bottom = '50px';
                el.style.zIndex = '1';
                fullExit();
            }

            //全屏  
            function fullScreen() {
                var element = document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");  
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
            function fullExit() {
                var element = document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");   
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
                console.log('取消收藏');
                this.is_collecting = false;
                let mybooks = JSON.parse(localStorage.mybooks);
                delete mybooks[this.book_id];
                localStorage.mybooks = JSON.stringify(mybooks);
            } else {
                // 开始收集信息
                let book_info = {
                    book_id: this.book_id,
                    book_source_id: this.book_source_id,
                    now_index: this.now_index,
                }
                save_book_to_localstorage(book_info)
                // 
                function save_book_to_localstorage(book_info) {
                    var mybooks = localStorage.mybooks;
                    if (mybooks) {
                        mybooks = JSON.parse(localStorage.mybooks);
                        save(book_info);
                        console.log('更新收藏信息成功，书籍 id 为 ' + book_info.book_id);
                    } else {
                        mybooks = {};
                        save(book_info);
                        console.log('收藏成功，书籍 id 为 ' + book_info.book_id);
                    }

                    function save(book_info) {
                        mybooks[book_info.book_id] = JSON.stringify(book_info);
                        localStorage.mybooks = JSON.stringify(mybooks);
                    }
                }
                this.is_collecting = true;
            }

        }
    }
}

/////////////////////////////////////
//   路由
// 生成路径
const routes = [{
        path: '/',
        component: MyBook
    },
    {
        path: '/finding',
        component: Finding
    },
    {
        path: '/sort',
        component: Sort
    },
    {
        path: '/ranking',
        component: Ranking
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/book-list',
        component: BookList
    },
    {
        path: '/book',
        component: Book
    },
]

// 通过路径生成路由
const router = new VueRouter({
    routes: routes
})


/////////////////////////////////////
//   实例
//   生成实例
var app = new Vue({
    el: '#app',
    router: router,
})