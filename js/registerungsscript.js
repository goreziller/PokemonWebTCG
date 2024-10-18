function togglePassword(id) 
{
    const passwordField = document.getElementById(id);
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
}