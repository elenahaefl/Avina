<?php
// index.php (API that returns JSON about the logged-in user)
session_start();
require_once '../../system/config.php';

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

if (isset($_POST['category_id'])) {
    $categoryId = (int) $_POST['category_id'];
    $userId = $_SESSION['user_id'] ?? null;

    if (!$userId) {
        die("Nicht eingeloggt.");
    }

    // Hole das Profil der Userin
    $stmt = $pdo->prepare("SELECT id FROM user_profiles WHERE user_id = ?");
    $stmt->execute([$userId]);
    $profile = $stmt->fetch();

    if ($profile) {
        $profileId = $profile['id'];

        // Doppelter Eintrag verhindern
        $check = $pdo->prepare(query: "SELECT 1 FROM chosencategories WHERE personen_id = ? AND kategorien_id = ?");
        $check->execute([$profileId, $categoryId]);

        if (!$check->fetch()) {
            $insert = $pdo->prepare("INSERT INTO chosencategories (personen_id, kategorien_id) VALUES (?, ?)");
            $insert->execute([$profileId, $categoryId]);
            echo "Kategorie wurde gespeichert.";
        } else {
            $remove = $pdo->prepare(query: "DELETE FROM chosencategories WHERE personen_id = ? AND kategorien_id = ?");
            $remove->execute([$profileId, $categoryId]);
            echo "Kategorie wurde bereits gewählt.";
        }
    } else {
        echo "Kein Profil zur Userin gefunden.";
    }
} else {
    echo "Keine Kategorie gesendet.";
}
header('Location: ../../auswahl.html');
exit;
?>