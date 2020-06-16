import './styles/vendor.scss';
import axios from 'axios';
import updateUI from './UI_Controller.js';

const url = 'http://localhost:3000/';
let data = [];

function addStamp () {
    e.preventDefault();
    let src = this.src;
    
    src += `?utm_stamp=`
    window.location.href = src;
}
// Request
axios.get(`${url}api/data`)
    .then(response => {
        const copied = JSON.parse(JSON.stringify(response.data))
        validateNumbers(copied);
        updateUI(data);
        setListeners();
    })
    .catch(err => {
        console.log(err);
    })


const setListeners = () => {
    let links = [...document.querySelectorAll('a')];
    links.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            let src = el.getAttribute('href');
            const timeStamp =''+ new Date().toISOString();
            src +=`?utm_stamp=${timeStamp}`;
            window.open(
                src,
                '_blank' 
              );
        })
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
}
