import { useEffect, useState } from "react";

import {useNavigate, useParams } from "react-router-dom";


export const Detail = ({ isLoggedIn }) => {
    let { taskId } = useParams();
    let navigate = useNavigate();
    const [singletodo, setsingletodo] = useState()

    useEffect(() => {
        getdetailTodo()
    }, []);
    const getdetailTodo = async () => {
        try {
            let res = await fetch(`http://localhost:5000/task/todo/${taskId}`);
            let data = await res.json();
            setsingletodo(data)

        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteTodo = async () => {
        let response = await fetch(`http://localhost:5000/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        let data = await response.json()
        navigate(`/todo`, { replace: true });
    }



    return isLoggedIn ? <div>
        <h1>Todo Details</h1>
        <div className="button">
            <button onClick={() => {
                deleteTodo()
            }}>Delete</button>

            <button onClick={() => {
                navigate(`/update/${taskId}`, { replace: true });
            }}>Renew</button>
        </div>
        {singletodo ? <div className="single-todo">
            <p>TaskID : {singletodo.taskId}</p>
            <p>Title : {singletodo.title}</p>
            <p>Creation time : {singletodo.startTime}</p>
        </div> : ""}
    </div> : <div>
        <h1>Please Login</h1>

    </div>
}