<?php 
// Prelevo il contenuto del file JSON
$TasksJSON = file_get_contents("data.json");

// decodifico il file JSON per utilizzarlo in PHP
$decodedJSON = json_decode($TasksJSON, true);

// Eseguo modifiche varie ed eventuali 
// ADD TASK
if(isset($_POST["todo"]) && isset($_POST["done"])){
  // add new task
  if(!empty($_POST["todo"])){
    $decodedJSON[] = array(
      "todo" => $_POST["todo"],
      "done" => filter_var($_POST["done"],FILTER_VALIDATE_BOOLEAN)
    );
  }
}

// TOGGLE done
if(isset($_POST["toggle"])){
  $indexToggle = $_POST["toggle"];
  $decodedJSON[$indexToggle]["done"] = !$decodedJSON[$indexToggle]["done"];
}

// DELETE TASK
if(isset($_POST["delTask"])){
  $indexDel = $_POST["delTask"];
  if($decodedJSON[$indexDel]["done"]){
    array_splice($decodedJSON,$indexDel,1);
  }
}

// EDIT TASK
if(isset($_POST["editIndex"]) && isset($_POST["todoEdit"]) ){
  if(!empty($_POST["todoEdit"])){
    $indexEdit = $_POST["editIndex"];
    $decodedJSON[$indexEdit]["todo"] = $_POST["todoEdit"];
  }
}

// Ricodifico l'array in un file JSON
$encodeJSON = json_encode($decodedJSON);

// Rendo il mio file php di tipo "application/json" e gli stampo dentro il mio array codificato in JSON
header("Content-Type: application/json");
echo $encodeJSON;

// Stampo sul file esterno JSON il mio array modificato
file_put_contents("data.json",$encodeJSON);
?>