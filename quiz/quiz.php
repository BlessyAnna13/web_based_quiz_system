

<?php


$mysqli = new mysqli("localhost:3306","root","1234","quiz");

// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
//echo 'Connected.' . '<br>';

$sql = "SELECT question, options, answer  FROM quizdata ORDER BY id ";
$result = $mysqli->query($sql);


// Associative array
$quizArray = [];
while($row = $result -> fetch_assoc()) {
    //echo '<h1>' . $row['question'] . ' ' . $row['options'] . ' ' . $row['answer'] . '</h1>';
    $quizArray[] = [
      'question' => $row['question'],
      'options' =>  preg_split('/\,\s*/', $row['options']),
      'answer' => $row['answer']
    ];
};

echo json_encode($quizArray, JSON_PRETTY_PRINT);


// Free result set
$result -> free_result();

$mysqli -> close();
?>