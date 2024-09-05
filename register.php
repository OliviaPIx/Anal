<?php
$servername = "localhost";
$username = "root";
$password = "4218902";
$dbname = "users";

// Подключение к базе данных
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
    // Сообщение об ошибке подключения
    echo json_encode(['success' => false, 'message' => 'Ошибка подключения к базе данных.']);
    exit();
}

// Получаем данные из POST-запроса
$email = isset($_POST['email']) ? $_POST['email'] : '';
$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

// Валидация данных
if (empty($email) || empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Все поля обязательны для заполнения.']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Некорректный email.']);
    exit();
}

// Проверка, существует ли пользователь с таким email или логином
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ? OR username = ?");
$stmt->bind_param("ss", $email, $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Пользователь с таким email или логином уже существует.']);
    exit();
}

// Хешируем пароль
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Вставка нового пользователя в базу данных
$stmt = $conn->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $email, $username, $hashed_password);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Регистрация прошла успешно.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка регистрации. Попробуйте позже.']);
}

// Закрываем запрос и соединение
$stmt->close();
$conn->close();
?>
