<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/design_index.css">
    <script src="./js/registerungsscript.js"></script>
    <title>Pokemon TCG</title>
</head>
<body>
    <h1>Pokemon Sammelkartenspiel</h1> <br>
    <div class="container">
        <form action="einloggen.php" method="POST">
            <h2>Anmeldung</h2>
            <input type="text" name="name" placeholder="Benutzername" required>
            <div class="password-container">
                <input type="password" id="passwordConfirm" name="pw" placeholder="Passwort" required>
                <span class="toggle-password" onclick="togglePassword('passwordConfirm')">👁️</span>
            </div>
            <div class="button-group">
                <input type="submit" value="Anmelden">
            </div>
            <p>Noch kein Konto? Dann hier <a href="registerung.php">Registrieren</a></p>
        </form>
    </div>
</body>
</html>