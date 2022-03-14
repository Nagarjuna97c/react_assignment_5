import {Component} from 'react/cjs/react.production.min'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import FilterOptions from '../FilterOptions'
import JobCard from '../JobCard'

import './index.css'

const statusList = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    loadingStatus: statusList.loading,
    employmentType: [],
    salary: '',
    jobName: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({loadingStatus: statusList.loading})
    // console.log('hello')
    const {employmentType, salary, jobName} = this.state

    const employment =
      employmentType.length === 0 ? '' : employmentType.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salary}&search=${jobName}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const jobsData = await response.json()
    // console.log(jobsData)
    if (response.ok === true) {
      const formattedJobsData = jobsData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: formattedJobsData,
        loadingStatus: statusList.success,
      })
    } else {
      this.setState({loadingStatus: statusList.failure})
    }
  }

  modifyEmploymentType = employment => {
    const {employmentType} = this.state
    const emplomentSelected = employmentType.includes(employment)
    let newArray = employmentType
    if (emplomentSelected) {
      newArray = employmentType.filter(eachItem => eachItem !== employment)
    } else {
      newArray.push(employment)
    }
    this.setState({employmentType: newArray}, this.getJobsData)
  }

  modifySalary = newSalary => {
    // console.log(newSalary)
    this.setState({salary: newSalary}, this.getJobsData)
  }

  changeJobName = event => {
    this.setState({jobName: event.target.value})
  }

  useSearchInput = () => {
    this.getJobsData()
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    // console.log(jobsList)
    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <>
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} eachJob={eachJob} />
        ))}
      </>
    )
  }

  renderDecision = () => {
    const {loadingStatus} = this.state

    switch (loadingStatus) {
      case statusList.loading:
        return (
          <div className="jobs-loading-container" testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )
      case statusList.success:
        return this.renderJobsList()
      default:
        return (
          <div className="jobs-failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="jobs-failure-image"
            />
            <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
            <p className="jobs-failure-para">
              We cannot seem to find the page you are looking for
            </p>
            <button
              type="button"
              className="retry-button"
              onClick={this.getJobsData}
            >
              Retry
            </button>
          </div>
        )
    }
  }

  render() {
    const {jobName} = this.state
    // console.log(jobsList)

    return (
      <div className="jobs">
        <Header />
        <div className="jobs-container">
          <FilterOptions
            modifyEmploymentType={this.modifyEmploymentType}
            modifySalary={this.modifySalary}
          />
          <ul className="jobs-data">
            <li className="input-container">
              <input
                type="search"
                value={jobName}
                className="job-input"
                placeholder="search"
                onChange={this.changeJobName}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.useSearchInput}
                testid="searchButton"
              >
                <BsSearch className="icon" />
              </button>
            </li>
            {this.renderDecision()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Jobs
