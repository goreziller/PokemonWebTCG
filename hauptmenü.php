<?php
    session_start();

    $Coins = $_SESSION["coins"];

    function name()
    {
        echo $_SESSION['vorname'] . " " . $_SESSION["nachname"]. " " . "<img src='./bilder/coinIcon.png' height='40'/>" . " " . $_SESSION['coins'];
    }

    if(array_key_exists('folder', $_POST)) 
    {
        openfolder();
    }
    else if(array_key_exists('openpacks', $_POST)) 
    {
        if($Coins >= 100)
        {
            $Coins -= 100;
            updateCoinsInDatabase($Coins);
            openpacks();
        }
        else
        {
            header('Location: main.php');
        }
    }
    else if(array_key_exists('openshop', $_POST))
    {
        openshop();
    }
    else if(array_key_exists('logout', $_POST))
    {
        logout();
    }

    function openfolder() 
    {
        header('Location: cardfolder.php');
    }

    function openpacks() 
    {
        header('Location: packs.php');
    }

    function openshop()
    {
        header('Location: shop.php');
    }

    function logout()
    {
        session_destroy();
        header('Location: index.php');
    }

    function updateCoinsInDatabase($newCoins)
    {
        $servername = "localhost"; 
        $username = "root";
        $password = ""; 
        $dbname = "spieler"; 

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) 
        {
            die("Connection failed: " . $conn->connect_error);
        }

        $userId = $_SESSION['user-id'];
        $sql = "UPDATE benutzer SET Coins = ? WHERE id = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $newCoins, $userId);

        if ($stmt->execute()) 
        {
            $_SESSION['coins'] = $newCoins;
        } 
        else 
        {
            echo "Error updating record: " . $conn->error;
        }

        $stmt->close();
        $conn->close();
    }
?>