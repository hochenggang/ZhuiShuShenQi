var M = {};
// 前进或后退
window.onpopstate = function (e) {
    console.log('前进或后退')
}
// 保存历史纪录
function sava() {
    window.history.pushState({ 'main': document.querySelector('#main').innerHTML }, document.title, location.href);
}
// 功能
M.f = {};
// 传入一个无序列表元素和一个书籍信息，书籍信息会被添加到无序列表
M.f.callItem = function (ul, i) {
    // 取出书籍信息
    let _id = i._id;
    let author = i.author;
    let title = i.title;
    let shorIntro = i.shortIntro;
    let retentionRatio = i.retentionRatio;
    let latelyFollower = i.latelyFollower;
    // 创建信息容器
    let shortBookItem = document.createElement('li');
    shortBookItem.setAttribute('class', 'shortBookItem');
    


    // 创建信息填充函数 
    function generalSpan(text, classname) {
        let element = document.createElement('span');
        element.appendChild(document.createTextNode(text));
        element.setAttribute('class', classname);
        return element
    }
    // 创建信息标签
    let shortBookItemTitle = generalSpan(title, 'shortBookItemTitle');
    shortBookItemTitle.setAttribute('_id', _id);
    let shortBookItemAuthor = generalSpan(author, 'shortBookItemAuthor');
    let shortBookItemShortIntro = generalSpan(shorIntro, 'shortBookItemShortIntro');
    let shortBookItemretentionRatio = generalSpan('留存率 ' + retentionRatio, 'shortBookItemretentionRatio');
    let shortBookItemlatelyFollower = generalSpan('追书人数 ' + latelyFollower, 'shortBookItemlatelyFollower');
    // 填充信息
    shortBookItem.appendChild(shortBookItemTitle);
    shortBookItem.appendChild(shortBookItemAuthor);
    shortBookItem.appendChild(shortBookItemShortIntro);
    shortBookItem.appendChild(shortBookItemretentionRatio);
    shortBookItem.appendChild(shortBookItemlatelyFollower);
    // 添加到父元素
    ul.appendChild(shortBookItem);
}
// 初始化渲染区域，将传入的元素填充并设为可见
M.f.fillRender = function (elements) {
    // 取得渲染容器
    let render = document.querySelector('#render');
    render.innerHTML = '';
    elements.forEach(e => {
        render.appendChild(e);
    })
    render.style.display = 'block';
    document.querySelector('#findList').style.display = 'none';
}

// DOM
// mybook
M.search = {};
M.search.listen = function () {
    let searchInput = document.querySelector('#searchInput');
    // 取得搜索图标按钮
    let headerFunxSearchIcon = document.querySelector('#headerFunxSearchIcon');
    // 为搜索图标按钮添加点击事件监听
    headerFunxSearchIcon.addEventListener('click', e => {
        // 隐藏图标，显示输入框
        e.target.style.display = 'none';
        searchInput.style.display = 'block';
        searchInput.focus();
        // 为输入框添加失去焦点事件监听
        searchInput.onblur = function () {
            // 隐藏输入框，显示图标
            this.style.display = 'none';
            e.target.style.display = 'block';
        }
        // 添加回车监听，然后请求API并渲染 BODY
        searchInput.onkeydown = function (event) {
            // 切换到发现页
            shiftLabel(document.querySelector('li[data-swich="find"]'));
            console.log('切换')
            // 判断输入长度及回车
            if (this.value.length > 1 && event.keyCode === 13) {
                console.log('回车')
                let url = 'https://api.imhcg.cn/api/v1/zssq/search/' + this.value;
                // 隐藏发现列表
                document.querySelector('#findList').style.display = 'none';
                fetch(url)
                    .then(r => r.json())
                    .then(d => {
                        let ul = document.createElement('ul');
                        ul.setAttribute('class', 'shortBook');
                        d.books.forEach(i => {
                            M.f.callItem(ul, i);
                        })
                        M.f.fillRender([ul,])
                    })
            }
        }
    })
}
// 添加搜索框监听
M.search.listen()

// 我的书籍
M.mybook = {};
M.mybook.show = function () {

}


// 切换
// 取得切换选选项
document.querySelector('#swich').addEventListener('click', e => {
    let target = e.target;
    let isFunc = target.getAttribute('data-type');
    if (isFunc && isFunc === 'swich') {
        // 检查切换目标是否活跃目标
        let isActive = target.querySelector('#swichSymble');
        if (isActive) {
            shiftLabel(target);
        } else {
            shiftLabel(target);
        }
    }
})

// 添加按钮监听
document.querySelector('#bodyNoBookIcon').addEventListener('click', () => {
    shiftLabel(document.querySelector('li[data-swich="find"]'));
})

function shiftLabel(target) {
    // 移除前一活跃标记
    let swichSymble = document.querySelector('#swichSymble');
    swichSymble.parentNode.removeChild(swichSymble);
    // 移除前一活跃ID
    document.querySelector('#activeSwich').removeAttribute('id');
    // 重建活跃标记
    swichSymble = document.createElement('div');
    swichSymble.setAttribute('id', 'swichSymble')
    // 恢复活跃标记
    target.appendChild(swichSymble);
    // 恢复活跃ID
    target.setAttribute('id', 'activeSwich');
    // 载入选择，加载内容区
    let choose = target.getAttribute('data-swich');

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
document.querySelector('#findList').addEventListener('click', e => {
    let target = e.target;
    let isFunc = target.getAttribute('data-func');
    if (isFunc) {
        switch (isFunc) {
            case 'rank':
                console.log('排行榜')
                ajaxRank();
                break;
            case 'booklist':
                console.log('书单')
                ajaxBooklist();
                break;
            case 'sort':
                console.log('分类')
                ajaxSort();
                break;
            case 'random':
                console.log('随机')
                ajaxRandom();
                break;
            default:
                break;
        }
    }

})

// 监听排行榜
document.querySelector('#render').addEventListener('click', e => {
    let target = e.target;
    const rankid = target.getAttribute('rankid');
    const major = target.getAttribute('major');
    const minor = target.getAttribute('minor');
    const gender = target.getAttribute('gender');
    const _id = target.getAttribute('_id');
    // 响应排行的点击
    if (rankid) {
        let url = 'https://api.imhcg.cn/api/v1/zssq/ranking/' + rankid;
        fetch(url)
            .then(r => r.json())
            .then(d => {
                let ul = document.createElement('ul');
                ul.setAttribute('class', 'shortBook');
                d.ranking.books.forEach(i => {
                    M.f.callItem(ul, i);
                })
                M.f.fillRender([ul,])
            })
    }
    // 响应分类的点击
    if (major) {
        let ren = document.querySelector('#render');
        ren.innerHTML = '';
        loadMore(0);
    }
    if (_id){
        console.log(_id)
    }
    function loadMore(start) {
        let url = '';
        start = start;
        if (minor) {
            url = 'https://api.imhcg.cn/api/v1/zssq/catalog/detail?major=' + major + '&minor=' + minor + '&gender=' + gender + '&start=' + start + '&limit=' + '20';
        } else {
            url = 'https://api.imhcg.cn/api/v1/zssq/catalog/detail?major=' + major + '&gender=' + gender + '&start=' + start + '&limit=' + '20';
        }
        console.log(url)
        fetch(url)
            .then(r => r.json())
            .then(d => {
                let ul = document.createElement('ul');
                ul.setAttribute('class', 'shortBook');
                d.books.forEach(i => {
                    M.f.callItem(ul, i);
                })
    
                start += 20;
                let ren = document.querySelector('#render');
                let more = M.f.creatTag('p', 'renderMore', '下一页');
                more.setAttribute('start', start);
                ren.appendChild(more);
                // 在下一页按钮前插入
                ren.insertBefore(ul,more);
                more.addEventListener('click', e => {
                    ren.removeChild(more);
                    loadMore(Number(e.target.getAttribute('start')));
                })
            })

    }
})

M.f.creatTag = function (tag, classname, text) {
    let element = document.createElement(tag);
    element.setAttribute('class', classname);
    element.appendChild(document.createTextNode(text));
    render.appendChild(element);
    return element
}

// Ajax
// https://api.imhcg.cn/api/v1/zssq
function ajaxRank() {
    fetch('https://api.imhcg.cn/api/v1/zssq/ranking/gender')
        .then(r => r.json())
        .then(d => {
            // 隐藏发现列表
            document.querySelector('#findList').style.display = 'none';
            // 初始化渲染区域
            let render = document.querySelector('#render');
            render.style.display = 'block';
            // 男生
            let ulMale = document.createElement('ul');
            ulMale.setAttribute('class', 'rankUl');
            d.male.forEach(i => {
                fillRank(ulMale, i)
            });
            let ulMalenote = M.f.creatTag('p', 'rankUlTitle', '男生');
            render.appendChild(ulMalenote);
            render.appendChild(ulMale);

            // 女生
            let ulFemale = document.createElement('ul');
            ulFemale.setAttribute('class', 'rankUl');
            d.female.forEach(i => {
                fillRank(ulFemale, i)
            });
            let ulFemalenote = M.f.creatTag('p', 'rankUlTitle', '女生');
            render.appendChild(ulFemalenote);
            render.appendChild(ulFemale);

            function fillRank(ul, i) {
                let rankItem = document.createElement('li');
                rankItem.setAttribute('class', 'rankItem');
                let rankItemTitle = document.createElement('span');
                rankItemTitle.setAttribute('class', 'rankItemTitle');
                rankItemTitle.appendChild(document.createTextNode(i.shortTitle));
                rankItem.appendChild(rankItemTitle);
                rankItemTitle.setAttribute('rankID', i._id);
                ul.appendChild(rankItem);
            }
        })
}

function ajaxBooklist() {

}

function ajaxSort() {
    fetch('https://api.imhcg.cn/api/v1/zssq/catalog')
        .then(r => r.json())
        .then(d => {
            // 男生
            let uMale = document.createElement('ul');
            uMale.setAttribute('class', 'rankUl');
            d.male.forEach(i => {
                let major = i.major;
                i.mins.forEach(minor => {
                    fillSort(uMale, major, minor, 'male')
                })
            })
            // 女生
            let uFemale = document.createElement('ul');
            uFemale.setAttribute('class', 'rankUl');
            d.female.forEach(i => {
                let major = i.major;
                i.mins.forEach(minor => {
                    fillSort(uFemale, major, minor, 'female')
                })
            })
            // 出版
            let uPress = document.createElement('ul');
            uPress.setAttribute('class', 'rankUl', null);
            d.press.forEach(i => {
                let major = i.major;
                fillSort(uPress, major, null)
            })

            function fillSort(ul, major, minor, gender) {
                let rankItem = document.createElement('li');
                rankItem.setAttribute('class', 'rankItem');
                let rankItemTitle = document.createElement('span');
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
            M.f.fillRender([M.f.creatTag('p', 'rankUlTitle', '男生'), uMale, M.f.creatTag('p', 'rankUlTitle', '女生'), uFemale, M.f.creatTag('p', 'rankUlTitle', '出版物'), uPress])
        })
}




