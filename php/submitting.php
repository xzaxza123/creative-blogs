<?php
//文章提交

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");

$myObject = json_decode($_POST['tab'], true);

$title = $myObject['title'];
$left = $myObject['left'];
$right = $myObject['right'];
$textarea = $myObject['textarea'];
$coverimg = $myObject['coverimg'];
$username = $myObject['username'];
$userid = $myObject['userid'];
$headshot = $myObject['headshot'];

function randomid() {
    
    $num = rand(0,99999) * 7;
    $lettera = chr(rand(97,122));
    $letterA = chr(rand(65,90));

    return  $num . $lettera . $letterA;
}
$paperid = randomid();
//判断是否存在
$conn = mysqli_connect("localhost:3306","root","","essay");

$writesql = "insert into paper (title,leftcontent,rightcontent,textarea,coverimg,paperid,writer,writerid,writerheadshot,pushtime) values ('$title','$left','$right','$textarea','$coverimg','$paperid','$username','$userid','$headshot',now())";

mysqli_query($conn,$writesql); 

$fals = true;
if(mysqli_errno($conn)){
    $error = mysqli_error($conn);
    $fals = false;
    echo $error;
    echo 0;
}
if ($fals) {
    $title = '';
    $left = '';
    $right = '';
    $textarea = '';
    $coverimg = '';
    $username = '';
    $userid = '';
    $headshot = '';
    $paperid = '';
    
    echo 1;
}



mysqli_close($conn);
?>