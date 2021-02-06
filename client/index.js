// const { json } = require("body-parser");

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
        .then(res => res.json())
        .then(data => {
            loadHTMLTable(data['data'])
        })
        .catch(e => {
            console.log(e.message);
        });
    loadHTMLTable([]);
});

document.querySelector('table tbody').addEventListener('click', function (event) {
    if (event.target.className === 'delete-row-btn') {
        deleteRowById(event.target.dataset.id)
    }
    if (event.target.className === 'edit-row-btn') {
        handleEditRow(event.target.dataset.id)
    }
});

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
        .catch(err => {
            console.log(err.message);
        })
}

//update One

const updateBtn = document.querySelector('#update-row-btn');
function handleEditRow(id) {
    const updateSection = document.querySelector('#update-section')
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}



updateBtn.onclick = function () {
    const updatenameInput = document.querySelector('#update-name-input');

    fetch('http://localhost:5000/update' , {
        
        headers: {
            'Content-type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
            id: updatenameInput.dataset.id,
            name: updatenameInput.value,
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
        // .catch(e => {
        //     console.log(e.message);
        // })
}

//Added data
const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input'); 
    const name = nameInput.value;
    nameInput.value = '';

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ name: name })
    })
        .then(res => res.json())
        .then(data => {
            insertRowIntoTable(data['data'])
        })
}
const insertRowIntoTable = (data) => {

    console.log(data);
    const table = document.querySelector('table tbody');

    const isTableData = table.querySelector('.no-data');

    let tableHTML = `<tr>`

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHTML += `<td>${data[key]}</td>`;

        }
    }

    tableHTML += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`;
    tableHTML += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`;

    tableHTML += `</tr>`

    if (isTableData) {
        table.innerHTML = tableHTML;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHTML;
    }
}

const loadHTMLTable = (data) => {

    const table = document.querySelector('table tbody');


    if (data.length === 0) {
        table.innerHTML = '<tr><td class="no-data" colspan="5"> No Data</td></tr>'
        return;
    }

    let tableHtml = '';
    data.forEach(function ({ id, name, date_added }) {
        tableHtml += `<tr>`;
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
        tableHtml += `</tr>`;
    });
    table.innerHTML = tableHtml;
}