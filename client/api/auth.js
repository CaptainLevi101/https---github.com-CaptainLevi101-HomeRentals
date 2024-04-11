import API from '../utils/api';


export const signup = async (formData) => {
    try {
    const response = await API.post(`/auth/register`, formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'User already exists') {
        console.log('User already exists');
        return { error: 'User already exists' };
      } else {
        console.error('Signup error:', error);
        throw error; // Rethrow the error for further handling
      }
    }
  };

  export const login=async(formData)=>{
    try{
      const response=await API.post('/auth/login',formData);
      return response.data;
    }catch(error){
      console.log(error);
    }
  }

  export const fetchImage=async(id)=>{
    try{
        console.log(id);
      const res=await API.get(`/auth/fetchImage/${id}`);
      return res.data;
    }catch(err){
        console.log('error in fetching user image',err);
    }
   
  }
  

