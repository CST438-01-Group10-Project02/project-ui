import {FC} from "react";
import UsernamePasswordIn from "./components/UsernamePasswordIn";
import {useNavigate} from "react-router-dom";


const SignUp: FC = () => {
    const navigate = useNavigate();

    const handleSignUp = (username: string, password: string) => {
        console.log("Sign Up:", username, password);
        // Call API here
        navigate("/sign-in");
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <UsernamePasswordIn onSubmit={handleSignUp} submitLabel="Sign Up" />

        </div>
    );
};

export default SignUp;