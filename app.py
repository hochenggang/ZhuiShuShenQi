import requests
from flask import Flask,request,jsonify
app = Flask(__name__)

# 追书神器 API
@app.route('/api/v1/zssq')
def index():
    return jsonify({
        'info':'追书神器API，使用腾讯云服务器中转，支持跨域。感谢 https://github.com/xiadd',
        'target':{
            '排名分类':{'url':'/api/v1/zssq/ranking/gender','method':'GET'},
            '排名详情':{'url':'/api/v1/zssq/ranking/<排名的 id>','method':'GET'},
            '某本书的详情':{'url':'/api/v1/zssq/book/<书的 id>','method':'GET'},
            '某本书的源':{'url':'/api/v1/zssq/atoc/<书的 id>','method':'GET'},
            '某源的章节列表':{'url':'/api/v1/zssq/btoc/<源的 id>','method':'GET'},
            '搜索书名或者作者':{'url':'/api/v1/zssq/search/<关键字或作者>','method':'GET'},
            '获取某书的章节内容':{'url':'/api/v1/zssq/chapter?link=<章节链接>','method':'GET'},
            '书籍的分类及子类':{'url':'/api/v1/zssq/catalog','method':'GET'},
            '书籍的分类详情(子类为可选参数))':{'url':'/api/v1/zssq/catalog/detail?gender=<>&major=<>&minor=<>&start=<>&limit=<>','method':'GET'}
        }
    })

# 排名分类
# https://api.zhuishushenqi.com/ranking/gender
@app.route('/api/v1/zssq/ranking/gender')
def rankinggender():
    r = requests.get('https://api.zhuishushenqi.com/ranking/gender',timeout =2)
    return r.content

# 排名详情
# https://api.zhuishushenqi.com/ranking/{id}
@app.route('/api/v1/zssq/ranking/<id>')
def rankingid(id):
    r = requests.get('https://api.zhuishushenqi.com/ranking/{0}'.format(id),timeout =2)
    return r.content

# 某本书的详情
# http://api.zhuishushenqi.com/book/:id
@app.route('/api/v1/zssq/book/<id>')
def bookid(id):
    r = requests.get('https://api.zhuishushenqi.com/book/{0}'.format(id),timeout =2)
    return r.content

# 某本书的源
# http://api.zhuishushenqi.com/atoc?view=summary&book={id}
@app.route('/api/v1/zssq/atoc/<id>')
def bookatoc(id):
    r = requests.get('https://api.zhuishushenqi.com/atoc?view=summary&book={0}'.format(id),timeout =2)
    return r.content


# 源的章节列表
# http://api.zhuishushenqi.com/btoc/{0}?view=chapters
@app.route('/api/v1/zssq/btoc/<id>')
def bookbtoc(id):
    r = requests.get('https://api.zhuishushenqi.com/btoc/{0}?view=chapters'.format(id),timeout =2)
    return r.content

# 章节内容
# http://chapter2.zhuishushenqi.com/chapter/{chapterUrl}
@app.route('/api/v1/zssq/chapter')
def bookchapter():
    try:
        link = request.args.get('link')
        if link[0:4] == 'http':
            r = requests.get('https://chapter2.zhuishushenqi.com/chapter/{0}'.format(link),timeout = 2)
            return r.content
        else:
            return jsonify({'ok':'false'})
    except:
        return jsonify({'ok':'false'})

# 搜索
# http://api.zhuishushenqi.com/book/fuzzy-search?query={keyword}
@app.route('/api/v1/zssq/search/<keyword>')
def booksearch(keyword):
    r = requests.get('https://api.zhuishushenqi.com/book/fuzzy-search?query={0}'.format(keyword),timeout = 2)
    return r.content

# 分类
# 分类及子类
# http://api.zhuishushenqi.com/cats/lv2
@app.route('/api/v1/zssq/catalog')
def bookcatalog():
    r = requests.get('https://api.zhuishushenqi.com/cats/lv2',timeout = 2)
    return r.content

# 分类详情
# http://api.zhuishushenqi.com/book/by-categories?gender={}&type=hot&major={}&minor={}&start={}&limit={}
@app.route('/api/v1/zssq/catalog/detail')
def bookcatalogdetail():
    try:
        major = request.args.get('major')
        minor = request.args.get('minor')
        gender = request.args.get('gender')
        start = request.args.get('start')
        limit = request.args.get('limit')
        if not minor:
            r = requests.get('https://api.zhuishushenqi.com/book/by-categories?gender={}&type=hot&major={}&minor=&start={}&limit={}'.format(gender,major,start,limit),timeout = 2)
        else:
            r = requests.get('https://api.zhuishushenqi.com/book/by-categories?gender={}&type=hot&major={}&minor={}&start={}&limit={}'.format(gender,major,minor,start,limit),timeout = 2)
        return r.content
    except:
        return jsonify({'ok':'false'})

# 代理
@app.route('/api/v1/proxy',methods=['POST'])
def proxy():
    try:
        url = request.form['url']
        if url[0:4] == 'http':
            print (url)
            r = requests.get(url, timeout = 2)
            return r.content
        else:
            return jsonify({'ok':'false'})
    except:
        return jsonify({'ok':'false'})


app.run(host='0.0.0.0',port='2333')