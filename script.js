// Configuration
const SHEET_ID = '1n29YN1v7NIfxXxKOt-Z9KcrKNhW4arRIfk4FQ95gszY';
const API_KEY = 'AIzaSyA8yYBkrljsFSdswq9T7cdAyq_hqC5nxbY';
const RANGE = 'Bhamo KPSC Client List!A:I';

let CLIENT_DATA = [];
let isLoading = false;

// DOM Elements
const loginOverlay = document.getElementById('login-overlay');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');
const loadingElement = document.getElementById('loading');
const resultsContainer = document.getElementById('results');
const backgroundUploader = document.getElementById('background-uploader');
const backgroundUploadBtn = document.getElementById('background-upload-btn');
const backgroundResetBtn = document.getElementById('background-reset-btn');

// Authentication
const CREDENTIALS = {
    username: 'admin',
    password: 'password123'
};

function handleLogin(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        loginOverlay.classList.remove('show');
        document.querySelector('.page-transition').classList.add('loaded');
        loadClientData();
    } else {
        showMessage('Incorrect username or password', 'error');
    }
}

function checkLoginStatus() {
    const container = document.querySelector('.page-transition');
    if (loginOverlay.classList.contains('show')) {
        container.classList.remove('loaded');
    } else {
        container.classList.add('loaded');
    }
}

// Data Loading
async function loadClientData() {
    if (isLoading) return;
    
    isLoading = true;
    showLoading(true);

    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const rows = data.values;
        
        if (!rows || rows.length === 0) {
            throw new Error("No data found in the specified range");
        }
        
        CLIENT_DATA = rows.slice(1).map(row => ({
            date: row[0] || '',
            regCode: row[1] || '',
            risk: row[2] || '',
            name: row[3] || '',
            fatherName: row[4] || '',
            age: row[5] || '',
            gender: row[6] || '',
            phoneNo: row[7] || '',
            address: row[8] || ''
        }));
        
        console.log("Client data loaded:", CLIENT_DATA);
        
    } catch (error) {
        console.error("Error fetching data:", error);
        showMessage("Error loading client data. Please try again later.", 'error');
        CLIENT_DATA = [];
    } finally {
        isLoading = false;
        showLoading(false);
    }
}

// Search Functionality
function searchClient() {
    const regCode = document.getElementById('reg-code-input').value.trim();
    const clientName = document.getElementById('client-name-input').value.trim();
    const fatherName = document.getElementById('father-name-input').value.trim();

    // Clear previous results
    resultsContainer.classList.remove('show');
    
    // Validate input
    if (!regCode && !clientName && !fatherName) {
        showMessage('Please enter at least one search criteria', 'error');
        return;
    }

    if (CLIENT_DATA.length === 0) {
        showMessage('No client data available. Please wait for data to load.', 'info');
        return;
    }

    showLoading(true);

    setTimeout(() => {
        const results = CLIENT_DATA.filter(client => {
            const regCodeMatch = regCode ? client.regCode.toLowerCase().includes(regCode.toLowerCase()) : true;
            const nameMatch = clientName ? client.name.toLowerCase().includes(clientName.toLowerCase()) : true;
            const fatherNameMatch = fatherName ? client.fatherName.toLowerCase().includes(fatherName.toLowerCase()) : true;
            
            return regCodeMatch && nameMatch && fatherNameMatch;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));

        showLoading(false);
        displayResults(results);
    }, 500);
}

function displayResults(results) {
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="message info"><i class="fas fa-search"></i> No results found</div>';
    } else {
        const table = document.createElement('table');
        table.className = 'results-table';
        
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Reg. Code</th>
                    <th>Risk</th>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone No.</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(result => `
                    <tr>
                        <td>${result.date}</td>
                        <td>${result.regCode}</td>
                        <td>${result.risk}</td>
                        <td>${result.name}</td>
                        <td>${result.fatherName}</td>
                        <td>${result.age}</td>
                        <td>${result.gender}</td>
                        <td>${result.phoneNo}</td>
                        <td>${result.address}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        
        resultsContainer.appendChild(table);
    }
    
    setTimeout(() => {
        resultsContainer.classList.add('show');
    }, 100);
}

function clearInputs() {
    document.getElementById('reg-code-input').value = '';
    document.getElementById('client-name-input').value = '';
    document.getElementById('father-name-input').value = '';
    resultsContainer.classList.remove('show');
    
    setTimeout(() => {
        resultsContainer.innerHTML = '';
    }, 300);
}

// Utility Functions
function showLoading(show) {
    if (show) {
        loadingElement.classList.remove('hidden');
        loadingElement.classList.add('show');
    } else {
        loadingElement.classList.remove('show');
        setTimeout(() => {
            loadingElement.classList.add('hidden');
        }, 200);
    }
}

function showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.innerHTML = `<i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i> ${message}`;
    
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(messageEl);
    resultsContainer.classList.add('show');
    
    setTimeout(() => {
        resultsContainer.classList.remove('show');
        setTimeout(() => {
            resultsContainer.innerHTML = '';
        }, 300);
    }, 3000);
}

// Background Management
function initializeBackgroundChanger() {
    backgroundUploadBtn.addEventListener('click', () => {
        backgroundUploader.click();
    });

    backgroundUploader.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                document.body.style.backgroundImage = `url(${imageUrl})`;
            };
            reader.readAsDataURL(file);
        }
    });

    backgroundResetBtn.addEventListener('click', () => {
        // UPDATE: This now removes any inline style, reverting to the default background in the CSS file.
        document.body.style.background = '';
        showMessage('Background reset to default.', 'info');
    });
}

// Event Listeners
function initializeEventListeners() {
    // Login events
    loginForm.addEventListener('submit', handleLogin);
    
    // Search events
    searchButton.addEventListener('click', searchClient);
    clearButton.addEventListener('click', clearInputs);
    
    // Enter key support
    const inputs = ['reg-code-input', 'client-name-input', 'father-name-input'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchClient();
            }
        });
    });
    
    // Password field enter key
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin(e);
        }
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeBackgroundChanger();
    checkLoginStatus();
    
    // Add smooth page load animation
    setTimeout(() => {
        if (!loginOverlay.classList.contains('show')) {
            document.querySelector('.page-transition').classList.add('loaded');
            loadClientData();
        }
    }, 100);
});
