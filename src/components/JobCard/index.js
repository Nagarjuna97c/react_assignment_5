import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {eachJob} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob

  return (
    <li className="job-card">
      <Link to={`jobs/${id}`} className="link">
        <div className="icon-and-position">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
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
        <h1 className="job-card-description-heading">Description</h1>
        <p className="job-card-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
