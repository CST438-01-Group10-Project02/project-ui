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

    return (
        <div>
            <h2>Sign In</h2>
            <UsernamePasswordIn onSubmit={handleSignIn} submitLabel="Sign In" />

        </div>
    );
};

export default SignIn;