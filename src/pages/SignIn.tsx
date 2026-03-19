import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {supabaseClient} from "../supabaseClient";
import {GoogleLogin} from "@react-oauth/google";
import "./SignIn.css"

type Props = {
    setToken: (token: any) => void;
};

const SignIn = ({setToken}: Props) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFormData({...formData, [event.target.name]: value});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const {data, error} = await supabaseClient.auth.signInWithPassword({
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

        const {data, error} = await supabaseClient.auth.signInWithIdToken({
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
    <div className = "auth-body">
        <div className="auth-container">
            <form onSubmit={handleSubmit} className={"auth-form"}>
                <h2 className={"auth-title"}>Login</h2>

                <input className={"auth-inputs"}
                       placeholder="Email"
                       name="email"
                       onChange={handleChange}
                />
                <input className={"auth-inputs"}
                       placeholder="Password"
                       name="password"
                       type="password"
                       onChange={handleChange}
                />
                <button className={"auth-button"} type="submit">Submit</button>


                <p className="divider">
                    <span>OR</span>
                </p>


                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        alert("Google login failed");
                    }}
                />


                <p className="createAccount">
                    Don't have an account? <a href="/Sign-up">Sign up</a>
                </p>
            </form>


        </div>
    </div>
    );

};

export default SignIn;