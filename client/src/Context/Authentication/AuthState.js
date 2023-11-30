import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

const AuthState = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    //   const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const host = "http://localhost:8000/api/auth";

    const handleLogin = async () => {
        try {
            const response = await fetch(`${host}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem("token", data.authToken);
                // navigate("/home");
                toast.success("Logged in successfully!", {
                    style: {
                        color: "black",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "2px solid rgb(251,146,60)",
                    },
                });
            } else {
                console.error("password incorrect");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <AuthContext.Provider value={{
            setCredentials,credentials,handleLogin,token
        }}>{props.children}</AuthContext.Provider>
    )
}

export default AuthState