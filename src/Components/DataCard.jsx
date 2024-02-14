import React from 'react'

const DataCard = ({data}) => {
  return (
    <div className='card'>
      <p>{data.data}</p>
    <p className='time'>{data.time}</p></div>
  )
}

export default DataCard