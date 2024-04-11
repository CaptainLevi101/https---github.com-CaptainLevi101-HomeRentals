import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { UploadFile } from "@mui/icons-material";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as API from '../../api/auth'


const RegisterPage = () => {
    const navigate = useNavigate();
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: "",
    });
    const fileInputRef = useRef(null);

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleInput = (e) => {
        const { name } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: e.target.value
        }));
    }
    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            // Update the state with the base64 representation of the image
            setFormData((prev) => ({
                ...prev,
                profileImage: reader.result,
            }));
        };

        if (file) {
            // Read the selected file as a data URL
            reader.readAsDataURL(file);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
        try {
            console.log(formData);
            const response = await API.signup(formData);
            if (response) {
                navigate("/login")
            }
        } catch (err) {
            console.log("Registration failed", err.message)
        }
        console.log(formData);
    }
    return (
        <Card color="transparent" shadow={false}
            className="w-screen h-full flex flex-col items-center justify-center py-8 "
        >
            <div>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                </Typography>
            </div>
            <form className="mt-12 mb-2 md:w-[50%] lg:w-[25%] border px-6 py-8 rounded-xl" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-4">
                        First Name
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInput}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-4">
                        Last Name
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInput}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
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


                    <Typography variant="h6" color="blue-gray" className="-mb-4">
                        Confirm Password
                    </Typography>
                    <Input
                        type="password"
                        size="lg"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInput}
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    {!passwordMatch && (
                        <div>
                            <p className="text-body-bold text-red-300">Passwords Do not match</p>
                        </div>
                    )}
                    <div className="flex flex-col gap-2 items-center justify-center mb-4">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="-mb-4">
                                <input
                                    type="file"
                                    id="image"
                                    name="profileImage"
                                    onChange={handleImage}
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                                <Upload
                                    className="cursor-pointer"
                                    onClick={handleUploadButtonClick}
                                />
                                <span className="-ml-7"> Upload Photo</span>

                            </Typography>
                            {formData.profileImage && (
                                <img
                                    src={formData.profileImage} // Set the src to the base64 string
                                    alt="profile photo"
                                    className="w-48 h-48 rounded-xl shadow-xl mt-4 -ml-12"
                                />
                            )}


                        </div>
                    </div>
                </div>

                <Button className="mt-6" fullWidth type="submit" disabled={!passwordMatch}>
                    sign up
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-gray-900">
                        Sign In
                    </Link>
                </Typography>
            </form>
        </Card>
    );
}
export default RegisterPage