import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import * as API from '../../api/auth'
import { setLogin } from "../redux/state";


const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formData, setFormData] = useState({
      email: "",
      password: "",
  });
 
  const handleInput = (e) => {
      const { name } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: e.target.value
      }));
  }
 


  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          
          const response = await API.login(formData);
          if(response.token){
            dispatch(setLogin({
              user:response.result,
              token:response.token
            })
          )
          navigate('/');
          }
      } catch (err) {
          console.log("Login failed", err.message)
      }
      
  }



  return (
      <Card color="transparent" shadow={false}
          className="w-screen h-full flex flex-col items-center justify-center py-8 "
      >
          <div>
              <Typography variant="h4" color="blue-gray">
                  Sign In
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                  Nice to meet you! Enter your details to signin.
              </Typography>
          </div>
          <form className="mt-12 mb-2 md:w-[50%] lg:w-[25%] border px-6 py-8 rounded-xl" onSubmit={handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                 
                 
                  <Typography variant="h6" color="blue-gray" className="-mb-4">
                      Your Email
                  </Typography>
                  <Input
                      size="lg"
                      placeholder="name@mail.com"
                      name="email"
                      value={formData.email}
                      onChange={handleInput}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                          className: "before:content-none after:content-none",
                      }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-4">
                      Password
                  </Typography>
                  <Input
                      type="password"
                      size="lg"
                      name="password"
                      value={formData.password}
                      onChange={handleInput}
                      placeholder="********"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                          className: "before:content-none after:content-none",
                      }}
                  />
              </div>

              <Button className="mt-6" fullWidth type="submit" disabled={!passwordMatch}>
                  sign in
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                  Do not have an account?{" "}
                  <Link to="/register" className="font-medium text-gray-900">
                      Sign Up
                  </Link>
              </Typography>
          </form>
      </Card>
  );
}
export default LoginPage