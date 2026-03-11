import {FC} from "react";
import UsernamePasswordIn from "./components/UsernamePasswordIn";


const SignIn: FC = () => {
    const handleSignIn = (username: string, password: string) => {
        console.log("Sign In:", username, password);
        // Call API here
    };

    return (
        <div>
            <h2>Sign In</h2>
            <UsernamePasswordIn onSubmit={handleSignIn} submitLabel="Sign In" />
        </div>
    );
};

export default SignIn;