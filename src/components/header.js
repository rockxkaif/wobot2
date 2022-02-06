import { Switch } from "@material-ui/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { VideoContext } from "../videoContext";

const Header = (props) => {

    const currentUser = sessionStorage.getItem('user');
    const [videoList, setVideoList, loading, setLoading] = useContext(VideoContext);

    const changeTheme = (e) => {
        console.log(e.target.checked);
        props.setCurrentTheme(e.target.checked ? 'light' : 'dark');
    }

    const logout = () => {
        sessionStorage.removeItem('user');
        window.location.replace('/login');
    }

    const showLoggedIn = () => {

        if (currentUser) {
            return <>
       
                <li className="nav-item">
                    <Link className="nav-link" to="/addvideo">Add Product</Link>
                </li>
                <li className="nav-item">
                    <button onClick={logout} className="btn btn-danger">Logout</button>
                </li>

            </>
        } else {
            return <>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                </li>

            </>
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
           
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/listvideo">View Product</Link>
                        </li>
                        <li className="nav-item">
                            <h1>{videoList.length}</h1>
                        </li>

                        <li className="nav-item">
                            <Switch onChange={changeTheme} ></Switch>
                        </li>


                        {showLoggedIn()}

                    </ul>
 
                </div>
            </div>
        </nav>
    )
}


export default Header;