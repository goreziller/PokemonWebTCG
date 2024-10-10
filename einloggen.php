<?php
        $pdo = new PDO('mysql:host=localhost;dbname=spieler', 'root', '');

        $EnteredPW = $_POST["pw"];
        $EnteredBenutzer = $_POST["name"];

        $select = "Select * From spieler where BenutzerName = '$EnteredBenutzer'";
        foreach($pdo->query($select) as $row)
        {
            $Vorname = $row['Vorname'];
            $Nachname = $row['Nachname'];
            $Benutzer = $row['BenutzerName'];
            $Passwort = $row['Passwort'];
        }

        if($EnteredPW == $Passwort && $EnteredBenutzer == $Benutzer)
        {
            echo "Willkommen ". $Vorname . " " . $Nachname;
        }
?>