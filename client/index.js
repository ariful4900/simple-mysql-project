// const { json } = require("body-parser");

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(e => {
            console.log(e.message);
        })

    loadHTMLTable([])
});

const loadHTMLTable = (data) => {

    const table = document.querySelector('table tbody');

    // let tableHTML = '';
    if (data.length === 0) {
        table.innerHTML = '<tr><td class="no-data" colspan="5"> No Data</td></tr>'
    } else {
        table.innerHTML = '<tr></tr>'
    }
}