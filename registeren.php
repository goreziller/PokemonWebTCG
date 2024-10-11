<?php
    session_start();

    $pdo = new PDO('mysql:host=localhost;dbname=spieler', 'root', '');

    $Befehl = $pdo->prepare("INSERT INTO benutzer (BenutzerName, Vorname, Nachname, Geburtstag, Email, Passwort) VALUES (?, ?, ?, ?, ?, ?)");
    
    $Benutzer = $_POST["benutzername"];
    $Vorname = $_POST["vorname"];
    $_SESSION["vorname"] = $Vorname;
    $Nachname = $_POST["nachname"];
    $_SESSION["nachname"] = $Nachname;
    $Geburtstag = $_POST['bday'];
    $Email = $_POST['email'];
    $Passwort = $_POST["pw"];
    $PasswortAgain = $_POST['pwagain'];

    if($Passwort == $PasswortAgain)
    {
        $Befehl->execute(array($Benutzer, $Vorname, $Nachname, $Geburtstag, $Email, password_hash($Passwort, PASSWORD_DEFAULT)));
        header('Location: main.php');
    }
?>