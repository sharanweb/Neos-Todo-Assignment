import { useState } from "react"

export const Create = () => {
    let userdata = JSON.parse(localStorage.getItem("usercred"))
    const [task, newtask] = useState({
        title: "",
        expiry: ""
    })

    const createTodo = async () => {
        let newtodo = { ...task };
        newtodo.userId = userdata.userId

        let response = await fetch(`http://localhost:5000/task/create/${userdata.userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newtodo)
        })
        let data = await response.json()
        if (data.message) {
            window.alert(data.message)
        }
        else {
            window.alert("New task created")
        }
        newtask({
            title: "",
            expiry: ""
        })

    }

    return <div>
        <h1>Create New Task</h1>
        <form action="" onSubmit={(e) => {
            e.preventDefault()
            createTodo()
        }}>
            <input onChange={(e) => {
                newtask({ ...task, title: e.target.value })

            }}
                type="text" name="" id="" value={task.title} placeholder="enter title" />
            <div >
                Expiry Time : <select
                    onChange={(e) => {
                        newtask({ ...task, expiry: e.target.value })
                    }}
                    style={{
                        width: "20%",
                        padding: "5px",
                        marginBottom: "10px"
                    }} name="" id="" value={task.expiry}>
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