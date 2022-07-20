import { useState } from "react";
import { Routes, Route } from "react-router-dom"
import { Create } from '../todos/Create';
import { Detail } from "../todos/Detail";

import { Navbar } from "../Navbar";
import { Login } from '../user/Login';
import { Register } from "../user/Register"
import { Todo } from '../todos/Todo';
import { Protected } from "../Protected"
import { Renew } from "../todos/Renew";


export const Allroutes = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const logout = (data) => {
    console.log(data, "getting")
    setisLoggedIn(data)
  }


  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
        <Route path="/" element={<Login logout={logout} />}></Route>
        <Route path="/register" element={<Register logout={logout} />}></Route>

        <Route path="/todo" element={
          <Protected isLoggedIn={isLoggedIn}>
            <Todo />
          </Protected>
        }></Route>
        <Route path="/create" element={<Create />}></Route>

        <Route path="/:taskId" element={
          <Detail isLoggedIn={isLoggedIn} />

        }></Route>
        <Route path="/update/:taskId" element={<Renew />}></Route>
      </Routes>

    </div>
  )
}

