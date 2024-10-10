<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="degisn_registerung.css">
    <title>Registerung</title>
</head>
<body>
    <div class="container">
        <form action="registeren.php">
            <h2>Registerung</h2>
            <input type="text" name="benutzername" placeholder="benutzername">
            <input type="text" name="vorname" placeholder="Vorname">
            <input type="text" name="nachname" placeholder="Nachname">
            <input type="date" name="bday" placeholder="Geburtstag">
            <input type="text" name="email" placeholder="email">
            <input type="text" name="Straße" placeholder="Straße">
            <input type="text" name="Hausnummer" placeholder="Hausnummer">
            <input type="text" name="Ort" placeholder="Ort">
            <input type="text" name="plz" placeholder="Postleitzahl">
            <input type="passwort" name="pw" placeholder="Passwort">
            <input type="passwort" name="pwagain" placeholder="Passwort bestätigen">
            <div class="button-group">
                <input type="submit" value="Registrieren">
            </div>
        </form>
    </div>
</body>
</html>