import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../supabaseClient";
import { GoogleLogin } from "@react-oauth/google";

type Props = {
    setToken: (token: any) => void;
};

const SignIn = ({ setToken }: Props) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFormData({ ...formData, [event.target.name]: value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            alert(error.message);
            return;
        }

        setToken(data);
        navigate("/dashboard");
    }

    async function handleGoogleSuccess(credentialResponse: any) {
        if (!credentialResponse.credential) {
            alert("No Google credential returned");
            return;
        }

        const { data, error } = await supabaseClient.auth.signInWithIdToken({
            provider: "google",
            token: credentialResponse.credential,
        });

        if (error) {
            alert(error.message);
            return;
        }

        setToken(data);
        navigate("/dashboard");
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>

            <p>
                Don't have an account? <a href="/Sign-up">Sign up</a>
            </p>

            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                    alert("Google login failed");
                }}
            />
        </div>
    );
};

export default SignIn;