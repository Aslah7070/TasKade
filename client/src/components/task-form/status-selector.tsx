/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSpaceStore } from "@/lib/store/useSpaceStore";
import { useCallback } from "react";

export default function StatusSelector({
  status,
  setStatus,
  workspaceId,
}: {
  status?: string;
  setStatus: (status: string) => void;
  workspaceId: string;
}) {

  const {createColumn,column}=useSpaceStore()



    const handleCreateList = useCallback(async () => {
     
          const lists = await createColumn(workspaceId);
          if (lists?.success) {
             
              
          }
      }, [workspaceId]);
  

  return (
    <Select value={status} onValueChange={(value) => setStatus(value)}>
      <SelectTrigger className="text-sm flex items-center gap-2 cursor-pointer w-[120px]">
        {status ? (
          <SelectValue>
            <span
              style={{
                // color: lists.find((list) => list.id === status)?.color,
                // borderColor: lists.find((list) => list.id === status)?.color,
              }}>
              {/* {lists.find((list) => list.id === status)?.title} */}
            </span>
          </SelectValue>
        ) : (
          <SelectValue>Select Status</SelectValue>
        )}
      </SelectTrigger>
      <SelectContent className="task-details-section">
      
        
        <SelectGroup
        className="bg-black"
        
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleCreateList}>
            New list +
          </Button>
             <SelectSeparator />
          {column.map((list) => (
            <SelectItem
              key={list._id}
              value={list._id}
              className={list.color?.text}
              style={{
                color: list.color?.text,
              }}>
              {list.name}
            </SelectItem>
          ))}
       
          
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
