import {FC} from "react";
import UsernamePasswordIn from "./components/UsernamePasswordIn";
import {useNavigate} from "react-router-dom";


const SignIn: FC = () => {
    const navigate = useNavigate();

    const handleSignIn = (username: string, password: string) => {
        console.log("Sign In:", username, password);
        // Call API here
        navigate("/dashboard");
    };

    const handleSignUp = () => {
        console.log("Sign Up");
        navigate("/sign-up");
    }

    return (
        <div>
            <h2>Sign In</h2>
            <UsernamePasswordIn onSubmit={handleSignIn} submitLabel="Sign In" />
            <button onClick = {handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignIn;