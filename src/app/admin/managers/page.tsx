
import CreateManager from '@/components/templates/CreateManager'
import ListManagers from '@/components/templates/ListManagers'
import React from 'react'

const page = () => {
  return (
    <div>
        <div>Manage Mangers</div>
       <CreateManager/>
       <ListManagers/>
    </div>
  )
}

export default page