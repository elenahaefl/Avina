<?php
// index.php (API that returns JSON about the logged-in user)
session_start();
require_once 'db.php';

if (!isset($_SESSION['user_id'])) {
    // Instead of redirect, return a 401 JSON response
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

// If they are logged in, return user data
echo json_encode([
    "status" => "success",
    "user_id" => $_SESSION['user_id'],
    "email" => $_SESSION['email']
]);

$userId = $_SESSION['user_id'] ?? null;

if (!$userId) {
    die("Nicht eingeloggt.");
}

// Hole Profil-ID
$stmt = $pdo->prepare("SELECT id FROM user_profiles WHERE user_id = ?");
$stmt->execute([$userId]);
$profile = $stmt->fetch();

if ($profile) {
    $profileId = $profile['id'];

    $sql = "SELECT c.id, c.name 
            FROM chosencategories cc
            JOIN categories c ON cc.kategorien_id = c.id
            WHERE cc.personen_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$profileId]);

    $kategorien = $stmt->fetchAll();

    echo "<h2>Deine gewählten Kategorien:</h2><ul>";
    foreach ($kategorien as $kat) {
        echo "<li>{$kat['name']} 
            <form method='post' action='delete.php' style='display:inline;'>
                <input type='hidden' name='category_id' value='{$kat['id']}'>
                <button type='submit'>Entfernen</button>
            </form>
        </li>";
    }
    echo "</ul>";
} else {
    echo "Kein Profil gefunden.";
}
?>
