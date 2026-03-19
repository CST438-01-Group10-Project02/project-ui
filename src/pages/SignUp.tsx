import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {supabaseClient} from "../supabaseClient.js";
import "./SignUp.css"


const SignUp: FC = () => {
    const navigate = useNavigate();

    // Creates state variable formData
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    // Updates data while user types input
    function handleChange(event) {
        const value = event.target.value;
        setFormData({...formData, [event.target.name]: value});
    }

    // Creates account using formData
    async function handleSubmit(e) {
        e.preventDefault()

        const {data, error} = await supabaseClient.auth.signUp({
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

        // When account is created navigate to sign in page
        navigate("/sign-in");
    }

    console.log(formData)


    return (
        <div className="signup-body">
            <div className={"signup-container"}>

                <form onSubmit={handleSubmit} className={"signup-form"}>
                    <h2 className={"signup-title"}>Create Account</h2>
                    <br></br>

                    <input className={"signup-inputs"}
                           placeholder='Username'
                           name='username'
                           onChange={handleChange}
                    />
                    <input className={"signup-inputs"}
                           placeholder='Email'
                           name='email'
                           onChange={handleChange}

                    />
                    <input className={"signup-inputs"}
                           placeholder='Password'
                           name='password'
                           type="password"
                           onChange={handleChange}
                    />

                    <button type="submit" className={"signup-button"}>
                        Submit
                    </button>

                    <br></br>

                    <p className="singIn">
                        Already have an account? <a href="/Sign-in">Login</a>
                    </p>

                </form>

            </div>
        </div>
    );
};

export default SignUp;