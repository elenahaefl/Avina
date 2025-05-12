<?php
// register.php
session_start();
header('Content-Type: application/json');

require_once '../system/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Eingaben auslesen und trimmen
    $email     = trim($_POST['email'] ?? '');
    $password  = trim($_POST['password'] ?? '');
    $firstName = trim($_POST['firstname'] ?? '');
    $lastName  = trim($_POST['lastname'] ?? '');
    $birthdate = trim($_POST['birthdate'] ?? '');

    // Prüfung auf leere Felder
    if (!$email || !$password || !$firstName || !$lastName || !$birthdate) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    // Prüfen ob Email schon existiert
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->execute([':email' => $email]);
    if ($stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Email is already in use"]);
        exit;
    }

    // Passwort hashen
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        // Transaktion starten
        $pdo->beginTransaction();

        // User in users-Tabelle einfügen
        $insertUser = $pdo->prepare("INSERT INTO users (email, password) VALUES (:email, :pass)");
        $insertUser->execute([
            ':email' => $email,
            ':pass'  => $hashedPassword
        ]);

        // Neue User-ID abrufen
        $userId = $pdo->lastInsertId();

        // Profildaten in user_profiles speichern
        $insertProfile = $pdo->prepare("
            INSERT INTO user_profiles (user_id, firstname, lastname, birthdate)
            VALUES (:user_id, :firstname, :lastname, :birthdate)
        ");
        $insertProfile->execute([
            ':user_id'    => $userId,
            ':firstname' => $firstName,
            ':lastname'  => $lastName,
            ':birthdate'  => $birthdate
        ]);

        // Transaktion abschließen
        $pdo->commit();

        echo json_encode(["status" => "success"]);

    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(["status" => "error", "message" => "Registration failed: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
