<?php 
// Prelevo il contenuto del file JSON
$TasksJSON = file_get_contents("data.json");

// decodifico il file JSON per utilizzarlo in PHP
$decodedJSON = json_decode($TasksJSON, true);

// Eseguo modifiche varie ed eventuali 


// Ricodifico l'array in un file JSON
$encodeJSON = json_encode($decodedJSON);

// Rendo il mio file php di tipo "application/json" e gli stampo dentro il mio array codificato in JSON
header("Content-Type: application/json");
echo $encodeJSON;


// Stampo sul file esterno JSON il mio array modificato
file_put_contents("data.json",$encodeJSON);

?>