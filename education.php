<?php
$host = 'localhost'; //имя хоста, на локальном компьютере это localhost
$user = 'root'; //имя пользователя, по умолчанию это root
$password = 'root'; //пароль, по умолчанию пустой
$db_name = 'education'; //имя базы данных

//Соединяемся с базой данных используя наши доступы:
$link = mysqli_connect($host, $user, $password, $db_name);
mysqli_query($link, "SET NAMES 'utf8'");


//получение всех уроков из БД и отправка их на клиент
if( isset($_GET['getLessons']) && $_GET['getLessons'] === "true" ) {
	$query = "SELECT lessons.id, categories.id as cat_id, lessons.position as lesson_pos, categories.position as category_pos, categories.name as category, lessons.name as lesson, description, link FROM lessons LEFT JOIN categories ON lessons.category_id=categories.id ORDER BY categories.position, lessons.position ";

	$result = mysqli_query($link, $query) or die(mysqli_error($link));
	for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);

	//массив объедененный по категориям
	$data_arr = [];
	foreach ($data as $key => $value) {
		$data_arr[$value['category']][] = $value;
	}

	echo json_encode(['success' => true, 'result' => $data_arr]);
}