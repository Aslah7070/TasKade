import { useSpaceStore } from '@/lib/store/useSpaceStore';
import { Column, Task } from '@/types/type';
import React, { useCallback, useState } from 'react'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { Button } from '../ui/buttons';
import { CreateTask } from './create-task';
import OutsideClickHandler from 'react-outside-click-handler';
import { DeleteDialog } from '../user/common/DeleteDialogu';
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskList } from './Task-lists';
import AddIcon from '@mui/icons-material/Add';
import { useDroppable } from '@dnd-kit/core';
type ColumnProps = {
    title: Column
    workspaceId: string
    index:number
    tasks:Task[]
}

export interface colors {
    bg: string,
    text: string
}
const colorClassMap: Record<string, { bg: string; text: string }> = {
    'red-500': { bg: 'bg-red-500', text: 'text-red-500' },
    'green-500': { bg: 'bg-green-500', text: 'text-green-500' },
    'blue-800': { bg: 'bg-blue-800', text: 'text-blue-800' },
    'orange-500': { bg: 'bg-orange-500', text: 'text-orange-500' },
    'black': { bg: 'bg-black', text: 'text-black' },
    'teal-500': { bg: 'bg-teal-500', text: 'text-teal-500' },
    'pink-800': { bg: 'bg-pink-800', text: 'text-pink-800' },
    'white': { bg: 'bg-white', text: 'text-white' },
    'gray-500': { bg: 'bg-gray-500', text: 'text-gray-500' },
};
const ColumnsListing = ({ title, workspaceId,index,tasks }: ColumnProps) => {

    
    const colors = Object.keys(colorClassMap);
 const { setNodeRef } = useDroppable({id:title._id});
    const [animationKey, setAnimationKey] = useState(0);
    const [visibleColorPickerId, setVisibleColorPickerId] = useState<string | null>(null);
    const [deletingColumnId, setDeletingColumnId] = useState<string | null>(null);
    const [editColumnIndex, setEditColumnIndex] = useState<number | null>(null);
    const { findSpaceColumns, deleteSpace, editColumn } = useSpaceStore();
    
    const handleDelete = useCallback(async (spaceId: string) => {
        setDeletingColumnId(spaceId);
        const result = await deleteSpace(spaceId);
        if (result?.success) {
            const resultc = await findSpaceColumns(workspaceId);
            if (resultc?.success) {
                setDeletingColumnId(null);
                toast.success("Deleted successfully");
            }
        }
    }, [workspaceId, deleteSpace, findSpaceColumns]);

    const handleEditColumn = (index: number) => {
        setEditColumnIndex(index);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        // Your logic here
    };

    const handleBlur = () => {
        setEditColumnIndex(null);
    };
    const updteSpace = async (spaceId: string, color: colors) => {
        const result = await editColumn(spaceId, color);
        if (result?.success) {
            await findSpaceColumns(workspaceId);
        }
        setVisibleColorPickerId(null);
    };

    
    return (
       
            <div
           
             className='flex overflow-x-auto flex-nowrap scrollbar-hide scrollbar-thin scrollbar-thumb-gray-400 auto-scroll gap-2'>

                <div
                 ref={setNodeRef}
                    key={title?._id}
                    className={` relative bg-[#7d7a7a76] border-2  ${title.color?.text ?? 'border-gray-500'} p-4 rounded-md shadow-md min-w-[16rem] min-h-[450px] relative
                                      ${deletingColumnId === title._id ? "animate__animated animate__fadeOutDown" : ""}
                                  `}
                >
                    {editColumnIndex === index ? (
                        <input
                            type="text"
                            value={title.name}
                            onChange={(e) => handleTitleChange(e, index)}
                            onBlur={handleBlur}
                            className="w-full p-1 mb-2 rounded-sm border"
                            autoFocus
                        />
                    ) : (
                        <Button
                            onClick={() => handleEditColumn(index)}
                            className="text-white bg-violet-900 rounded-sm font-semibold mb-2 font-tagesschrift"
                        >
                            <div className="overflow-x-auto scrollbar-hide whitespace-nowrap max-w-[200px]">
                                {title.name}
                            </div>
                        </Button>
                    )}
                    <div className='flex justify-between items-center'>
                        <Button
                            onClick={() => setAnimationKey((prev) => prev + 1)}
                            className="rounded-sm text-sm border h-7 space-x-0" variant="destructive" >
                            add <CreateTask animationKey={animationKey} toggleIcom={<AddIcon />} workspaceId={workspaceId} id={title._id} />
                        </Button>
                        <div
                       
                        className='flex relative items-center'>
                            <span
                                onClick={() => setVisibleColorPickerId(title._id === visibleColorPickerId ? null : title._id)}
                                className="cursor-pointer"
                            >
                                <FormatColorFillIcon />
                            </span>

                            {visibleColorPickerId === title._id && (
                                <OutsideClickHandler onOutsideClick={() => setVisibleColorPickerId(null)}>
                                    <div className="grid grid-cols-3 w-20 h-20 p-1 animate__animated animate__flipInX absolute z-50 right-1 top-12 rounded-md bg-black dark:bg-neutral-100 shadow-inner gap-1">
                                        {colors.map((color, idx) => (
                                            <div
                                                key={idx}
                                                onMouseDown={(e) => {
                                                    e.stopPropagation();
                                                    updteSpace(title._id, colorClassMap[color]);
                                                }}
                                                className={`${colorClassMap[color]?.bg ?? 'bg-gray-500'} w-5 h-5 rounded-full shadow-sm ring-1 ring-white transition-transform duration-200 transform hover:scale-125 cursor-pointer`}
                                            />
                                        ))}
                                    </div>
                                </OutsideClickHandler>
                            )}

                            <DeleteDialog

                                triggerText={<DeleteIcon />}
                                title="Delete this space?"
                                description="Are you sure you want to delete this space? This action is irreversible."
                                confirmText="Yes, delete"
                                onConfirm={() => handleDelete(title._id)}
                            />
                        </div>
                    </div >
                      {
                        tasks.map((task)=>(
                          <TaskList 
                          key={task._id}
                          task={task} spaceId={title._id} /> 
                        ))
                      }
                    

                    <p className="text-gray-500">No tasks</p>
                </div>

            </div>
   
    )
}

export default ColumnsListing
