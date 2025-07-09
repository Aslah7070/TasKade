
"use client"
import { useSpaceStore } from '@/lib/store/useSpaceStore';

import React, { useEffect, useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { CustomDropdown } from '../user/common/ArrowDown';
import Component from '../user/common/Search';
import { Button } from '../ui/buttons';
import BasicSpace from './BasicSpace';
import InviteDialogue from '../user/common/InviteAlert';

  type Props = {
  spaceId: string;
};
const   TaskContainer = ({spaceId}:Props) => {
   const workspaceId=spaceId
  const {findWorkSpacesById,workSpace}=useSpaceStore()
  const [selected, setSelected] =useState<string|undefined>("");

  useEffect(()=>{
   
    
    display()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[spaceId])
 

   const display=async()=>{
        
        const find=await findWorkSpacesById(spaceId)
        if(find?.success){
           
         setSelected(find.workspace.name)
        }
    }
  return (
    <div>
     <div className='space-y-2 mb-2 '>
         <div className='bg-gray-900 h-12 flex justify-between font-bold'>
<div className='flex p-3'>space <KeyboardArrowRightIcon/>  <CustomDropdown title={selected||""} workSpace={workSpace} /></div>
<div className='h-12 flex items-center justify-between px-5 '>
    
    <InviteDialogue spaceId={spaceId}/>
    <Button variant={"outline"} className='rounded-sm'>Edit Space</Button>
</div>

      </div>
      <div className=' flex justify-end'>
        <Component/>
      </div>
     </div>
     <hr className='mb-2' />
 <BasicSpace workspaceId={workspaceId} />
   
    </div>
  )
}

export default TaskContainer
