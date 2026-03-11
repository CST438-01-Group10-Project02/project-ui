import {FC, SyntheticEvent, useState} from "react";

interface Props {
    onSubmit: (username: string, password: string) => void;
    submitLabel: string;
}

const UsernamePasswordIn: FC<Props> = ({ onSubmit, submitLabel }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        onSubmit(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{submitLabel}</button>
        </form>
    );
};

export default UsernamePasswordIn;