const SHEET_ID = '1n29YN1v7NIfxXxKOt-Z9KcrKNhW4arRIfk4FQ95gszY';
const API_KEY = 'AIzaSyA8yYBkrljsFSdswq9T7cdAyq_hqC5nxbY';
const RANGE = 'Bhamo KPSC Client List!A:I';

let CLIENT_DATA = [];

async function loadClientData() {
    const loadingElement = document.getElementById('loading');
    loadingElement.classList.remove('hidden');

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
        console.log("Client data initialized:", CLIENT_DATA);
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        CLIENT_DATA = [];
        alert("Error loading client data. Please try again later.");
    } finally {
        loadingElement.classList.add('hidden');
    }
}

function searchClient() {
    const regCodeInput = document.getElementById('reg-code-input').value.trim();
    const clientNameInput = document.getElementById('client-name-input').value.trim();
    const fatherNameInput = document.getElementById('father-name-input').value.trim();
    const resultsContainer = document.getElementById('results');
    const loadingElement = document.getElementById('loading');

    resultsContainer.innerHTML = '';
    resultsContainer.classList.remove('show');
    loadingElement.classList.remove('hidden');

    // Check if all inputs are empty
    if (!regCodeInput && !clientNameInput && !fatherNameInput) {
        loadingElement.classList.add('hidden');
        resultsContainer.innerHTML = '<p class="error-message"><i class="fas fa-exclamation-circle"></i> Please enter at least one search criteria (Registration Code, Client Name, or Father\'s Name).</p>';
        setTimeout(() => resultsContainer.classList.add('show'), 10);
        return;
    }

    const results = CLIENT_DATA.filter(client => {
        const regCodeMatch = regCodeInput && client.regCode.toLowerCase().includes(regCodeInput.toLowerCase());
        const nameMatch = clientNameInput && client.name.toLowerCase().includes(clientNameInput.toLowerCase());
        const fatherNameMatch = fatherNameInput && client.fatherName.toLowerCase().includes(fatherNameInput.toLowerCase());
        
        return (regCodeInput ? regCodeMatch : true) &&
               (clientNameInput ? nameMatch : true) &&
               (fatherNameInput ? fatherNameMatch : true);
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    if (results.length > 0) {
        const table = document.createElement('table');
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
            </tbody>
        `;
        const tbody = table.querySelector('tbody');
        results.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.date}</td>
                <td>${result.regCode}</td>
                <td>${result.risk}</td>
                <td>${result.name}</td>
                <td>${result.fatherName}</td>
                <td>${result.age}</td>
                <td>${result.gender}</td>
                <td>${result.phoneNo}</td>
                <td>${result.address}</td>
            `;
            tbody.appendChild(row);
        });
        resultsContainer.appendChild(table);
    } else {
        resultsContainer.innerHTML = '<p class="no-results"><i class="fas fa-search"></i> No results found</p>';
    }
    
    loadingElement.classList.add('hidden');
    setTimeout(() => resultsContainer.classList.add('show'), 10);
}

function clearInputs() {
    document.getElementById('reg-code-input').value = '';
    document.getElementById('client-name-input').value = '';
    document.getElementById('father-name-input').value = '';
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    resultsContainer.classList.remove('show');
}

function handleEnterKey(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchClient();
    }
}

function addEventListeners() {
    document.getElementById('reg-code-input').addEventListener('keypress', handleEnterKey);
    document.getElementById('client-name-input').addEventListener('keypress', handleEnterKey);
    document.getElementById('father-name-input').addEventListener('keypress', handleEnterKey);
    document.getElementById('search-button').addEventListener('click', searchClient);
    document.getElementById('clear-button').addEventListener('click', clearInputs);
}

window.addEventListener('load', () => {
    loadClientData();
    addEventListeners();
});
