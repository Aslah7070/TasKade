/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/buttons';
import AddIcon from '@mui/icons-material/Add';

import { useSpaceStore } from '@/lib/store/useSpaceStore';

import { useTaskeStore } from '@/lib/store/useTaskStore';
import {

 DndContext,
closestCorners,
  DragEndEvent,

  DragOverlay,
 
}from "@dnd-kit/core";


import ColumnsListing from './column-listing';
import { Task } from '@/types/type';
import { TaskList } from './Task-lists';
type PropsBasic = {
    workspaceId: string
}
const BasicSpace = ({ workspaceId }: PropsBasic) => {

   
    const { createColumn, findSpaceColumns, column } = useSpaceStore();
    const {createList,tasks,getAllTask,swapTasks}=useTaskeStore()

 const [activeTask, setActiveTask] = useState<Task | null>(null);

    useEffect(() => {
        findColumn();
    }, []);

    const findColumn = async () => {
        if (!workspaceId) return;
        await findSpaceColumns(workspaceId);
    };

    const handleCreateSpace = useCallback(async () => {
        const options={name:"",color:{bg:"",text:""}}
        const space = await createColumn(workspaceId,options);
     
        
        if (space?.success) {
        
            const spaceId=space.newSpace._id
            const listData= { name: "New List" }
            await createList(spaceId,listData)
        }
    }, [workspaceId]);


  

    useEffect(()=>{
   const display=async()=>{
 await getAllTask(workspaceId)

    
   }
   display()
    },[])
   


    const handleDragEnd =async (event:DragEndEvent) => {
     
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id.toString();
        const columnId = over.id.toString();
        const moveedTask=await swapTasks(columnId,taskId)
        if(moveedTask?.success){
            
              await getAllTask(workspaceId)
        }
                   
        }

    return (
     
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <Button
                    onClick={handleCreateSpace}
                    className="rounded-sm  " variant="outline">
                    Add Space <AddIcon className="ml-1" />
                </Button>
            </div>
         <DndContext
          collisionDetection={closestCorners}
           onDragStart={(event) => {
        const task = event.active.data.current as Task;
  
        
        setActiveTask(task);
      }}
              onDragEnd={handleDragEnd}
         >

    
            <div className='w-[1200px]'>
                <div className="flex overflow-x-auto flex-nowrap z-0 scrollbar-hide  scrollbar-thin scrollbar-thumb-gray-400 auto-scroll gap-2">
                   
                   {
                    column&&column.map((title,index)=>(
                       <ColumnsListing 
                      
                       key={title._id}
                       tasks={tasks.filter((data)=>data.spaceId==title._id)}
                       title={title} workspaceId={workspaceId} index={index} />
                    ))
                   }
                        
                  
                
                </div>
            </div>
              <DragOverlay>
        {activeTask ? (
          <TaskList task={activeTask} spaceId={activeTask.spaceId} />
        ) : null}
      </DragOverlay>
                 </DndContext>
        </div>
   
    );
};

export default BasicSpace;



