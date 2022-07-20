import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    let navigate = useNavigate();
    
    const [reg, setreg] = useState({
        email: "",
        password: "",
        mobile: "",
        name: ""
    })
    const register = async (logout) => {
        try {
            let response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reg)
            })
            let data = await response.json()
            console.log(data)
            data.message ? window.alert(data.message) : localStorage.setItem("usercred", JSON.stringify(data))
            if (!data.message) {
                window.alert("Registration done")
                logout(true)
                navigate(`/todo`, { replace: false });
            }
            setreg({
                email: "",
                password: "",
                mobile: "",
                name: ""
            })

        } catch (error) {
            window.alert(error.message)
            console.log(error)
        }
    }


    return <div>
        <h1>Registration</h1>
        <form action="" onSubmit={(e) => {
            e.preventDefault();
            register();


        }}>
            <input type="text" onChange={(e) => {
                setreg({ ...reg, name: e.target.value })
            }} required placeholder="enter name" value={reg.name} />
            <input onChange={(e) => {
                setreg({ ...reg, email: e.target.value })
            }} type="email" name="email" id="" required placeholder="enter email" value={reg.email} />
            <input onChange={(e) => {
                setreg({ ...reg, password: e.target.value })
            }} type="password" name="password" id="" required placeholder="enter password" value={reg.password} />
            <input type="tel" onChange={(e) => {
                setreg({ ...reg, mobile: e.target.value })
            }} required placeholder="enter mobile number" value={reg.mobile} />
            <input type="submit" />
        </form>

    </div>
}