import {FC, useState} from "react";
import UsernamePasswordIn from "./components/UsernamePasswordIn";
import {useNavigate} from "react-router-dom";
import {supabaseClient} from "../supabaseClient.js";


const SignUp: FC = () => {
    const navigate = useNavigate();


    const handleSignUp = (username: string, password: string) => {
        console.log("Sign Up:", username, password);
        // Call API here
        navigate("/sign-in");
    };


    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    function handleChange(event) {
        const value = event.target.value;
        setFormData({...formData, [event.target.name]: value});
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const { data, error } = await supabaseClient.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    username: formData.username
                }
            }
        })

        console.log('signup data:', data)
        console.log('signup error:', error)

        if (error) {
            alert(error.message)
            return
        }

        alert('Check email for verification link')

        navigate("/sign-in");
    }

    console.log(formData)

    return (
        <div>
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Username'
                    name='username'
                    onChange={handleChange}
                />
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

            Already have an account? <a href="/Sign-in">Login</a>

            <UsernamePasswordIn onSubmit={handleSignUp} submitLabel="Sign Up"/>

        </div>
    );
};

export default SignUp;