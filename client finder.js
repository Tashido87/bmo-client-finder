@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

:root {
    --primary-color: #007046;
    --primary-color-dark: #005a38;
    --text-color: #333;
    --background-color: #f0f4f8;
    --accent-color: #888;
    --light-bg: rgba(255, 255, 255, 0.9);
    --border-radius: 12px;
    --shadow-color: rgba(31, 38, 135, 0.2);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Roboto', Arial, sans-serif;
    background: linear-gradient(135deg, #f0f4f8, #e0e8f0);
    color: var(--text-color);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.container {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-box {
    background: var(--light-bg);
    box-shadow: 0 8px 32px var(--shadow-color);
    border-radius: var(--border-radius);
    padding: 30px;
    margin-bottom: 30px;
    width: 100%;
    max-width: 1000px;
}

h1 {
    font-size: 2em;
    color: var(--primary-color);
    margin-bottom: 20px;
    text-align: center;
}

.search-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.search-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.search-input {
    flex: 1;
    min-width: 200px;
}

label {
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
    color: var(--primary-color);
}

input {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    border: 2px solid var(--primary-color);
    border-radius: var(--border-radius);
    outline: none;
    transition: all 0.3s ease;
}

input:focus {
    box-shadow: 0 0 10px rgba(0,112,70,0.5);
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
}

button {
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
    transform: scale(1.05);
}

#search-button {
    background-color: var(--primary-color);
}

#clear-button {
    background-color: var(--accent-color);
}

#search-button:hover {
    background-color: var(--primary-color-dark);
}

#clear-button:hover {
    background-color: #666;
}

.results-container {
    width: 100%;
    max-width: 1200px;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    overflow: hidden;
}

th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

th {
    background-color: rgba(0, 112, 70, 0.8);
    color: white;
}

tr:hover {
    background-color: rgba(255, 255, 255, 0.2);
}



.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.spinner {
    border: 4px solid rgba(0, 112, 70, 0.3);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

.hidden {
    display: none;
}

footer {
    text-align: center;
    padding: 20px;
    font-size: 0.9em;
    color: var(--text-color);
    background-color: var(--light-bg);
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

@media (max-width: 1024px) {
    .search-row {
        flex-wrap: wrap;
    }
    
    .search-box, .button-group {
        flex: 0 0 calc(50% - 10px);
    }
}

@media (max-width: 768px) {
    .search-box, .button-group {
        flex: 0 0 100%;
    }
}

