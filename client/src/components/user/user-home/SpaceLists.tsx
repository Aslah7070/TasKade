import { useSpaceStore } from '@/lib/store/useSpaceStore'
import Link from 'next/link'
import React from 'react'
import { DialogDemo } from '../common/Dialog'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const SpaceLists = () => {  


    const { workSpace } = useSpaceStore()
    return ( 
            <div className="mt-4 max-h-40 sm:max-h-56 w-full md:max-h-5  6 lg:max-h-56 scrollbar-hide overflow-y-auto">
                {workSpace.map((space) => (
                    <div key={space._id}>
                        <div className="flex justify-between items-center p-1 cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                            <Link href={`/user/w/space/${space._id}`}>
                                <h2 className="font-medium text-md text-black dark:text-gray-300">
                                    {space.name}
                                </h2>
                            </Link>
                            <div >
                                <DialogDemo toggleIcom={<MoreHorizIcon /> } id={space._id} />
                            </div>
                          
                        </div>
                    </div>
                ))}
            </div>    
    )
}     

export default SpaceLists
