// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"main.js":[function(require,module,exports) {
var M = {};
// 前进或后退
window.onpopstate = function (e) {
    console.log('前进或后退');
};
// 保存历史纪录
function sava() {
    window.history.pushState({ 'main': document.querySelector('#main').innerHTML }, document.title, location.href);
}
// 功能
M.f = {};
// 传入一个无序列表元素和一个书籍信息，书籍信息会被添加到无序列表
M.f.callItem = function (ul, i) {
    // 取出书籍信息
    var _id = i._id;
    var author = i.author;
    var title = i.title;
    var shorIntro = i.shortIntro;
    var retentionRatio = i.retentionRatio;
    var latelyFollower = i.latelyFollower;
    // 创建信息容器
    var shortBookItem = document.createElement('li');
    shortBookItem.setAttribute('class', 'shortBookItem');

    // 创建信息填充函数 
    function generalSpan(text, classname) {
        var element = document.createElement('span');
        element.appendChild(document.createTextNode(text));
        element.setAttribute('class', classname);
        return element;
    }
    // 创建信息标签
    var shortBookItemTitle = generalSpan(title, 'shortBookItemTitle');
    shortBookItemTitle.setAttribute('_id', _id);
    var shortBookItemAuthor = generalSpan(author, 'shortBookItemAuthor');
    var shortBookItemShortIntro = generalSpan(shorIntro, 'shortBookItemShortIntro');
    var shortBookItemretentionRatio = generalSpan('留存率 ' + retentionRatio, 'shortBookItemretentionRatio');
    var shortBookItemlatelyFollower = generalSpan('追书人数 ' + latelyFollower, 'shortBookItemlatelyFollower');
    // 填充信息
    shortBookItem.appendChild(shortBookItemTitle);
    shortBookItem.appendChild(shortBookItemAuthor);
    shortBookItem.appendChild(shortBookItemShortIntro);
    shortBookItem.appendChild(shortBookItemretentionRatio);
    shortBookItem.appendChild(shortBookItemlatelyFollower);
    // 添加到父元素
    ul.appendChild(shortBookItem);
};
// 初始化渲染区域，将传入的元素填充并设为可见
M.f.fillRender = function (elements) {
    // 取得渲染容器
    var render = document.querySelector('#render');
    render.innerHTML = '';
    elements.forEach(function (e) {
        render.appendChild(e);
    });
    render.style.display = 'block';
    document.querySelector('#findList').style.display = 'none';
};

// DOM
// mybook
M.search = {};
M.search.listen = function () {
    var searchInput = document.querySelector('#searchInput');
    // 取得搜索图标按钮
    var headerFunxSearchIcon = document.querySelector('#headerFunxSearchIcon');
    // 为搜索图标按钮添加点击事件监听
    headerFunxSearchIcon.addEventListener('click', function (e) {
        // 隐藏图标，显示输入框
        e.target.style.display = 'none';
        searchInput.style.display = 'block';
        searchInput.focus();
        // 为输入框添加失去焦点事件监听
        searchInput.onblur = function () {
            // 隐藏输入框，显示图标
            this.style.display = 'none';
            e.target.style.display = 'block';
        };
        // 添加回车监听，然后请求API并渲染 BODY
        searchInput.onkeydown = function (event) {
            // 切换到发现页
            shiftLabel(document.querySelector('li[data-swich="find"]'));
            console.log('切换');
            // 判断输入长度及回车
            if (this.value.length > 1 && event.keyCode === 13) {
                console.log('回车');
                var url = 'https://api.imhcg.cn/api/v1/zssq/search/' + this.value;
                // 隐藏发现列表
                document.querySelector('#findList').style.display = 'none';
                fetch(url).then(function (r) {
                    return r.json();
                }).then(function (d) {
                    var ul = document.createElement('ul');
                    ul.setAttribute('class', 'shortBook');
                    d.books.forEach(function (i) {
                        M.f.callItem(ul, i);
                    });
                    M.f.fillRender([ul]);
                });
            }
        };
    });
};
// 添加搜索框监听
M.search.listen();

// 我的书籍
M.mybook = {};
M.mybook.show = function () {};

