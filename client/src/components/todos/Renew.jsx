import { useState } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Renew = () => {
    let navigate = useNavigate()
    let { taskId } = useParams()
    const [todoupdate, settodoupdate] = useState({
        expiry: ""
    })
    const updatetodo = async () => {
        let res = await fetch(`http://localhost:5000/task/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todoupdate)
        })
        let data = await res.json();
        if (!data.message) {
            window.alert("Update done")
            navigate(`/todo`, { replace: false });
        }
        settodoupdate({ expiry: "" })

    }
    return <div>
        <h1>Update Todo</h1>

        <form action="" onSubmit={(e) => {
            e.preventDefault()
            updatetodo()
        }}>
            <div >
                Expiry Time : <select
                    onChange={(e) => {
                        settodoupdate({ expiry: e.target.value })
                    }}
                    style={{
                        width: "20%",
                        padding: "5px",
                        marginBottom: "10px"
                    }} name="" id="" value={todoupdate.expiry}>
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select> Mins
            </div>
            <input type="submit" />

        </form>

    </div>
}