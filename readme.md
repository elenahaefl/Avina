# 🔑👤 Authentifizierung Minimal (Boilerplate)

![Static Badge](https://img.shields.io/badge/Sprache-PHP-%23f7df1e)
![Static Badge](https://img.shields.io/badge/Kurs-MMP_IM4-blue)
![Last Changed](https://img.shields.io/endpoint?url=https://badges.crazy-internet.ch/im4_example.php)

> 🎨 Dieses Boilerplate kann entweder in einem Code-Along Schritt für Schritt gemeinsam erarbeitet werden oder fixfertig auf einem Webserver installiert werden.

Dieses Repository beinhaltet ein vollständiges, minimales Authenzifizierungs-System basierend auf PHP als Backend und HTML/CSS/JS als Frontend.

Es ermöglicht Benutzern das `Registrieren`, `Anmelden`, `Abmelden` und den Zugriff auf eine `geschützte Seite` nach erfolgreicher Authentifizierung.

# 🏁 Live - Version

Du kannst Homely unter folgendem Link testen:

[https://im4.crazy-internet.ch/](https://im4.crazy-internet.ch/)

## ⚙️ Installation

Um dieses Boilerplate auf dem eigenen Web-Server zu installieren, führe folgende Schritte aus:

### 1. Download

- [Klone das Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) über GitHub oder [downloade das Repository als ZIP Datei](https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives) auf deinen eigenen Computer.

### 2. Datenbank

- Erstelle eine neue Datenbank bei deinem Hoster (z.B. [Infomaniak](https://www.infomaniak.com/de/support/faq/1981/mysqlmariadb-benutzer-und-datenbanken-verwalten)).

- Importiere die Datei `system/database.sql` in die neue Datenbank, um die `users` Tabelle zu erstellen.

### 3. Code

- Benenne die Datei `system/config.php.blank` in `system/config.php` um.

- Passe die Datenbankverbindungsdaten in der Datei `system/config.php` an.

### 4. FTP Connect

- Erstelle eine neue FTP Verbindung mit dem SFTP Plugin gemäss [Anleitung im MMP 101](https://github.com/Interaktive-Medien/101-MMP/blob/main/resources/sftp.md).

# 📁 Struktur

## 🎨 Frontend

### root (Basis-Verzeichnis)

- beinhaltet alle HTML-Dateien des Frontends.
- beinhaltet die `.gitignore` Datei, welche die Dateien und Verzeichnisse ausblendet, die nicht auf GitHub hochgeladen werden sollen.

### js

- beinhaltet alle JavaScript-Dateien des Frontends.

### css

- beinhaltet alle CSS-Dateien des Frontends.

## 🤖 Backend

### api

- Beinhaltet alle API-Endpunkte des Backends.
- Diese Dateien werden von `JavaScript` aufgerufen und geben eine Antwort an `JavaScript` zurück.

### system

- Beinhaltet die Konfigurationsdatei für die Datenbankverbindung.
- Beinhaltet die Datei `database.sql`, die die `users` Tabelle erstellt.
- Beinhaltet die Datei `config.php`, die die Konfiguration des Backends enthält.


# Abschlussdokumentation – Avina Website

## Projektidee & Entstehung

Um eine konkrete Idee für unsere App zu entwickeln, haben wir uns mit einer anderen Zweiergruppe zusammengesetzt und gemeinsam überlegt, in welchen Lebensbereichen sich Menschen über 50 mehr Unterstützung wünschen könnten. Dabei sind wir schnell auf das Thema Freizeitaktivitäten und das Wiederfinden als Paar nach dem Auszug der Kinder gestossen.

Zur weiteren Konkretisierung führten wir zwei Interviews mit Personen aus der Zielgruppe. Dabei wurde deutlich, dass viele sich eine App wünschen würden, die ihnen passende Aktivitäten vorschlägt – abgestimmt auf die eigenen Interessen und die des Partners. Diese Erkenntnis bildete den Ausgangspunkt für die anschliessende Planung.

## Unsere Idee

Die App soll es Nutzern ermöglichen, schnell und einfach passende Aktivitäten für bestimmte Gruppen zu finden. Nutzer können Gruppen erstellen – beispielsweise mit Familie, Freunden oder dem Partner. Die Gruppengrösse ist dabei nicht begrenzt.

Im Zentrum steht eine Swipe-Funktion auf der Startseite: Aktivitäten werden auf Karteikarten angezeigt und können mit "Ja" (interessiert) oder "Nein" (kein Interesse) bewertet werden. Swipen zwei Mitglieder dieselbe Aktivität nach rechts, entsteht ein Match, der in der Chatfunktion der Gruppe erscheint. Dort kann jede*r die Aktivität mit einem 1- bis 5-Sterne-System bewerten. Ziel ist es, Aktivitäten zu finden, die möglichst vielen in der Gruppe zusagen.

## Mock-Up & Prototyp

Auf Basis der Interviews und unserer Ideen entwickelten wir erste Skizzen in Figma. Schnell wurde klar: Wir haben deutlich mehr Seiten geplant als ursprünglich vorgesehen. Insgesamt entstanden 11 Seiten mit mehreren Unterseiten.

Während der Umsetzung mussten wir Anpassungen vornehmen, z. B. bei der Chatfunktion. Letztlich entschieden wir, dass Matches direkt im Chat angezeigt werden und dort bewertet werden können. Die Aktivitätskarte enthält zusätzlich einen Link zu einer externen Website mit detaillierten Informationen.

Die Zeit für diese Umsetzung haben wir etwas unterschätzt, was gegen Ende zu spürbarem Zeitdruck führte.

## Datenstruktur & Chart-Flow

Zu Beginn hatten wir Schwierigkeiten, den Chart-Flow korrekt aufzubauen – also die logischen Beziehungen zwischen den Seiten. Mit Unterstützung unserer Dozierenden haben wir schliesslich eine klare Struktur entwickelt:

- 6 Hauptkategorien: Personen, Kategorienwahl, Matches, Gruppen, Aktivitäten, Kategorien
- 2 Zwischenkategorien: GruppePersonen, AktivitätenKategorien (zur Verknüpfung der Hauptkategorien)

Diese Übersicht war essenziell für den Start in die Programmierung.

## Design & Umsetzung

Nach dem Aufsetzen der Datenbank begannen wir mit der technischen Umsetzung in HTML, CSS und JavaScript. Dank unserer Vorkenntnisse aus dem Studium kamen wir hier gut voran – besonders bei der Gestaltung des Layouts und der Benutzerführung.

Das Design wurde stark an die Figma-Layouts angelehnt. Auch wenn wir nicht alles exakt umsetzen konnten, gelang es uns, das Look-and-Feel gut zu übertragen. Zur Unterstützung nutzten wir ChatGPT und GitHub Copilot, was unsere Effizienz deutlich erhöhte.

## Datenbankanbindung

Nachdem wir den grössten Teil der App mit HTML, CSS und JavaScript umgesetzt hatten, dachten wir, wir wären fast fertig. Doch dann stellten wir fest, dass die Datenbankanbindung noch kaum implementiert war – ein grosser Aufwand, den wir zu diesem Zeitpunkt unterschätzt hatten.

Etwas überfordert vereinbarten wir ein Coaching mit Beni, der uns Schritt für Schritt erklärte, wie wir die Verknüpfung umsetzen können. Mit seinem Beispielcode, sowie weiterer Hilfe von ChatGPT und Copilot, konnten wir die nötigen Funktionen schliesslich doch noch implementieren – auch wenn es viel Zeit und Nerven gekostet hat.

## Learnings & Ausblick

### Learning 1: Realistisches Prototyping

Unser Figma-Prototyp war sehr detailliert – zu detailliert. Wir hatten viele Ideen, aber nicht genug Zeit, alles umzusetzen. Beim nächsten Mal würden wir früher filtern, was technisch realisierbar ist, und den Umfang an die vorhandene Zeit anpassen.

### Learning 2: Mit dem Schwierigen beginnen

Wir starteten mit HTML, CSS und JavaScript, weil wir uns damit am sichersten fühlten. Die Datenbank – die uns weniger vertraut war – verschoben wir zu lange. Rückblickend hätten wir besser mit dem unbekannten Teil begonnen, da wir hier mehr Unterstützung brauchten, die gegen Ende des Projekts nur noch begrenzt verfügbar war.

## Mitwirkende

- Julia Moos
- Elena Häfliger
- Credits: Beni

