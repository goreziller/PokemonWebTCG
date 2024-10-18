<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/design_registerung.css">
    <script src="./js/registerungsscript.js"></script>
    <title>Registerung</title>
</head>
<body>
    <div class="container">
        <form action="registeren.php" method="POST">
            <h2>Registrierung</h2>
            <input type="text" name="benutzername" placeholder="Benutzername" required>
            <input type="text" name="vorname" placeholder="Vorname" required>
            <input type="text" name="nachname" placeholder="Nachname" required>
            <input type="date" name="bday" required>
            <input type="text" name="email" placeholder="E-Mail" required>
            <div class="password-container">
                <input type="password" id="password" name="pw" placeholder="Passwort" required>
                <span class="toggle-password" onclick="togglePassword('password')">👁️</span>
            </div>
            <div class="password-container">
                <input type="password" id="passwordConfirm" name="pwagain" placeholder="Passwort bestätigen" required>
                <span class="toggle-password" onclick="togglePassword('passwordConfirm')">👁️</span>
            </div>
            <div class="button-group">
                <input type="submit" value="Registrieren">
            </div>
        </form>
    </div>
</body>
</html>