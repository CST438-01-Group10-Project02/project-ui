// Sign in page



function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <UsernameInput
                value = {username}
                onChange = {newText => setUsername(newText)}/>
            <PasswordInput
                value = {password}
                onChange = {newText => setPassword(newText)}/>
        </>
    )
}

// React component for username input
function UsernameInput(value, onChange) {
    return (
        <input>
            Username
        </input>
    )
}

// React component for password input
function PasswordInput(value, onChange) {
    return (
        <input>
            Password
        </input>
    )
}

// React component for sign in button
function SignInButton() {
    return (
        <button>
            Sign In
        </button>
    )
}

// React component for sign up button
function SignUpButton() {
    return (
        <button>
            Sign Up
        </button>
    )
}

// React component for OAuth button
function OAuthButton() {
    return (
        <button>
            OAuth will go here
        </button>
    )
}