const adduserbtn = document.getElementById('add-user');
const dblmoneybtn = document.getElementById('double');
const showmillionairesbtn = document.getElementById('show-millionaires');
const sortbtn = document.getElementById('sort');
const totalbtn = document.getElementById('calculate-wealth');
const mainbtn = document.getElementById('main');


let data = [];
//getRandomUser
async function getRandomUser() {
    const url = 'https://randomuser.me/api';
    let res = await fetch(url);
    let data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        wealth: Math.floor(Math.random() * 1000000)
    }
    addNewUser(newUser);
    // console.log("hey");
}

getRandomUser();
getRandomUser();
getRandomUser();

//addUser to DOM
function addNewUser(obj) {
    data.push(obj);
    updateDOM();
}
//double the money
function dblMoney() {
    data.map(el => el.wealth = el.wealth * 2);
    updateDOM();
}
//show the milliionaires
function showMillionaires() {
    data = data.filter(el => el.wealth > 1000000);
    updateDOM();
}
//sort by the richest
function sortByAmount() {
    data.sort((e, f) => f.wealth - e.wealth);
    updateDOM();
}
//calculate entire wealth
function totalAmount() {
    const wealth = data.reduce((acc, el) => acc += el.wealth, 0);
    //update total money
    const main = document.getElementById('main');
    const div = document.createElement('div');
    div.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)} </strong></h3>`
    main.appendChild(div);
}
//update DOM
function updateDOM(providedData = data) {
    //clear main content
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
    //traverse data array of objects and populate dom
    providedData.forEach(el => {
        const div = document.createElement('div');
        div.classList.add('person');
        div.innerHTML = `<strong>${el.name}</strong> ${formatMoney(el.wealth)}`;
        main.appendChild(div);
    });
}

//format money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
// Event listeners
adduserbtn.addEventListener('click', getRandomUser);
dblmoneybtn.addEventListener('click', dblMoney);
sortbtn.addEventListener('click', sortByAmount);
showmillionairesbtn.addEventListener('click', showMillionaires);
totalbtn.addEventListener('click', totalAmount);