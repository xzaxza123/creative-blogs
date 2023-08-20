<?php
//我的文章中文章内容获取

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");


$myObject = $_GET;

$paperid =$myObject['paperid'];


$conn = mysqli_connect("localhost:3306","root","","essay");
//将数据写入数据库

$sql = "select title,leftcontent,rightcontent from paper where paperid='$paperid'";

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