
import { useNavigate,Link } from "react-router-dom";

export const Navbar = (props) => {
    let navigate = useNavigate();
    let userdata = JSON.parse(localStorage.getItem("usercred")) || []
    const logout = () => {
        localStorage.removeItem("usercred");
        props.logout(false)
        navigate(`/`, { replace: false });

    }
    console.log(userdata)
    return <div className="navbar">
        {
            props.isLoggedIn ? <div><button onClick={() => {
                logout()
            }}>Logout</button>
                <button>
                    <Link to="/todo">Todos</Link>
                </button></div> : <div>
                <button>
                    <Link to="/">Login</Link>
                </button>
                <button>
                    <Link to="/register">Registration</Link>
                </button>

            </div>
        }







    </div>
} 