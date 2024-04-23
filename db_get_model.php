<?php

// www.cliente.com/visor/index.php?model=WomensFoot&filetype=fbx

$model = filter_var($_GET['model'], FILTER_SANITIZE_STRING);

$filetype = filter_var($_GET['filetype'], FILTER_SANITIZE_STRING);

$path_to_file = "models/" . $model . "." . $filetype;


if (file_exists($path_to_file)) {
	echo '<script>';
	echo 'const modelPath = "' . $path_to_file . '";';
	echo 'console.log(modelPath);';
	echo '</script>';
} else {
	echo '<script>';
	echo 'const errorMessage = "Elemento no encontrado"';
	echo '</script>';
}


?>

<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="src/style.css">
	<title>Visor 3D</title>
</head>

<body>
	<canvas class="webgl"></canvas>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
	<script type="module" src="./src/script.js"></script>
</body>

</html>