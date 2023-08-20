<?php
//富文本编辑器图片上传
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

if ((($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/png")
|| ($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/bmp")
|| ($_FILES["file"]["type"] == "image/webp"))
&& ($_FILES["file"]["size"] < 3000000)){
    if ($_FILES["file"]["error"] > 0){
        echo "错误: " . $_FILES["file"]["error"] . "<br>";
    }else{

        $string = strrev($_FILES['file']['name']); //反转字符串
        $array = explode('.',$string);  //用点分割字符
        $wenjianhz = strrev($array[0]);//再次反转并输出分割后第一个字符串即为文件的后缀名

        //图片文件的生成新包含后缀的名字
        $savename = date('YmdHis',time()).mt_rand(0,9999).".".$wenjianhz;

        $imgdirs = "upload/image/".date('Y-m-d',time());  //按日期生成文件夹路径注意格式首位不能有斜杠
        mkdirs($imgdirs); //路径检查函数，不存在则创建文件夹-okay

        $savepath = $imgdirs.'/'.$savename;  //图片保存的路径

        //生成一个URL获取图片的地址推荐绝对定位
        $url = 'http://' . $_SERVER['HTTP_HOST'] . '/' . $imgdirs.'/'.$savename;   // 本地地址
        

        move_uploaded_file($_FILES["file"]["tmp_name"],$savepath);//把临时文件移动进入制定的目录和名字-关键

        //以下代码已验证okay
        $data1["errno"] = 0;
        $data1["data"] = array(['url' => $url, 'alt' => '#','href' => '#']);
        $json = json_encode($data1);
        echo stripslashes($json);
    }
}else{
    
        $data2['errno'] = 1;
        $data2['message'] = "失败信息";
    echo json_encode($data2);
}

     //创建文件夹权限函数
function mkdirs($dir, $mode = 0777){
    if (is_dir($dir) || mkdir($dir, $mode)) return TRUE;//如果目录是路径且执行文件目录创建返回为正
    if (!mkdirs(dirname($dir), $mode)) return FALSE;//dirname() 函数返回路径中的目录部分。
    return mkdir($dir, $mode);//创建目录
}
?>