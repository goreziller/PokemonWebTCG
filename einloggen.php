<?php
        session_start();

        $pdo = new PDO('mysql:host=localhost;dbname=spieler', 'root', '');

        $EnteredPW = $_POST["pw"];
        $EnteredBenutzer = $_POST["name"];

        $select = "Select * From benutzer where BenutzerName = '$EnteredBenutzer'";
        foreach($pdo->query($select) as $row)
        {
            $Benutzer = $row['BenutzerName'];
            $_SESSION["vorname"] = $Vorname = $row['Vorname'];
            $_SESSION["nachname"] = $row['Nachname'];
            $Geburtstag = $row['Geburtstag'];
            $Email = $row['Email'];
            $Passwort = $row['Passwort'];
        }

        if(password_verify($EnteredPW, $Passwort) && $EnteredBenutzer == $Benutzer)
        {
            header('Location: main.php');
        }
?>