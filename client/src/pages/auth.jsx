import { useState } from "react"
import axios from "axios"

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    )
}

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    return  <Form  userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} label="Login"  />
}

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8000/auth/register", {userName, password});
            alert("Registration complete, now you'll have to login!!!!!!")
        }catch(err){
            console.log(err)
        }
    }
    return  <Form  userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit}  />
    
}

const Form = ({userName, setUserName, password, setPassword, label, onSubmit }) => {
    return (
        <div className="auth-container">
        <form onSubmit={onSubmit}>
            <h2>{label}</h2>
            <div className="form-group">
                <label htmlFor="userName">Username:</label>
                <input type="text" value={userName} id="userName" onChange={(event) => setUserName(event.target.value) } />
            </div>

            <div className="form-group">
                <label htmlFor="password">password:</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>

            <button type="submit">{label}</button>
        </form>
    </div>
    )
}