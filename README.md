# Digitaler Adventskalender für meine Freundin

Dieses Projekt ist ein romantischer, statischer Adventskalender für GitHub Pages. Es ist bewusst einfach aufgebaut: Inhalte und Einstellungen werden in `localStorage` gespeichert, zusätzlich liefert `content.json` eine leicht bearbeitbare Grundlage für spätere Änderungen.

## Schnellstart

1. Öffne die Datei `index.html` in einem Browser oder starte einen kleinen lokalen Server:
   ```bash
   cd "C:\Users\.....\.....\........"
   python -m http.server 8000
   ```
2. Öffne `http://localhost:8000/`.


## GitHub Pages veröffentlichen

1. Lade alle Dateien in ein GitHub-Repository hoch.
2. Gehe in GitHub zu: `Settings > Pages`.
3. Wähle als Source den Branch `main` (oder `master`) und den Ordner `/root`.
4. Speichere die Einstellung. GitHub erstellt dann die Live-URL.
5. Dein Link kann anschließend z. B. so aussehen: `https://dein-username.github.io/dein-repository/`

## Inhalte anpassen und auf Handy/PC teilen

1. Öffne `/admin.html` und bearbeite den Kalender.
2. Klicke nach dem Speichern auf **JSON exportieren**. Die Datei heißt `content.json`.
3. Öffne das GitHub-Repository und lade diese Datei hoch, wobei du die vorhandene `content.json` ersetzt.
4. Bestätige den Commit. Nach der Veröffentlichung lädt die Seite die neueste Version auf jedem Gerät.
5. Lade die Kalenderseite auf dem Handy neu. Falls sie noch die alte Version zeigt, warte kurz und lade erneut.

Die Admin-Seite speichert Änderungen zunächst nur im Browser des Geräts. Der Export und das Ersetzen von `content.json` auf GitHub ist der notwendige Schritt, damit sie auch auf anderen Geräten verfügbar sind.

Die Geräte übernehmen eine neuere GitHub-Version automatisch beim nächsten Laden. Lokale Admin-Änderungen bleiben auf dem bearbeitenden Gerät erhalten, bis sie ebenfalls durch eine neuere exportierte GitHub-Version ersetzt werden.

## Wichtige Dateien

- `index.html` – Login-Seite und Hauptansicht
- `admin.html` – Admin-Bereich
- `styles.css` – Design, Snow-Effects, Glassmorphism, responsives Layout
- `app.js` – Logik für Login, Countdown, Türchen und Adminfunktionen
- `content.json` – Basisdaten für den Kalender, leicht anpassbar

## Hintergrundbilder und Weihnachtsdekoration

Im Admin-Bereich gibt es jetzt Felder für:

- Hintergrundbilder per URL
- eigenen Santa-Spruch, zum Beispiel `Hallo Anja`

Die Bilder werden als kleine Foto-Collage im Hintergrund angezeigt. Die Animation mit Schnee, Tannenbäumen, Lichtern und dem Santa mit Schlitten läuft automatisch im Design mit.

## Hinweise

- `localStorage` ist nur im jeweiligen Browser verfügbar.
- GitHub Pages synchronisiert Admin-Änderungen nicht automatisch; das Ersetzen der `content.json` veröffentlicht sie für alle Geräte.
- Die Inhalte sind bewusst einfach strukturiert und gut zu erweitern.
