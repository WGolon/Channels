import './styles/vendor.scss';
import axios from 'axios';
import updateUI from './UI_Controller.js';

const url = 'http://localhost:3000/';

let data = [];

let arrToDisplay = [];


const inputs = [...document.querySelectorAll('input.choice')];
const inputText = document.querySelector('.filter__input');
const labels = [...document.querySelectorAll('.choice__label')];
const clear = document.querySelector('.btn__clear');
const sort = document.querySelector('.btn__sort');



// Request
axios.get(`${url}api/data`)
    .then(response => {
        if(!response || !response.data) return
        const copied = JSON.parse(JSON.stringify(response.data));
        validateNumbers(copied);
        updateUI(data);
    })
    .catch(err => {
        console.log(err);
    })


const setRadioInputListeners = () => {
    labels.forEach(el=> {
        el.addEventListener('click', radioSorting)
    })
}

const validateNumbers = (copied) => {
    data = copied.map(el => {
        let {subscriberCount, videoCount, viewCount} = el.statistics;
        el.statistics.subscriberCount = subscriberCount.replace(/[ ,.]/g, "");
        el.statistics.videoCount = videoCount.replace(/[ ,.]/g, "");
        el.statistics.viewCount = viewCount.replace(/[ ,.]/g, "");
        return el;
    })
    arrToDisplay = JSON.parse(JSON.stringify(data));
}

const radioSorting = (e) => {
    const targeted = e.target.getAttribute('data');
    const desc = true;
    arrToDisplay = JSON.parse(JSON.stringify(data));
    sortBy(arrToDisplay, targeted);
}

const sortBy = (arr, sort) => {
    if(sort==='title') {
        arr.sort((a,b) => {
            return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        })
    }else {
        arr.sort((a,b) => {
            return +(a.statistics[sort]) < +(b.statistics[sort]) ? 1 : -1;
        });
    }
    filterBy();
}

const sortOrder = () => {
    if(!arrToDisplay[0]) return;
    arrToDisplay.reverse();
    filterBy();
}

setRadioInputListeners();

clear.addEventListener('click', () => {
    inputText.value = '';
    inputs.forEach( el => {
        el.checked = false;
    })
    arrToDisplay = [];
    updateUI(data);
})

const filterBy = (e) => {
    const filterKey = inputText.value.toLowerCase();
    if(!filterKey) updateUI(arrToDisplay);
    let filteredArr = arrToDisplay.filter( (el) => {
        return el.title.toLowerCase().includes(filterKey);
    })
    updateUI(filteredArr);
}

sort.addEventListener('click', sortOrder);
inputText.addEventListener('keyup', filterBy);

