// Handle login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'username': username,
            'password': password
        })
    });

    const result = await response.json();
    if (result.access_token) {
        localStorage.setItem('token', result.access_token);
        alert('Logged in successfully');
        toggleAuthState(true);
    } else {
        alert(result.detail || 'Login failed');
    }
});

// Handle logout
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    toggleAuthState(false);
});

// Access a protected route
document.getElementById('protectedButton').addEventListener('click', async function() {
    const token = localStorage.getItem('token');
    const response = await fetch('/auth/protected', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (response.status === 200) {
        alert(result.message);
    } else {
        alert(result.detail || 'Failed to access protected route');
    }
});

// Toggle UI based on authentication state
function toggleAuthState(isLoggedIn) {
    document.getElementById('loginForm').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('logoutButton').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('protectedButton').style.display = isLoggedIn ? 'block' : 'none';
}

// Check authentication state on page load
window.onload = function() {
    const token = localStorage.getItem('token');
    toggleAuthState(!!token);
};


 // Fetch and display chat history when the page loads
 async function fetchAndDisplayHistory() {
    const response = await fetch('/history');
    const history = await response.json();
    const responseLog = document.getElementById('responseLog');

    // Clear existing content
    responseLog.innerHTML = '';

    // Append each history entry to the response log
    history.forEach(entry => {
        const responseEntry = document.createElement('div');
        responseEntry.classList.add('response-entry');
        responseEntry.innerHTML = `
            <p><strong>Query:</strong> ${entry.query}</p>
            <p><strong>Response:</strong> ${entry.answer}</p>
        `;
        responseLog.appendChild(responseEntry);
    });

    // Scroll to the bottom of the response log
    responseLog.scrollTop = responseLog.scrollHeight;
}

// Fetch and display history on page load
window.onload = fetchAndDisplayHistory;

// Function to toggle folder input visibility
function toggleFolderPath() {
    const folderPathContainer = document.getElementById('folderPathContainer');
    if (folderPathContainer.style.display === 'none') {
        folderPathContainer.style.display = 'block';
    } else {
        folderPathContainer.style.display = 'none';
    }
}

// Handle folder ID submission
document.getElementById('folderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const folderId = document.getElementById('folderId').value;
    const response = await fetch('/set_folder/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'folder_id_input': folderId,
        })
    });

    const result = await response.json();
    alert(result.message);
    document.getElementById('folderId').value = '';
    document.getElementById('folderPathContainer').style.display = 'none';
});

// Handle query submission
// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("queryForm");
//     if (form) {
//         form.onsubmit = async function (event) {
//             event.preventDefault(); // Prevents page reload

//             const input = document.getElementById("queryInput").value;
//             if (!input) {
//                 alert("Please enter a query!");
//                 return;
//             }

//             const response = await fetch("http://127.0.0.1:8000/query", {  // Ensure FastAPI port is correct
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ query: input })  // "query" should match the FastAPI model
//             });
//             // const response = await fetch("http://127.0.0.1:8000/query", {
//             //     method: "POST",
//             //     headers: { "Content-Type": "application/json" },
//             //     body: JSON.stringify({ text: input }),
//             // });

//             const result = await response.json();
//             console.log("Server Response:", result);
//         };
//     } else {
//         console.error("Form not found!");
//     }
// });
document.getElementById('queryForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const query = document.getElementById('query').value;
    const response = await fetch('/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query })
    });
    const result = await response.json();
    document.getElementById('response').innerText = result.answer || result.detail;
});

// const query = document.getElementById('query').value.trim();

// if (!query) {
//     alert("Please enter a query before submitting.");
//     return;
// }
// body: JSON.stringify({ query })
// document.getElementById('queryForm').addEventListener('submit', async function(e) {
//     e.preventDefault();

//     const query = document.getElementById('query').value.trim();

//     if (!query) {
//         alert("Please enter a query before submitting.");
//         return;
//     }

//     try {
//         const response = await fetch('/query', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ query })
//         });

//         if (!response.ok) {
//             console.error('Failed to get a response from the server.');
//             const errorText = await response.text();
//             console.error('Error Details:', errorText);
//             alert('Server Error: ' + errorText);
//             return;
//         }

//         const result = await response.json();
//         document.getElementById('result').innerText = result.answer || 'No answer received';
//     } catch (error) {
//         console.error('Error sending query:', error);
//     }
// });


// document.getElementById('queryForm').addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const query = document.getElementById('query').value;
//     const response = await fetch('/query', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: query })
//     });

//     const result = await response.json();

    // Append the new query and response to the response log
    const responseLog = document.getElementById('responseLog');
    const responseEntry = document.createElement('div');
    responseEntry.classList.add('response-entry');
    responseEntry.innerHTML = `
        <p><strong>Query:</strong> ${query}</p>
        <p><strong>Response:</strong> ${result.answer || result.detail}</p>
    `;
    responseLog.appendChild(responseEntry);

    // Scroll to the bottom of the response log
    responseLog.scrollTop = responseLog.scrollHeight;

    // Clear the query input
    document.getElementById('query').value = '';
});