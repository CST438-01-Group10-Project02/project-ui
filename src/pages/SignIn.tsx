import {FC, useState} from "react";
import UsernamePasswordIn from "./components/UsernamePasswordIn";
import {useNavigate} from "react-router-dom";
import { supabaseClient } from "../supabaseClient.js";

type Props = {
    setToken: (token: any) => void
}

const SignIn = ({ setToken }: Props) => {
    const navigate = useNavigate();

    /*
    const handleSignIn = (username: string, password: string) => {
        console.log("Sign In:", username, password);
        // Call API here
        navigate("/dashboard");
        <UsernamePasswordIn onSubmit={handleSignUp} submitLabel="Sign Up"/>

    };
    */

    /*
    const handleSignUp = () => {
        console.log("Sign Up");
        navigate("/sign-up");
    }

     */

    // Adds state variable called formData
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    // Updates components states when user types input
    function handleChange(event) {
        const value = event.target.value;
        setFormData({...formData, [event.target.name]: value});
    }

    // Signs user in with valid credentials
    async function handleSubmit(e) {
        e.preventDefault()

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        })

        // Logs signup data and possible errors
        console.log('signup data:', data)
        console.log('signup error:', error)

        if (error) {
            alert(error.message)
            return
        }

        setToken(data)
        navigate("/dashboard");
    }

    console.log(formData)

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}

                />
                <input
                    placeholder='Password'
                    name='password'
                    type="password"
                    onChange={handleChange}
                />

                <button type="submit">
                    Submit
                </button>
            </form>

            Don't have an account? <a href="/Sign-up">Sign up</a>

        </div>
    );
};

export default SignIn;