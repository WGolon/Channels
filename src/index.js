import './styles/vendor.scss';
import axios from 'axios';
import updateUI from './UI_Controller.js';

const url = 'http://localhost:3000/';
let data = [];

// Request
axios.get(`${url}api/data`)
    .then(response => {
        const copied = JSON.parse(JSON.stringify(response.data))
        validateNumbers(copied);
        updateUI(data);
    })
    .catch(err => {
        console.log(err);
    })






const validateNumbers = (copied) => {
    data = copied.map(el => {
        let {subscriberCount, videoCount, viewCount} = el.statistics;
        el.statistics.subscriberCount = subscriberCount.replace(/[ ,.]/g, "");
        el.statistics.videoCount = videoCount.replace(/[ ,.]/g, "");
        el.statistics.viewCount = viewCount.replace(/[ ,.]/g, "");
        return el;
    })
}
