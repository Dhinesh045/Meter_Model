// Sample data
const meterModels = [
    {
        modelName: 'Neptune ICF',
        manufacturer: 'Neptune',
        description: '1 CF Converted from 8 Digits',
        multiplier: 1,
        rolloverReading: 0,
        numberOfDials: 6
    },
    {
        modelName: 'Insider',
        manufacturer: 'AMCO',
        description: '',
        multiplier: 7.48052,
        rolloverReading: 0,
        numberOfDials: 2
    },
    {
        modelName: 'Hersey CF',
        manufacturer: 'Hersey',
        description: 'CF',
        multiplier: 748.052,
        rolloverReading: 0,
        numberOfDials: 1
    },
    {
        modelName: 'Badger CF',
        manufacturer: 'Badger',
        description: 'CF',
        multiplier: 13.3681,
        rolloverReading: 0,
        numberOfDials: 4
    },
    {
        modelName: 'SimpleSub',
        manufacturer: 'SimpleSub',
        description: 'Smart Meter',
        multiplier: 0.133681,
        rolloverReading: 0,
        numberOfDials: 0
    }
];

// Get DOM elements
const modal = document.getElementById('meterModal');
const tableBody = document.getElementById('meterTableBody');
const pageInfo = document.getElementById('pageInfo');
let currentPage = 1;
let rowsPerPage = 5;

// Show table data
const showData = () => {
    tableBody.innerHTML = '';
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    
    meterModels.slice(start, end).forEach(model => {
        tableBody.innerHTML += `
            <tr>
                <td>${model.modelName}</td>
                <td>${model.manufacturer}</td>
                <td>${model.description}</td>
                <td>${model.multiplier}</td>
                <td>${model.rolloverReading}</td>
                <td>${model.numberOfDials}</td>
            </tr>
        `;
    });

    // Update page info
    const totalPages = Math.ceil(meterModels.length / rowsPerPage);
    pageInfo.textContent = `${start + 1}-${Math.min(end, meterModels.length)} of ${meterModels.length}`;
    
    // Enable/disable pagination buttons
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
};

// Event Listeners using arrow functions
document.getElementById('addNewBtn').addEventListener('click', () => {
    document.getElementById('meterForm').reset();
    modal.style.display = 'block';
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    modal.style.display = 'none';
});

document.getElementById('meterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const newModel = {
        modelName: document.getElementById('modelName').value,
        manufacturer: document.getElementById('manufacturer').value,
        description: document.getElementById('description').value,
        multiplier: parseFloat(document.getElementById('multiplier').value),
        rolloverReading: parseInt(document.getElementById('rolloverReading').value),
        numberOfDials: parseInt(document.getElementById('numberOfDials').value)
    };

    // Add new model and update display
    meterModels.push(newModel);
    modal.style.display = 'none';
    showData();
});

// Pagination event listeners
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showData();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(meterModels.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showData();
    }
});

document.getElementById('rowsPerPage').addEventListener('change', (e) => {
    rowsPerPage = parseInt(e.target.value);
    currentPage = 1;
    showData();
});

// Initialize table
showData();