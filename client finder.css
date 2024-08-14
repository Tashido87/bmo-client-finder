@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

:root {
    --royal-green: #007046;
    --royal-green-dark: #005a38;
}

body {
    font-family: 'Roboto', Arial, sans-serif;
    background: linear-gradient(135deg, #f0f4f8, #e0e8f0);
    margin: 0;
    padding: 0;
    color: #333;
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

header {
    margin-bottom: 30px;
    text-align: center;
}

h1 {
    font-size: 2.5em;
    color: var(--royal-green);
    font-weight: 700;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    transition: color 0.3s ease;
}

h1:hover {
    color: var(--royal-green-dark);
}

.search-box {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}

#search-input {
    width: 60%;
    max-width: 500px;
    padding: 12px;
    font-size: 1em;
    border: 2px solid var(--royal-green);
    border-radius: 25px 0 0 25px;
    outline: none;
    transition: all 0.3s ease;
}

#search-input:focus {
    border-color: var(--royal-green-dark);
    box-shadow: 0 0 5px rgba(0,112,70,0.5);
}

#search-button {
    padding: 12px 20px;
    font-size: 1em;
    color: white;
    background-color: var(--royal-green);
    border: none;
    border-radius: 0 25px 25px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#search-button:hover {
    background-color: var(--royal-green-dark);
}

#results {
    margin-top: 30px;
    overflow-x: auto;
}

.glass-effect {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 20px;
    overflow: hidden;
}

.glass-effect th, .glass-effect td {
    padding: 15px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-effect th {
    background-color: rgba(0, 112, 70, 0.8);
    color: white;
    text-transform: uppercase;
}

.glass-effect tr:last-child td {
    border-bottom: none;
}

.glass-effect tr {
    transition: background-color 0.2s ease;
}

.glass-effect tr:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
}

.spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid var(--royal-green);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

@media (max-width: 768px) {
    .search-box {
        flex-direction: column;
        align-items: center;
    }

    #search-input, #search-button {
        width: 80%;
        max-width: none;
        border-radius: 25px;
        margin-bottom: 10px;
    }

    .glass-effect {
        font-size: 12px;
    }

    .glass-effect th, .glass-effect td {
        padding: 10px;
    }
}
