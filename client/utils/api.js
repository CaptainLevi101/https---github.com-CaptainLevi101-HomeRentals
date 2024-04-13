import axios from 'axios';
const API=axios.create(
  {
    baseURL:'http://localhost:5000/api'
}
)
API.interceptors.request.use((req)=>{
  if(localStorage.getItem('userInfo')){
     // console.log(localStorage.getItem('profile'));
   req.headers.Authorization=`Bearer ${localStorage.getItem('userToken')}`;
  //  console.log(JSON.parse(localStorage.getItem('profile')).token);
  }
  return req;
})

export default API;