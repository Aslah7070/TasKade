
"use client"
import { useSpaceStore } from '@/lib/store/useSpaceStore'
import React from 'react'
import WorkspaceCard from './WorkSpace'



const MyWorkSpace = () => {
    const {workSpace}=useSpaceStore()
  return (
    <div>
          <div className="flex py-4 ml-4">
            {workSpace?.map((w, index) => (
              <WorkspaceCard key={index} workSpace={w} />
            ))}
          </div>
      
    </div>
  )
}

export default MyWorkSpace
