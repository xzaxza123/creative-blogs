<?php
// 修改用户信息

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");

$myObject = json_decode($_POST['tab'], true);


$username = $myObject['name'];
$email = $myObject['emali'];
$userid = $myObject['userid'];
$headshot = $myObject['headshot'];

//判断是否存在
$conn = mysqli_connect("localhost:3306","root","","essay");

$changeurl = "update user set headshot='$headshot',username='$username',email='$email',updatetime=now() where userid='$userid' ";
$changepaper = "update paper set writer='$username',writerheadshot='$headshot' where writerid='$userid' ";

mysqli_query($conn,$changeurl); 
mysqli_query($conn,$changepaper); 

$fals = true;
if(mysqli_errno($conn)){
    $error = mysqli_error($conn);
    $fals = false;
    echo $error;
    echo 0;
}
if ($fals) {
    $username = '';
    $userid = '';
    $headshot = '';
    $email = '';
    
    echo 1;
}



mysqli_close($conn);
?>