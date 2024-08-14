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
        if (!rows) {
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
    } finally {
        loadingElement.classList.add('hidden');
    }
}

function searchClient() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('results');
    const loadingElement = document.getElementById('loading');

    resultsContainer.innerHTML = '';
    
    if (searchInput) {
        loadingElement.classList.remove('hidden');

        setTimeout(() => {
            const results = CLIENT_DATA.filter(client => 
                client.name.toLowerCase().includes(searchInput) ||
                client.regCode.toLowerCase().includes(searchInput) ||
                client.fatherName.toLowerCase().includes(searchInput)
            ).sort((a, b) => new Date(a.date) - new Date(b.date)); // Changed sorting order

            if (results.length > 0) {
                const table = document.createElement('table');
                table.classList.add('glass-effect');
                table.innerHTML = `<tr>
                    <th>Date</th>
                    <th>Reg. Code</th>
                    <th>Risk</th>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone No.</th>
                    <th>Address</th>
                </tr>`;
                results.forEach((result, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${result.date}</td>
                                     <td>${result.regCode}</td>
                                     <td>${result.risk}</td>
                                     <td>${result.name}</td>
                                     <td>${result.fatherName}</td>
                                     <td>${result.age}</td>
                                     <td>${result.gender}</td>
                                     <td>${result.phoneNo}</td>
                                     <td>${result.address}</td>`;
                    row.style.opacity = '0';
                    row.style.transform = 'translateY(20px)';
                    table.appendChild(row);
                    setTimeout(() => {
                        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        row.style.opacity = '1';
                        row.style.transform = 'translateY(0)';
                    }, 50 * index);
                });
                resultsContainer.appendChild(table);
            } else {
                resultsContainer.innerHTML = '<p>No results found</p>';
            }
            loadingElement.classList.add('hidden');
        }, 500);
    } else {
        resultsContainer.innerHTML = '<p>Please enter a client name, reg code, or father\'s name</p>';
    }
}

document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchClient();
    }
});

window.addEventListener('load', loadClientData);
