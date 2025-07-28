Hier ist ein vollständiges Product Requirements Document (PRD) für deine App zur Umrechnung von Zahlensystemen als Progressive Web App (PWA):

⸻

📘 PRD: Zahlensystem-Umrechner App (PWA)

1. Ziel des Projekts

Entwicklung einer einfachen Web-App, welche Zahlen interaktiv zwischen den Zahlensystemen Binär, Oktal, Dezimal und Hexadezimal umrechnet. Die App soll benutzerfreundlich, übersichtlich und als Progressive Web App (PWA) über GitHub Pages verfügbar sein.

⸻

2. Zielgruppe
	•	Lernende und Lehrpersonen im Bereich Informatik
	•	Interessierte Nutzer:innen, die Zahlensysteme verstehen und umrechnen möchten

⸻

3. Funktionale Anforderungen

3.1. Benutzereingaben
	•	Eingabefelder für jede der vier Zahlensysteme:
	•	Binär (Basis 2)
	•	Oktal (Basis 8)
	•	Dezimal (Basis 10)
	•	Hexadezimal (Basis 16)
	•	Es kann jeweils eine Zahl pro Zahlensystem eingegeben werden.
	•	Nur ein Eingabefeld darf aktiv sein – das System erkennt automatisch, welches zuletzt bearbeitet wurde.

3.2. Ausgabe
	•	Die jeweilige Eingabe wird in die drei anderen Zahlensysteme umgerechnet.
	•	Die Darstellung erfolgt nebeneinander, jede Ziffer in einer eigenen Spalte, die Spalten liegen untereiander (Stellenwertdarstellung).
	•	Nur relevante Stellen/Ziffern werden angezeigt (kein führendes Padding).

3.3. Buttons
	•	🔄 Convert (Umrechnen) – Führt die Umrechnung aus.
	•	♻️ Reset – Leert alle Felder und Rückgaben.
	•	➕ +1 – Addiert 1 zur aktuellen Zahl (unabhängig vom aktiven Feld).
	•	➖ –1 – Subtrahiert 1 von der aktuellen Zahl (Minimum: 0).

3.4. Zahlensysteme ein-/ausblenden
	•	Checkboxen oder Switches, mit denen die Anzeige der Zahlensysteme individuell aktiviert oder deaktiviert werden kann.
	•	Z. B.: Nur Dezimal und Hexadezimal anzeigen.

⸻

4. Nicht-funktionale Anforderungen
	•	Responsives Layout mit Bootstrap (Mobile First).
	•	Progressive Web App (PWA):
	•	Offline-Nutzung möglich
	•	Installierbar auf Mobilgeräten
	•	Manifest-Datei mit App-Namen, Icon, etc.
	•	Hosting auf GitHub Pages
	•	Barrierearme Gestaltung (hoher Kontrast, Tastaturbedienbarkeit)

⸻

5. Technischer Stack

Komponente	Technologie
Markup	HTML5
Styling	Bootstrap (CDN)
Logik	Vanilla JavaScript
Hosting	GitHub Pages
PWA	Manifest + Service Worker


⸻

6. Benutzeroberfläche (UI Skizze)

-------------------------------------------------
| Zahlensysteme anzeigen: [✓] Binär [✓] Oktal [✓] Dezimal [✓] Hex |
-------------------------------------------------
| Binär:         | Eingabefeld              |
|                | [1][1][1][1]             |
-------------------------------------------------
| Oktal:         | [1][7]                   |
-------------------------------------------------
| Dezimal:       | [1][5]                   |
-------------------------------------------------
| Hexadezimal:   | [F]                      |
-------------------------------------------------
| [Convert] [Reset] [+1] [-1]               |
-------------------------------------------------


⸻

7. Validierungen
	•	Eingaben werden sofort auf Gültigkeit geprüft:
	•	Binär: nur 0 und 1
	•	Oktal: nur Ziffern 0–7
	•	Dezimal: nur Ziffern 0–9
	•	Hexadezimal: nur 0–9 und A–F
	•	Ungültige Eingaben werden durch UI (z. B. roter Rand, Tooltip) zurückgewiesen.

⸻

8. Erweiterungsmöglichkeiten (nicht Teil des MVP)
	•	Dark Mode
	•	Historie der Umrechnungen
	•	Visualisierung der Stellenwerte (Tooltip mit Potenzwerten)
	•	Unterstützung negativer Zahlen (Zweierkomplement)

⸻

Wenn du möchtest, kann ich dir daraus auch ein GitHub-kompatibles Markdown-File (README.md oder prd.md) generieren oder direkt den Code zur Umsetzung erstellen. Sag einfach Bescheid.