// 切换
// 取得切换选选项
document.querySelector('#swich').addEventListener('click', function (e) {
    var target = e.target;
    var isFunc = target.getAttribute('data-type');
    if (isFunc && isFunc === 'swich') {
        // 检查切换目标是否活跃目标
        var isActive = target.querySelector('#swichSymble');
        if (isActive) {
            shiftLabel(target);
        } else {
            shiftLabel(target);
        }
    }
});

// 添加按钮监听
document.querySelector('#bodyNoBookIcon').addEventListener('click', function () {
    shiftLabel(document.querySelector('li[data-swich="find"]'));
});

function shiftLabel(target) {
    // 移除前一活跃标记
    var swichSymble = document.querySelector('#swichSymble');
    swichSymble.parentNode.removeChild(swichSymble);
    // 移除前一活跃ID
    document.querySelector('#activeSwich').removeAttribute('id');
    // 重建活跃标记
    swichSymble = document.createElement('div');
    swichSymble.setAttribute('id', 'swichSymble');
    // 恢复活跃标记
    target.appendChild(swichSymble);
    // 恢复活跃ID
    target.setAttribute('id', 'activeSwich');
    // 载入选择，加载内容区
    var choose = target.getAttribute('data-swich');

    if (choose === 'find') {
        document.querySelector('#find').style.display = 'block';
        document.querySelector('#myBook').style.display = 'none';
        document.querySelector('#findList').style.display = 'flex';
        document.querySelector('#render').style.display = 'none';
        document.querySelector('#render').innerHTML = '';
    } else {
        document.querySelector('#find').style.display = 'none';
        document.querySelector('#myBook').style.display = 'block';
    }
}

// 发现页监听
// 取得切换选选项
document.querySelector('#findList').addEventListener('click', function (e) {
    var target = e.target;
    var isFunc = target.getAttribute('data-func');
    if (isFunc) {
        switch (isFunc) {
            case 'rank':
                console.log('排行榜');
                ajaxRank();
                break;
            case 'booklist':
                console.log('书单');
                ajaxBooklist();
                break;
            case 'sort':
                console.log('分类');
                ajaxSort();
                break;
            case 'random':
                console.log('随机');
                ajaxRandom();
                break;
            default:
                break;
        }
    }
});

// 监听排行榜
document.querySelector('#render').addEventListener('click', function (e) {
    var target = e.target;
    var rankid = target.getAttribute('rankid');
    var major = target.getAttribute('major');
    var minor = target.getAttribute('minor');
    var gender = target.getAttribute('gender');
    var _id = target.getAttribute('_id');
    // 响应排行的点击
    if (rankid) {
        var url = 'https://api.imhcg.cn/api/v1/zssq/ranking/' + rankid;
        fetch(url).then(function (r) {
            return r.json();
        }).then(function (d) {
            var ul = document.createElement('ul');
            ul.setAttribute('class', 'shortBook');
            d.ranking.books.forEach(function (i) {
                M.f.callItem(ul, i);
            });
            M.f.fillRender([ul]);
        });
    }
    // 响应分类的点击
    if (major) {
        var ren = document.querySelector('#render');
        ren.innerHTML = '';
        loadMore(0);
    }
    if (_id) {
        console.log(_id);
    }
    function loadMore(start) {
        var url = '';
        start = start;
        if (minor) {
            url = 'https://api.imhcg.cn/api/v1/zssq/catalog/detail?major=' + major + '&minor=' + minor + '&gender=' + gender + '&start=' + start + '&limit=' + '20';
        } else {
            url = 'https://api.imhcg.cn/api/v1/zssq/catalog/detail?major=' + major + '&gender=' + gender + '&start=' + start + '&limit=' + '20';
        }
        console.log(url);
        fetch(url).then(function (r) {
            return r.json();
        }).then(function (d) {
            var ul = document.createElement('ul');
            ul.setAttribute('class', 'shortBook');
            d.books.forEach(function (i) {
                M.f.callItem(ul, i);
            });

            start += 20;
            var ren = document.querySelector('#render');
            var more = M.f.creatTag('p', 'renderMore', '下一页');
            more.setAttribute('start', start);
            ren.appendChild(more);
            // 在下一页按钮前插入
            ren.insertBefore(ul, more);
            more.addEventListener('click', function (e) {
                ren.removeChild(more);
                loadMore(Number(e.target.getAttribute('start')));
            });
        });
    }
});

