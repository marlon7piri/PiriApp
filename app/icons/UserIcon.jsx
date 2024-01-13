import React from 'react'
import { PiUsers } from "react-icons/pi";

const UserIcon = ({styles="w-6 h-6"}) => {
  return (
    <PiUsers className={styles}/>
  )
}

export default UserIcon