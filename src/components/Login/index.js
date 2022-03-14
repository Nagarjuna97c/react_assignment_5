import {Component} from 'react/cjs/react.production.min'

import {Redirect} from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  updateUsername = event => {
    this.setState({username: event.target.value, errorMsg: ''})
  }

  updatePassword = event => {
    this.setState({password: event.target.value, errorMsg: ''})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    if (response.ok === true) {
      const jwtToken = await response.json()

      Cookies.set('jwt_token', jwtToken.jwt_token, {expires: 1})

      const {history} = this.props
      history.replace('/')
    } else {
      const error = await response.json()
      this.setState({errorMsg: error.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, errorMsg} = this.state

    return (
      <div className="login-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <form className="login-form" onSubmit={this.submitForm}>
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input"
            value={username}
            onChange={this.updateUsername}
            placeholder="Username"
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input"
            value={password}
            onChange={this.updatePassword}
            placeholder="Password"
          />
          <button type="submit" className="submit-button">
            Login
          </button>
          <p className="error-msg">
            {errorMsg !== '' ? `* ${errorMsg}` : null}
          </p>
        </form>
      </div>
    )
  }
}

export default Login
