import React, { use } from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

const AdminPermision = ({children}) => {
    
    const user = useSelector((state) => state.user)

  return (
    <div>
     {
        isAdmin(user.role) ? (
            children
        ) : (
                <h1 className='text-red-600 bg-red-100 p-4'>Do not have permission to access this page.</h1>
        )
     }
    </div>
  )
}

export default AdminPermision
