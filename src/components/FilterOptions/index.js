import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterOptions = props => {
  const {modifyEmploymentType, modifySalary} = props

  return (
    <div className="profile-and-inputs">
      <Profile />
      <hr />
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="checkbox-list">
        {employmentTypesList.map(eachItem => (
          <li key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              id={eachItem.employmentTypeId}
              value={eachItem.employmentTypeId}
              onChange={() => modifyEmploymentType(eachItem.employmentTypeId)}
            />
            <label htmlFor={eachItem.employmentTypeId} className="label">
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
      <hr />
      <h1 className="employment-heading">Salary Range</h1>
      <ul className="radio-list">
        {salaryRangesList.map(eachItem => (
          <li key={eachItem.salaryRangeId}>
            <input
              type="radio"
              id={eachItem.salaryRangeId}
              value={eachItem.salaryRangeId}
              name="salary"
              onChange={() => modifySalary(eachItem.salaryRangeId)}
            />
            <label htmlFor={eachItem.salaryRangeId} className="label">
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterOptions
