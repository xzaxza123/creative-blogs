<?php
//登录

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");


$myObject = json_decode($_POST['tab'], true);

//用户名 密码 邮箱
$username = $myObject['name'];
$password = $myObject['pass'];



//判断是否存在
$conn = mysqli_connect("localhost:3306","root","","essay");


// 用户名
$sqlogin = "select username,userid,headshot,email from user where username='$username' and password=password('$password') ";

$result = mysqli_query($conn,$sqlogin); 

$user = null;
if(mysqli_num_rows($result)==1){
    $row = mysqli_fetch_assoc($result);
    $user["username"] = $row["username"];    
    $user["userid"] = $row["userid"];    
    $user["headshot"] = $row["headshot"];    
    $user["email"] = $row["email"];    

    echo json_encode($user,JSON_UNESCAPED_UNICODE);
}else{
    echo 101;
};





mysqli_close($conn);
?>