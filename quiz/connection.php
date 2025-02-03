<?php


// Create connection
$conn = new mysqli("localhost:3306","root","1234","quiz");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
$question=$_POST['question'];
$options=$_POST['options'];
$answer=$_POST['answer'];
$sql = "INSERT INTO quizdata (question, options, answer)
VALUES ('" . $question . "', '" . $options . "', '" . $answer . "')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

