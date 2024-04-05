import React from 'react'
import './TrendCard.css'
import { TrentData } from '../../Data/TrendData'
const TrendCard = () => {
  return (
    <div className='TrendCard'>
          <h3>Trends for you</h3>
          {TrentData.map((trend) => {
              return (
                <div className="trend">
                  <span>#{trend.name}</span>
                  <span>{trend.shares}k shares</span>
                </div>
              );
          })}
    </div>
  )
}

export default TrendCard
