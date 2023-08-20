<?php
//注册

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");


$myObject = json_decode($_POST['tab'], true);

//用户名 密码 邮箱
$username = $myObject['name'];
$password = $myObject['pass'];
$email = $myObject['staffEmail'];

//id
function randomid() {
    
    $num = rand(0,99999) * 2;
    $lettera = chr(rand(97,122));
    $letterA = chr(rand(65,90));

    return  $num . $lettera . $letterA;
}
$id = randomid();


//判断是否重复
$conn = mysqli_connect("localhost:3306","root","","essay");


// 用户名
$sqlname = 'select username from  user';

$allname = mysqli_query($conn,$sqlname); 

if($allname){
    while($name = mysqli_fetch_assoc($allname)){  
        foreach($name as $value){
            if ($username === $value) {
                echo 606;
                mysqli_close($conn);
                exit();
            }   
        }
    }
};

//邮箱
$sqlemail = 'select email from  user';

$allemail = mysqli_query($conn,$sqlemail); 
if($allemail){
    while($emailmq = mysqli_fetch_assoc($allemail)){  
        foreach($emailmq as $value){
            if ($email === $value) {
                echo 707;
                mysqli_close($conn);
                exit();
            }   
        }
    }
};


//将数据写入数据库


$sql = "insert into user (username,password,userid,email,registeredtime) values ('$username',password('$password'),'$id','$email',now())";

mysqli_query($conn,$sql); 

$fals = true;
if(mysqli_errno($conn)){
    $error = mysqli_error($conn);
    $fals = false;
}
if ($fals) {
    $username = '';
    $password = '';
    $email = '';
    $id = '';

    
    echo 1;
}


mysqli_close($conn);
?>