import React, { useState,useEffect } from 'react'
import './FollowersCard.css'
import { Followers } from '../../Data/FollowersData'
import User from '../user/User'
import { useSelector } from 'react-redux'
import { getAllusers } from '../../Api/userRequest'
// all the usrs expect the current users can be shown under the people you may know so we need to fetch the users from the server
const FollowersCard = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [persons, setPersons] = useState([]);
    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllusers();
            // console.log(data,"dataaa");
            setPersons(data)
        }
        fetchPersons()
    },[])
  return (
    <div className='FollowersCard'>
          <h3>people you my know</h3>
          {persons.map((person, id) => {
              if (person._id !== user._id) {
                   return <User person={person} key={id} />;
              }
             
          })}
    </div>
  )
}

export default FollowersCard
