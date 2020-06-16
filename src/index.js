import './styles/vendor.scss';
import axios from 'axios';



axios.get('http://localhost:3000/api/data')
.then(response => {
    console.log(response);
})
