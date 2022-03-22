const main= document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// getRandomUser();
// getRandomUser();
// getRandomUser();

// Fetching random user and money
async function getRandomUser() 
{
    const res= await fetch('https://randomuser.me/api');
    const data= await res.json();
    
    const user = data.results[0];

    const newUser = {
            name: `${user.name.first} ${user.name.last}`, // template dynamic
            money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);   
}

//double  money
function doubleMoney() {
    data=data.map(user => { 
        return {...user, money: user.money * 2};
    });

updateDOM();
}


// FILTER only millioanires
function showMillionaires() {
    data= data.filter(user => user.money > 1000000);

    updateDOM();
}
// sortING users by richest
function sortByRichest() {
    data.sort((a,b) => b.money-a.money);

    updateDOM();
}

//calculate welathing using reduce()

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3><strong>Total Wealth:</strong><strong> ${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);

}
//Add new obj to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// updating DOM
function updateDOM(providedData = data) {
        //clear main div 
    main.innerHTML ='<h2><strong>Person</strong><strong>Wealth</strong></h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML= `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        
        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // teo decimal places like 12345.67 => 12,345.67

}


// Event listeners

addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionairesBtn.addEventListener('click',showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);


