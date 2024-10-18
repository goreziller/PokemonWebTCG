<?php
    session_start();

    $_SESSION["genstart"];
    $_SESSION["genend"];


    if(array_key_exists('gen1', $_POST)) 
    {
        $_SESSION["genstart"] = 1;
        $_SESSION["genend"] = 151;
        openmarket();
    }
    else if(array_key_exists('gen2', $_POST)) 
    {
        
        openmarket();
    }
    else if(array_key_exists('gen3', $_POST))
    {
        
        openmarket();
    }
    else if(array_key_exists('gen4', $_POST))
    {
        
        openmarket();
    }
    else if(array_key_exists('gen5', $_POST))
    {
        
        openmarket();
    }
    else if(array_key_exists('gen6', $_POST))
    {
        
        openmarket();
    }
    else if(array_key_exists('gen7', $_POST))
    {
        
        openmarket();
    }
    else if(array_key_exists('gen8', $_POST))
    {
        
        openmarket();
    }
    else if(array_key_exists('gen9', $_POST))
    {
       
        openmarket();
    }

    function openmarket() 
    {
        header('Location: market.php');
    }
?>