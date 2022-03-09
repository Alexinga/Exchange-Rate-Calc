'use strict';

const firstSelect = document.querySelector('.currency-1');
let firstInput = document.querySelector('#firstInput');
const secondSelect = document.querySelector('.currency-2');
let secondInput = document.querySelector('#secondInput');
const swapBtn = document.querySelector('.btn');
const rateTxt = document.querySelector('.rate');

function loadEventListener() {
    firstSelect.addEventListener('change', calculate);
    firstInput.addEventListener('input', calculate);
    secondSelect.addEventListener('change', calculate);
    secondInput.addEventListener('input', calculate);
    swapBtn.addEventListener('click', swapSelection);
}

function calculate() {
    let firstSelectValue = firstSelect.value;
    let secondSelectValue = secondSelect.value;
    const urlKey = `https://v6.exchangerate-api.com/v6/c26c6ecc9e96c6763c77485c/latest/${firstSelectValue}`;
    fetch(urlKey)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        const rate = data.conversion_rates[secondSelectValue];
        rateTxt.textContent = `1 ${firstSelectValue} = ${rate} ${secondSelectValue}`;
        secondInput.value = (firstInput.value * rate).toFixed(2);
    })
    .catch(err => console.log(err));
}

function swapSelection() {
    let temp = firstSelect.value;
    firstSelect.value = secondSelect.value;
    secondSelect.value = temp;
    calculate();
}
calculate()
loadEventListener();