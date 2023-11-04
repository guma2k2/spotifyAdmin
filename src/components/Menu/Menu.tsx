import { Link } from "react-router-dom"
import './Menu.style.scss'
const Menu = () => {
    return(
        <div className="menu">
            <Link to="/" className="listItem">
                <img src="/home.svg" alt="" />
                <span className="listItemTitle" >Home</span>
            </Link>
            <Link to="/user" className="listItem">
                <img src="/user.svg" alt="" />
                <span className="listItemTitle" >User</span>
            </Link>
            <Link to="/song" className="listItem">
                <img src="/songSvg.svg" alt="" />
                <span className="listItemTitle" >Song</span>
            </Link>
            <Link to="/playlist" className="listItem">
                <img src="/playlistSvg.svg" alt="" />
                <span className="listItemTitle" >Playlist</span>
            </Link>
            <Link to="/category" className="listItem">
                <img src="/categorySvg.svg" alt="" />
                <span className="listItemTitle" >Category</span>
            </Link>
            <Link to="/album" className="listItem">
                <img src="/categorySvg.svg" alt="" />
                <span className="listItemTitle" >Album</span>
            </Link>
            <Link to="/review" className="listItem">
                <img src="/categorySvg.svg" alt="" />
                <span className="listItemTitle" >Review</span>
            </Link>
            <Link to="/sentiment" className="listItem">
                <img src="/categorySvg.svg" alt="" />
                <span className="listItemTitle" >Sentiment</span>
            </Link>
        </div>
    )
}
export default Menu