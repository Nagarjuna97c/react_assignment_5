import {Component} from 'react/cjs/react.production.min'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'

import './index.css'

const statusList = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobPage extends Component {
  state = {loadingStatus: statusList.loading, jobData: {}}

  componentDidMount() {
    this.getPageData()
  }

  getPageData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const jobData = await response.json()
      console.log(jobData)
      const formattedJobData = {
        jobDetails: {
          companyLogoUrl: jobData.job_details.company_logo_url,
          companyWebsiteUrl: jobData.job_details.company_website_url,
          employmentType: jobData.job_details.employment_type,
          id: jobData.job_details.id,
          jobDescription: jobData.job_details.job_description,
          lifeAtTheCompany: {
            description: jobData.job_details.life_at_company.description,
            imageUrl: jobData.job_details.life_at_company.image_url,
          },
          location: jobData.job_details.location,
          packagePerAnnum: jobData.job_details.package_per_annum,
          rating: jobData.job_details.rating,
          skills: jobData.job_details.skills.map(eachItem => ({
            imageUrl: eachItem.image_url,
            name: eachItem.name,
          })),
          title: jobData.job_details.title,
        },
        similarJobs: jobData.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        })),
      }
      this.setState({
        jobData: formattedJobData,
        loadingStatus: statusList.success,
      })
    } else {
      this.setState({loadingStatus: statusList.failure})
    }
  }

  renderPage = () => {
    const {jobData} = this.state
    const {jobDetails, similarJobs} = jobData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtTheCompany,
    } = jobDetails
    console.log(similarJobs)
    return (
      <div className="job-page">
        <div className="main-job-page">
          <div className="icon-and-position">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
            <h1 className="position-name">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
          <div className="other-data-container">
            <GoLocation className="icon1" />
            <p className="location">{location}</p>
            <BsFillBriefcaseFill className="icon1" />
            <p className="employment-type">{employmentType}</p>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-heading-and-visit-container">
            <h1 className="description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="anchor">
              Visit
              <BsBoxArrowUpRight className="visit-icon" />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="required-skills-container">
            {skills.map(eachItem => (
              <li className="skill" key={eachItem.name}>
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="skill-image"
                />
                <p className="skill-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-grid">
            <p className="life-at-company-description">
              {lifeAtTheCompany.description}
            </p>
            <img
              src={lifeAtTheCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(eachItem => (
            <li className="similar-job" key={eachItem.id}>
              <div className="icon-and-position">
                <img
                  src={eachItem.companyLogoUrl}
                  className="company-logo"
                  alt="similar job company logo"
                />
                <h1 className="similar-job-position-name">{eachItem.title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating">{eachItem.rating}</p>
                </div>
              </div>
              <h1 className="similar-job-description-heading">Description</h1>
              <p className="similar-job-description">
                {eachItem.jobDescription}
              </p>
              <div className="similar-job-other-data-container">
                <GoLocation className="icon1" />
                <p className="similar-job-location">{eachItem.location}</p>
                <BsFillBriefcaseFill className="icon1" />
                <p className="similar-job-employment-type">
                  {eachItem.employmentType}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {loadingStatus} = this.state

    switch (loadingStatus) {
      case statusList.loading:
        return (
          <>
            <Header />
            <div className="jobs-loading-container" testid="loader">
              <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
            </div>
          </>
        )
      case statusList.success:
        return (
          <>
            <Header />
            {this.renderPage()}
          </>
        )
      default:
        return (
          <>
            <Header />
            <div className="jobs-failure-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="jobs-failure-image"
              />
              <h1 className="jobs-failure-heading">
                Oops! Something Went Wrong
              </h1>
              <p className="jobs-failure-para">
                We cannot seem to find the page you are looking for
              </p>
              <button
                type="button"
                className="retry-button"
                onClick={this.getPageData}
              >
                Retry
              </button>
            </div>
          </>
        )
    }
  }
}

export default JobPage
