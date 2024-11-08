function validateLoginForm() {
    // Get the form input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');

    // Clear any previous error message
    errorMessage.innerHTML = '';

    // Validate input (check if both fields are filled)
    if (username === "" || password === "") {
        errorMessage.innerHTML = "Both fields are required!";
        errorMessage.style.color = "red"; // Make the error message red
        return false; // Prevent form submission
    }

    // Array of users with their credentials (username and password)
    var users = [
        { username: "puru", password: "2237436" },
        { username: "kunu", password: "2237402" },
        { username: "nishi", password: "2237418" }
    ];

    // Check if the entered username and password match any user in the array
    var userFound = false;

    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            // If a match is found, redirect to a different page (e.g., dashboard)
            window.location.href = "index.html";  // Change this to the page you want to redirect to
            userFound = true;
            break;
        }
    }

    // If no match is found, display an error message
    if (!userFound) {
        errorMessage.innerHTML = "Invalid username or password!";
        errorMessage.style.color = "red"; // Display the error message in red
        return false; // Prevent form submission
    }

    return false; // Prevent form submission (the redirect already happens)
}
