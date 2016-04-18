<?php 

	class Task{ 

		// database connection and table name 

		private $conn; 
		private $table_name = "task"; 

		// object properties 
		public $task;

		// constructor with $db as database connection 
		public function __construct($db){ 
			$this->conn = $db;
    	}


    	public function create(){
     
		    // query to insert record
		    $query = "INSERT INTO " . $this->table_name . " SET task=:task";
		     
		    // prepare query
		    $stmt = $this->conn->prepare($query);
		 
		    // posted values
		    $this->task=htmlspecialchars(strip_tags($this->task));
		 
		    // bind values
		    $stmt->bindParam(":task", $this->task);
		   
		     
		    // execute query
		    if($stmt->execute()){
		        return true;
		    }else{
		        echo "
				<pre>";
		            print_r($stmt->errorInfo());
		        echo "</pre>
		 
				";
		 
		        return false;
		    }
		}

		// read products
		function readAll(){
		 
		    // select all query
		    $query = "SELECT *
		            FROM 
		                " . $this->table_name . " ORDER BY id DESC";
		 	
		    // prepare query statement
		    $stmt = $this->conn->prepare( $query );
		     
		    // execute query
		    $stmt->execute();
		     
		    return $stmt;
		}

    	

    	public function delete(){

    		// select all query
		    $query = "DELETE FROM  " . $this->table_name . " where id = :id";
		 	// prepare query
		    $stmt = $this->conn->prepare($query);
		 	// posted values
		    $this->id=htmlspecialchars(strip_tags($this->id));
		 	// bind values
		    $stmt->bindParam(":id", $this->id);
		   	// execute query
		    if($stmt->execute()){
		        return true;
		    }else{
		    	return false;
		    }
    	}

    	

}

?>