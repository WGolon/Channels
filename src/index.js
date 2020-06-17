import './styles/vendor.scss';
import axios from 'axios';
import moment from 'moment';
import * as UIController from './UI_Controller.js';

moment.locale('pl');
const url = 'http://localhost:3000/';
let data = [];
let arrToDisplay = [];

// Selectors
const inputs = [...document.querySelectorAll('input.choice')];
const inputText = document.querySelector('.filter__input');
const labels = [...document.querySelectorAll('.choice__label')];
const clear = document.querySelector('.btn__clear');
const sort = document.querySelector('.btn__sort');
const filter = document.querySelector('.filter__suggestions');
const body = document.querySelector('body');
const theme = document.querySelector('.btn__theme');
const html = document.querySelector('html');

// Request
axios.get(`${url}api/data`)
    .then(response => {
        if(!response || !response.data) return
        const copied = JSON.parse(JSON.stringify(response.data));
        validateNumbers(copied);
        UIController.updateChannels(data);
    })
    .catch(err => {
        console.log(new Error(err));
    })

// Main logic
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

const radioSortingHandler = (e) => {
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

const filterBy = () => {
    const filterKey = inputText.value.toLowerCase();
    filter.innerHTML = '';
    if(!filterKey) {
        return UIController.updateChannels(arrToDisplay)
    };
    let suggestionMatches = [];
    let filteredArr = arrToDisplay.filter( (el) => {
        return el.title.toLowerCase().includes(filterKey);
    })
    suggestionMatches = filteredArr.map(el => {
        return el.title;
    })
    const suggestions = UIController.updateSuggestions(suggestionMatches);
    onSuggestionClick(suggestions);
    UIController.updateChannels(filteredArr);
}

function onSuggestionClick(suggestions) {
    suggestions.forEach( el => {
        el.addEventListener('click', (e) => {
            inputText.value =  e.target.textContent.trim();
            filterBy();
            filter.innerHTML = '';
        })
    })
    
}

//Event listeners
sort.addEventListener('click', sortOrder);
inputText.addEventListener('keyup', filterBy);
body.addEventListener('click', (e) => {
    if(e.target.parentNode !== filter) filter.innerHTML= '';
})
clear.addEventListener('click', () => {
    inputText.value = '';
    inputs.forEach( el => {
        el.checked = false;
    })
    arrToDisplay = JSON.parse(JSON.stringify(data));
    UIController.updateChannels(arrToDisplay);
})
labels.forEach(el=> {
    el.addEventListener('click', radioSortingHandler)
})
theme.addEventListener('click', () => {
    let color = theme.textContent === 'White' ? 'Black': 'White';
    theme.textContent = color;
    html.setAttribute('data-theme', color)
})

//Local Storage Handler

function localStorageHandler () {
    let visitData = JSON.parse(localStorage.getItem('visitData'));
    const date = moment().format('ll');
    if(visitData) {
        visitData.lastVisit = visitData.currentVisit;
        visitData.currentVisit = date;
        visitData.visitCounter++;
        visitData = JSON.stringify(visitData);
    }else {
        let obj = {
            lastVisit: '',
            currentVisit: date,
            visitCounter: 1,
        }
        visitData = JSON.stringify(obj);
    }
    localStorage.setItem('visitData', visitData);
}
localStorageHandler();
