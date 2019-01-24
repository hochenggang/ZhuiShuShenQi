<?php
// 添加跨域头部
header("Access-Control-Allow-Origin: *"); 
header('Content-type: application/json; charset=utf-8');

// 用于处理传入的链接
class Url
{
    // 获取需要请求的 URL
    public function load_url(){
        try{
            // 获取POST请求的传入数据
            $bodyData = file_get_contents("php://input");
            // 解码 json 为 php 数组
            $bodyData = json_decode($bodyData,true);

            if ($bodyData['url']) {
                return $this->urlencode_ch($bodyData['url']);
            } else {
                return false;
            }
        } catch(Exception $e){
            return false;
        }
    }

    // 正则表达式匹配非单字节字符（含中文）
    // 可以用于将链接中部分中文参数编码
    public function urlencode_ch($str){
        function callback($match){
            return urlencode($match[0]);
        }
        return preg_replace_callback('/[^\0-\127]+/','callback',$str);
    }
}


// 用于处理缓存
class Cache extends SQLite3
{
    // 初始化
    function __construct()
    {
        $this->open('cache.db');
    }

    // 检查缓存表是否存在
    function check_table(){
        $result = $this->query("SELECT sql FROM sqlite_master WHERE type = 'table' AND tbl_name = 'BOOK';");
        $result = $result->fetchArray();
        if(!$result){
            $this->create_cache_db();
        }
    }

    // 创建缓存数据库
    function create_cache_db(){
        $sql = <<<EOF
        CREATE TABLE BOOK
        (_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        URL TEXT NOT NULL,
        CONTENT TEXT NOT NULL,
        TIME INTEGER NOT NULL);
EOF;
        $this->exec($sql);
    }

    // 新建一条缓存
    function new_cache($URL,$CONTENT){
        $stmt = $this->prepare("INSERT INTO BOOK (URL, CONTENT, TIME) VALUES (:U, :C, :T)");
        $stmt->bindValue(':U', $URL, SQLITE3_TEXT);
        $stmt->bindValue(':C', $CONTENT, SQLITE3_TEXT);
        $date = new DateTime();
        $TIME = $date->getTimestamp();
        $stmt->bindValue(':T', $TIME, SQLITE3_INTEGER);
        $result = $stmt->execute();
    }

    // 查询一条缓存
    function get_cache($URL){
        $stmt = $this->prepare("SELECT * FROM BOOK WHERE URL=:U");
        $stmt->bindValue(':U', $URL, SQLITE3_TEXT);
        $result = $stmt->execute();
        $row = $result->fetchArray();
        if (!$row){
            // 没找到记录
            $CONTENT = file_get_contents($URL);
            if ($CONTENT){
                if(strlen($CONTENT) > 1){
                    $this->new_cache($URL,$CONTENT);
                }
            }
            header('Cached: False');
            return $CONTENT;

        }else{
            // 找到缓存
            header('Cached: True');
            return $row[2];
        }
    }

}


// 接收链接
$URL = new Url();
$URL = $URL->load_url();
if (!$URL){
    // 报错，提示没找到URL
    $result = array('ok'=>false,'message'=>'Can not decode the data you posted.');
    die(json_encode($result));
}

// 检查链接HOST是否为追书神器
$match = preg_match("/zhuishushenqi.com/i", $URL);
if (!$match){
    // 报错，提示只接受追书神器的链接
    $result = array('ok'=>false,'message'=>'Only proxy the urls from zhuishushenqi.com.');
    die(json_encode($result));
}

// 处理缓存，返回数据
$Cache = new Cache();
$Cache->check_table();
$C = $Cache->get_cache($URL);

exit($C);

?>