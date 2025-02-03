<?php


// Create connection
$conn = new mysqli("localhost:3306","root","1234","quiz");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";
$username=$_POST['username'];
$password=$_POST['password'];
$sql = 'select * from login where username = "' . $username . '" and password = "' . $password . '"';
$result = $conn->query($sql);


if (mysqli_num_rows($result) !== 0)
{
    echo "login succesful";
}
else{
    echo " login failed";
    die();
}
$row = mysqli_fetch_assoc($result);
print_r ($row);
if ($row['level'] == 1)
{
    header('location: dashboard.html');
}
else{
    header('location: quiz.html');
}
$conn->close();
?>