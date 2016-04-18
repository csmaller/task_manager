<?php 
header("Access-Control-Allow-Origin: *"); 

// get database connection 
include_once 'config/database.php'; 
$database = new Database(); 
$db = $database->getConnection();
 
// instantiate task object
include_once 'includes/task.php';
$task = new Task($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input")); 

// set task property values
$task->task = $data->task;

//create the task
if($task->create()){
    
    $returns = json_encode($data);
    echo $returns;

}
//if unable to create the product, tell the user
else{
    echo "";
}
?>