M.f.creatTag = function (tag, classname, text) {
    var element = document.createElement(tag);
    element.setAttribute('class', classname);
    element.appendChild(document.createTextNode(text));
    render.appendChild(element);
    return element;
};

// Ajax
// https://api.imhcg.cn/api/v1/zssq
function ajaxRank() {
    fetch('https://api.imhcg.cn/api/v1/zssq/ranking/gender').then(function (r) {
        return r.json();
    }).then(function (d) {
        // 隐藏发现列表
        document.querySelector('#findList').style.display = 'none';
        // 初始化渲染区域
        var render = document.querySelector('#render');
        render.style.display = 'block';
        // 男生
        var ulMale = document.createElement('ul');
        ulMale.setAttribute('class', 'rankUl');
        d.male.forEach(function (i) {
            fillRank(ulMale, i);
        });
        var ulMalenote = M.f.creatTag('p', 'rankUlTitle', '男生');
        render.appendChild(ulMalenote);
        render.appendChild(ulMale);

        // 女生
        var ulFemale = document.createElement('ul');
        ulFemale.setAttribute('class', 'rankUl');
        d.female.forEach(function (i) {
            fillRank(ulFemale, i);
        });
        var ulFemalenote = M.f.creatTag('p', 'rankUlTitle', '女生');
        render.appendChild(ulFemalenote);
        render.appendChild(ulFemale);

        function fillRank(ul, i) {
            var rankItem = document.createElement('li');
            rankItem.setAttribute('class', 'rankItem');
            var rankItemTitle = document.createElement('span');
            rankItemTitle.setAttribute('class', 'rankItemTitle');
            rankItemTitle.appendChild(document.createTextNode(i.shortTitle));
            rankItem.appendChild(rankItemTitle);
            rankItemTitle.setAttribute('rankID', i._id);
            ul.appendChild(rankItem);
        }
    });
}

function ajaxBooklist() {}

function ajaxSort() {
    fetch('https://api.imhcg.cn/api/v1/zssq/catalog').then(function (r) {
        return r.json();
    }).then(function (d) {
        // 男生
        var uMale = document.createElement('ul');
        uMale.setAttribute('class', 'rankUl');
        d.male.forEach(function (i) {
            var major = i.major;
            i.mins.forEach(function (minor) {
                fillSort(uMale, major, minor, 'male');
            });
        });
        // 女生
        var uFemale = document.createElement('ul');
        uFemale.setAttribute('class', 'rankUl');
        d.female.forEach(function (i) {
            var major = i.major;
            i.mins.forEach(function (minor) {
                fillSort(uFemale, major, minor, 'female');
            });
        });
        // 出版
        var uPress = document.createElement('ul');
        uPress.setAttribute('class', 'rankUl', null);
        d.press.forEach(function (i) {
            var major = i.major;
            fillSort(uPress, major, null);
        });

        function fillSort(ul, major, minor, gender) {
            var rankItem = document.createElement('li');
            rankItem.setAttribute('class', 'rankItem');
            var rankItemTitle = document.createElement('span');
            rankItemTitle.setAttribute('class', 'rankItemTitle');
            if (!minor) {
                rankItemTitle.appendChild(document.createTextNode(major));
                rankItemTitle.setAttribute('major', major);
            } else {
                rankItemTitle.appendChild(document.createTextNode(minor));
                rankItemTitle.setAttribute('major', major);
                rankItemTitle.setAttribute('minor', minor);
                rankItemTitle.setAttribute('gender', gender);
            }
            rankItem.appendChild(rankItemTitle);
            ul.appendChild(rankItem);
        }
        M.f.fillRender([M.f.creatTag('p', 'rankUlTitle', '男生'), uMale, M.f.creatTag('p', 'rankUlTitle', '女生'), uFemale, M.f.creatTag('p', 'rankUlTitle', '出版物'), uPress]);
    });
}
},{}],"C:\\Users\\cheng\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '58627' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:\\Users\\cheng\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.45220bee.map