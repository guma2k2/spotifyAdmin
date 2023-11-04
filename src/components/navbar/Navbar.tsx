import './Navbar.style.scss'
import {RiNotification4Line} from "react-icons/ri";

const Navbar = () => {
    return(
        <div className="navbar">
            <div className="logo">
                <img src="/vite.svg"/>
                <span>Admin</span>
            </div>
            <div className="icons">
                <div className="notification">
                    <RiNotification4Line />
                    <span>3</span>
                </div>
                <div className="user">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0zg5JglgNTdw9Wzp3CBT20TfxkrxyxbzHe1HxMI4i&s" alt="" />
                    <span>Admin</span>
                </div>
            </div>
        </div>
    )
}
export default Navbar