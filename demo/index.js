parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"Focm":[function(require,module,exports) {
var o=new Vue({el:"#app",data:{show:{index:!0,ajax:!1,searchIcon:!0,searchInput:!1,swichMybook:!0,swichFind:!0,activeMybook:!0,activeFind:!1,nobook:!0,myBookList:!1,find:!1,renderCatalog:!1,renderList:!1,renderBook:!1,BookSource:!1},ajax:{titleText:"标题",catalogData:"",nextSortUrl:"",bookListData:"",nowAtBookId:"",bookSource:{test:"001"}}},methods:{show_ajax:function(){o.show.index=!1,o.show.ajax=!0},show_ajaxrenderCatalog:function(){o.show_ajax(),o.show.renderCatalog=!0,o.show.renderList=!1,o.show.renderBook=!1},show_ajaxrenderList:function(){console.log("渲染列表"),o.show_ajax(),o.show.renderCatalog=!1,o.show.renderList=!0,o.show.renderBook=!1},show_ajaxrenderBook:function(){console.log("渲染书籍"),o.show_ajax(),o.show.renderCatalog=!1,o.show.renderList=!1,o.show.renderBook=!0},show_ajaxBookSource:function(){console.log("渲染书籍"),o.show.BookSource=!0},show_index:function(){o.show.index=!0,o.show.ajax=!1},show_indexMybook:function(){o.show_index(),o.show.searchIcon=!0,o.show.searchInput=!1,o.show.swichMybook=!0,o.show.swichFind=!0,o.show.activeMybook=!0,o.show.activeFind=!1,o.show.nobook=!0,o.show.myBookList=!1,o.show.find=!1},show_indexFind:function(){o.show_index(),o.show.searchIcon=!0,o.show.searchInput=!1,o.show.swichMybook=!0,o.show.swichFind=!0,o.show.activeMybook=!1,o.show.activeFind=!0,o.show.nobook=!1,o.show.myBookList=!1,o.show.find=!0},show_searchInput:function(){var t=this;console.log("显示搜索框"),o.show.searchIcon=!1,o.show.searchInput=!0,this.$nextTick(function(){t.$refs.searchInput.focus()})},submitSearchInput:function(o){console.log("在搜索框按下回车");var t=o.target.value;console.log(t)},renderCatalog:function(t){var a=this;console.log("渲染标签");var e=t.target.getAttribute("data-func"),n=t.target.innerHTML;console.log(e),o.show_ajaxrenderCatalog(),o.ajax.titleText=n;var s="";s="rank"===e?"https://api.imhcg.cn/api/v1/zssq/ranking/gender":"https://api.imhcg.cn/api/v1/zssq/catalog",this.$nextTick(function(){fetch(s).then(function(o){return o.json()}).then(function(o){a.ajax.catalogData=o})})},renderBookList:function(t){var a=this;console.log("渲染书籍列表");var e=t.target.getAttribute("type"),n=t.target.innerHTML;o.ajax.titleText=n,console.log(e,n);var s="";if("rank"===e)s="https://api.imhcg.cn/api/v1/zssq/ranking/"+t.target.getAttribute("data-id");else{var r=t.target.getAttribute("gender"),i=t.target.getAttribute("data-Major"),c=t.target.getAttribute("data-Minor");c||(c="");var h=0;s="https://api.imhcg.cn/api/v1/zssq/catalog/detail?gender="+r+"&major="+i+"&minor="+c+"&start="+h+"&limit=20",h+=20,o.ajax.nextSortUrl="https://api.imhcg.cn/api/v1/zssq/catalog/detail?gender="+r+"&major="+i+"&minor="+c+"&start="+h+"&limit=20"}console.log(s),o.show_ajaxrenderList(),this.$nextTick(function(){fetch(s).then(function(o){return o.json()}).then(function(o){a.ajax.bookListData=o,console.log(o)})})},loadBook:function(t){var a=this;console.log("加载书籍");var e=t.target.getAttribute("bookID");o.ajax.nowAtBookId=e;var n=t.target.innerHTML;o.ajax.titleText=n,console.log(e,n);var s="https://api.imhcg.cn/api/v1/zssq/atoc/"+e;this.ajax.bookSource.bookID?(console.log("加载源"),o.show_ajaxBookSource()):(console.log("刷新源"),fetch(s).then(function(o){return o.json()}).then(function(o){a.ajax.bookSource[e]=o}).then(function(){console.log(o.ajax.nowAtBookId),console.log(o.ajax.bookSource),console.log(o.ajax.bookSource[o.ajax.nowAtBookId]),o.show_ajaxrenderBook(),o.show_ajaxBookSource()}))},BookControl:function(o){console.log("阅读器功能");var t=o.target.getAttribute("func");console.log(t)}}});
},{}]},{},["Focm"], null)
//# sourceMappingURL=/index.map