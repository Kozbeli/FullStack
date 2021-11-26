import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div>
      filter
      <input
        type="text"
        name="filterText"
        style={style}
        onChange={handleChange}
      />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)