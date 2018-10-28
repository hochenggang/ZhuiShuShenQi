<?php
    // 简单的 php 代理工具，用于解决简单的跨域请求问题

    // 设置返回的 header 信息
    header("Access-Control-Allow-Origin: *"); 
    header('Content-type: text/json; charset=utf-8');
    // 获取POST请求的传入数据
    $bodyData = file_get_contents("php://input");
    // 解码 json 为 php 数组
    $bodyData = json_decode($bodyData,true);
    
    if (!$bodyData['url']) {
        die("Unable to fetch url !");
    } else {
        try {
            // 请求 json 传入的 url 并输出结果
            $resp = file_get_contents(urlencode_ch($bodyData['url'])); 
            // 直接返回请求结果
            echo $resp;
        } catch (Exception $e) {
            echo "Caught Default Exception\n", $e;
        }
        
    };
    
    // 正则表达式匹配非单字节字符（含中文）
    // 可以用于将链接中部分中文参数编码
    function urlencode_ch($str){
        function callback($match){
            return urlencode($match[0]);
        }
        return preg_replace_callback('/[^\0-\127]+/','callback',$str);
        
    }
?>
