<?php
// 修改密码

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");


$myObject = json_decode($_POST['tab'], true);

//用户名 密码 邮箱
$password = $myObject['pass'];
$userid = $myObject['userid'];


$conn = mysqli_connect("localhost:3306","root","","essay");
//将数据写入数据库


$changepass = "update user set password=password('$password'),updatetime=now() where userid='$userid' ";
mysqli_query($conn,$changepass); 

$fals = true;
if(mysqli_errno($conn)){
    $error = mysqli_error($conn);
    $fals = false;
    echo $error;
    echo 0;
}
if ($fals) {
    $password = '';
    $userid = '';

    
    echo 1;
}


mysqli_close($conn);
?>