import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Login = ({ logout }) => {
    let navigate = useNavigate();

    const [user, setuser] = useState({
        email: "",
        password: ""

    })
    const login = async () => {
        try {
            let response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            let data = await response.json();
            data.message ? window.alert(data.message) : localStorage.setItem("usercred", JSON.stringify(data))
            if (!data.message) {
                window.alert("Login done")
                logout(true)
                navigate(`/todo`, { replace: false });
            } else {
                window.alert(data.message)
            }

            setuser({
                email: "",
                password: ""
            })


        } catch (error) {
            console.log(error)
        }
    }


    return <div >
        <h1>Login</h1>
        <form
            action="" onSubmit={(e) => {
                e.preventDefault();
                login();


            }}>
            <input onChange={(e) => {
                setuser({ ...user, email: e.target.value })

            }} type="email" name="email" id="" value={user.email} required placeholder="enter email" />
            <input onChange={(e) => {
                setuser({ ...user, password: e.target.value })
            }} type="password" name="password" id="" value={user.password} required placeholder="enter password" />
            <input type="submit" />
        </form>

    </div>
}