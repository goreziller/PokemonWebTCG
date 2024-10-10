<?php
    $pdo = new PDO('mysql:host=localhost;dbname=spieler', 'root', '');

    $Befehl = $pdo->prepare("INSERT INTO spieler (BenutzerName, Vorname, Nachname, Passwort) VALUES (?, ?, ?, ?)");
    
    $Benutzer = $_POST["benutzername"];
    $Vorname = $_POST["vorname"];
    $Nachname = $_POST["nachname"];
    $Geburtstag = $_POST['bday'];
    $Email = $_POST['email'];
    $Straße = $_POST['Straße'];
    $Hausnummer = $_POST['Hausnummer'];
    $Ort = $_POST['Ort'];
    $Plz = $_POST['plz'];
    $Passwort = $_POST["pw"];
    $PasswortAgain = $_POST['pwagain'];

    $Befehl->execute(array($Benutzer, $Vorname, $Nachname, $Passwort));
?>