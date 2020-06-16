import './styles/vendor.scss';
import axios from 'axios';

const url = 'http://localhost:3000/';
let data = [];

// Request
axios.get(`${url}api/data`)
.then(response => {
    data = response.data;
    console.log(data);
})
.catch(err => {
    console.log(err);
})

// Update UI

const updateUI = (data) => {
    
}
