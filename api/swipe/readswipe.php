<?php
require_once '../../system/config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$userId = $_SESSION['user_id'];

// Get the user's profile ID
$stmt = $pdo->prepare("SELECT id FROM user_profiles WHERE user_id = ?");
$stmt->execute([$userId]);
$userProfile = $stmt->fetch();

if (!$userProfile) {
    http_response_code(400);
    echo json_encode(['error' => 'User profile not found']);
    exit;
}

$profileId = $userProfile['id'];

// Get user's chosen category IDs
$categoryStmt = $pdo->prepare("SELECT kategorien_id FROM chosencategories WHERE personen_id = ?");
$categoryStmt->execute([$profileId]);
$chosenCategoryIds = $categoryStmt->fetchAll(PDO::FETCH_COLUMN);

if (empty($chosenCategoryIds)) {
    echo json_encode([]); // No categories selected
    exit;
}

// Prepare placeholders for IN clause
$in = str_repeat('?,', count($chosenCategoryIds) - 1) . '?';

// Fetch activities NOT already matched by user in this group (optional: filter by group)
$sql = "
    SELECT a.*
    FROM activities a
    JOIN activities_category ac ON a.id = ac.aktivitaeten_id
    WHERE ac.kategorien_id IN ($in)
      AND a.id NOT IN (
          SELECT activity_id FROM matches WHERE personen_id = ?
      )
    GROUP BY a.id
    ORDER BY RAND()
    LIMIT 1
";

$stmt = $pdo->prepare($sql);
$stmt->execute([...$chosenCategoryIds, $profileId]);

$activity = $stmt->fetch(PDO::FETCH_ASSOC);

if ($activity) {
    echo json_encode($activity);
} else {
    echo json_encode(null);
}
