<?php

// Create connection
$conn = new mysqli("localhost:3306","root","1234","quiz");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql= "select * from quizdata";
$sql = "SELECT question, options, answer FROM quizdata";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "question: " . $row["question"]. " - options: " . $row["options"]. " - answer: " . $row["answer"]. "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>

