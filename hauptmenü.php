<?php
    session_start();

    function name()
    {
        echo $_SESSION['vorname'] . " " .$Nachname = $_SESSION["nachname"];;
    }

    if(array_key_exists('folder', $_POST)) 
    {
        openfolder();
    }
    else if(array_key_exists('openpacks', $_POST)) 
    {
        openpacks();
    }
    else if(array_key_exists('openshop', $_POST))
    {
        openshop();
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
?>