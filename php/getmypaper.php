<?php
//我的文章列内容获取

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");


$myObject = $_GET;

$userid =$myObject['userid'];


$conn = mysqli_connect("localhost:3306","root","","essay");
//将数据写入数据库

$sql = "select title,textarea,coverimg,paperid from paper where writerid='$userid'";

$result = mysqli_query($conn,$sql); 

$arr = array();
if($result){
    while($titles = mysqli_fetch_assoc($result)){  
           array_push($arr,$titles);
        }

        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
}else {
    echo 0;
};

mysqli_close($conn);
?>