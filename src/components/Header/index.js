import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const logOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="header">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-image"
          />
        </Link>
      </li>
      <li className="redirection-links">
        <Link to="/" className="link">
          Home
        </Link>

        <Link to="/jobs" className="link">
          jobs
        </Link>
      </li>
      <li>
        <button type="button" className="logout-button" onClick={logOut}>
          Logout
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)
