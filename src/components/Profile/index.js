import {Component} from 'react/cjs/react.production.min'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const statusList = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {loadingStatus: statusList.loading, profileDetails: {}}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const profile = await response.json()
      this.setState({
        profileDetails: profile.profile_details,
        loadingStatus: statusList.success,
      })
    } else {
      this.setState({loadingStatus: statusList.failure})
    }
  }

  renderProfile = () => {
    const {profileDetails} = this.state

    return (
      <div className="profile">
        <img
          src={profileDetails.profile_image_url}
          alt="profile"
          className="profile-image"
        />
        <h1 className="profile-name">{profileDetails.name}</h1>
        <p className="profile-bio">{profileDetails.short_bio}</p>
      </div>
    )
  }

  retry = () => {
    this.setState({loadingStatus: statusList.loading}, this.getProfileData)
  }

  selectRender = () => {
    const {loadingStatus} = this.state

    switch (loadingStatus) {
      case statusList.loading:
        return (
          <div className="loading-container" testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )
      case statusList.success:
        return this.renderProfile()
      default:
        return (
          <div className="profile-failure">
            <button type="button" className="retry-button" onClick={this.retry}>
              Retry
            </button>
          </div>
        )
    }
  }

  render() {
    return this.selectRender()
  }
}

export default Profile
