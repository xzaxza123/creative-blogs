<?php
//删除文章

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");


$myObject = $_GET;

$paperid =$myObject['paperid'];


$conn = mysqli_connect("localhost:3306","root","","essay");

$sql = "delete from paper where paperid='$paperid'";

$result = mysqli_query($conn,$sql); 

$fals = true;
if(mysqli_errno($conn)){
    $error = mysqli_error($conn);
    $fals = false;
    echo 0;
}
if ($fals) {
    $paperid = '';

    echo 1;
}

mysqli_close($conn);
?>