<?php 

    header("Access-Control-Allow-Origin: *"); 
    header("Content-Type: application/json; charset=UTF-8"); 

    // include database and object files 
     include_once 'config/database.php'; 
     include_once 'includes/task.php'; 

    // // instantiate database and task object 
    $database = new Database(); 
    $db = $database->getConnection();
 
    // // initialize object
    $task = new Task($db);
     
    // // query tasks
     $stmt = $task->readAll();
     $num = $stmt->rowCount();
     
    // check if more than 0 record found
    if($num>0){
         
        $data="";
        $x=1;
        $arr = [];
         
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            
            extract($row);
             
            $data .= '{';
                $data .= '"id":"'  . $id . '",';
                $data .= '"task":"'   . $task . '"';
            $data .= '}'; 
             
            $data .= $x<$num ? ',' : ''; 
            $arr[] = $data;

            $x++; 
        } 
    } // json format output
    // json format output 
    echo '[' . $data . ']'; 

    
?>
