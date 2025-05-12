<?php
// register.php
session_start();
header('Content-Type: application/json');

require_once '../system/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Eingaben
    $email     = trim($_POST['email'] ?? '');
    $password  = trim($_POST['password'] ?? '');
    $firstName = trim($_POST['firstname'] ?? '');
    $lastName  = trim($_POST['lastname'] ?? '');
    $birthdate = trim($_POST['birthdate'] ?? '');

    // Pflichtfelder prüfen
    if (!$email || !$password || !$firstName || !$lastName || !$birthdate) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    // Existierende E-Mail prüfen
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->execute([':email' => $email]);
    if ($stmt->fetch()) {
        http_response_code(409); // Conflict
        echo json_encode(["status" => "error", "message" => "Email is already in use"]);
        exit;
    }

    // Passwort hashen
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Transaktion: Benutzer + Profil speichern
    $pdo->beginTransaction();

    // Benutzer einfügen
    $insertUser = $pdo->prepare("INSERT INTO users (email, password) VALUES (:email, :pass)");
    $insertUser->execute([
        ':email' => $email,
        ':pass'  => $hashedPassword
    ]);

    // ID des neuen Benutzers holen
    $userId = $pdo->lastInsertId();

    // Profil einfügen
    $insertProfile = $pdo->prepare("
        INSERT INTO user_profiles (user_id, first_name, last_name, birthdate)
        VALUES (:user_id, :first_name, :last_name, :birthdate)
    ");
    $insertProfile->execute([
        ':user_id'    => $userId,
        ':first_name' => $firstName,
        ':last_name'  => $lastName,
        ':birthdate'  => $birthdate
    ]);

    $pdo->commit();

    echo json_encode(["status" => "success"]);
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
