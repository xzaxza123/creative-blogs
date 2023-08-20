<?php
// 首页列内容获取

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");

$conn = mysqli_connect("localhost:3306","root","","essay");

$sql = 'select title,textarea,coverimg,paperid from  paper';

$result = mysqli_query($conn,$sql); 

$arr = array();
if($result){
    while($titles = mysqli_fetch_assoc($result)){  
           array_push($arr,$titles);
        }

        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
};

mysqli_close($conn);
?>