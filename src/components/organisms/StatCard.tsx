import Link from 'next/link'
import React, { ReactNode } from 'react'

const StatCard = ({title,children,href}:{title:string,children:ReactNode,href?:string}) => {

    const hre= href??`admin/${title==='users'?'':title}`

  return (
    <Link href={hre} className='p-4 border rounded-lg shadow-lg'>
        <div className='text-lg capitalize'>{title}</div>
        <div className='text-2xl font-bold'>{children}</div>
    </Link>
  )
}

export default StatCard