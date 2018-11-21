<template>
  
  <div id="mybook">
    <HeaderWithSearch></HeaderWithSearch>
    <FuncSwich active="mybook"></FuncSwich>
    <!-- 有本地缓存 -->
    <div class="full" v-if="localBook">
        <ul class="books" >
            <li class="book" v-for="book in Books" :key="book._id">

                <span class="cover">
                    <img v-bind:src="Config.API.Statics + book.cover">
                </span>

                <ul class="infos">
                    <li>
                        <router-link class="title" :to="{ path:'/reader', query: { book_id: book['_id']}}">
                            {{book.title}}
                        </router-link>
                    </li>
                    <li class="author">
                        {{book.author}}</li>
                    <li class="normalText">
                        {{book.lastChapter}}</li>
                </ul>

            </li>
        </ul>
    </div>
    

    <!-- 无本地缓存 -->
    <div class="full" v-if="!localBook">
        <div class="table">
            <span class="add">
                <router-link class="add_icon" to="/finding"><img class="add_a_book_icon" src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnPjxwYXRoIGQ9Ik01MDAsMTBjLTUwLjcsMC05MS44LDQxLjItOTEuOCw5MS45djMwNi4zSDEwMS45QzUxLjEsNDA4LjEsMTAsNDQ5LjMsMTAsNTAwczQxLjEsOTEuOSw5MS45LDkxLjloMzA2LjN2MzA2LjNjMCw1MC43LDQxLjEsOTEuOCw5MS44LDkxLjhjNTAuOCwwLDkxLjktNDEuMSw5MS45LTkxLjhWNTkxLjloMzA2LjNjNTAuNywwLDkxLjktNDEuMSw5MS45LTkxLjljMC01MC43LTQxLjEtOTEuOS05MS45LTkxLjlINTkxLjlWMTAxLjlDNTkxLjksNTEuMiw1NTAuOCwxMCw1MDAsMTB6IiBzdHlsZT0iZmlsbDojZWI0ZjM4Ij48L3BhdGg+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvZz48L3N2Zz4gIA=="></router-link>
                <br>
                <router-link class="add_text" to="/finding">添加书籍</router-link>
            </span>
        </div>
        
    </div>

  </div>

</template>

<script>
import HeaderWithSearch from './HeaderWithSearch'
import FuncSwich from './FuncSwich'
import Config from '../config'
export default {
    name: 'MyBook',
    components:{
      HeaderWithSearch,
      FuncSwich
    },
    data: function () {
        return {
            Books: [],
            Config: Config,
            localBook: localStorage.mybooks,
        }
    },
    beforeMount: function () {
        if (localStorage.mybooks){
            let id_list = Object.keys(JSON.parse(localStorage.mybooks));
            id_list.sort();
            id_list.forEach(id => {
                fetch(Config.PROX_GATE, {
                        method: "POST",
                        body: JSON.stringify({
                            'url': 'http://api.zhuishushenqi.com/book/' + id
                        }),
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.Books.push(res);
                    })
            })
        }
    }
}
</script>

<style scoped>

.full {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
}


.book {
    position: relative;
    padding: .5em;
    padding-bottom: 0;
    width: calc(100% - 1rem);
}

.cover img {
    width: 4em;
    height: auto;
}

.infos {
    position: absolute;
    top: .5em;
    left: 5em;

}

.title {
    font-size: 1rem;
    font-weight: bold;
    color: #b93221;
    cursor: pointer;
    
}
.author {
    font-size: .9rem;
    font-weight: lighter;
    color: #b93221;
    margin-top: .2em;
}
.normalText {
    font-size: .9rem;
    font-weight: lighter;
    margin-top: .2em;
}

.table {
    display: table;
    width: 100%;
    height: 100%;
}
.add {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.add_icon img{
    width: 21px;
    height: 21px;
}
.add_text {
    color: #121212;
    font-size: .9em;
    font-weight: lighter;
}
</style>
