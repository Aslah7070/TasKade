import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Template } from "../../../consts/template.const";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import toast from "react-hot-toast";
import { useSpaceStore } from "@/lib/store/useSpaceStore";
import { Spinner } from "@/ui/spinner";


export function TemplateCard({ template }: { template: Template }) {
  const [open, setOpen] = useState(false);
  const {createSpace,createColumn,sploading,findWorkSpaces}=useSpaceStore()
  const [value, setValue] = useState(
    template.name.slice(0, template.name.length - 9) + " workspace"
  );

const handleCreate=async()=>{
  const values={
    name:value,
    description:""
  }
const workspace=await createSpace(values)


 if (workspace) {
    const createdSpace = workspace.activeWorkspaces[workspace.activeWorkspaces.length - 1];

    // Gather all column creation promises
    const columnPromises = template.spaces.flatMap((tempSpace) =>
      tempSpace.lists.map((list) =>
        createColumn(createdSpace._id, {
          name: list.name,
          color: list.color,
        })
      )
    );

    // Run all at once
    await Promise.all(columnPromises);
await findWorkSpaces()
    toast.success("Workspace and all columns created!");
    setOpen(false);
    // router.push(`/workspace/${createdSpace._id}`);
  }
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="p-4 rounded-lg shadow-md  bg-opacity-40  backdrop-blur-lg hover:bg-gradient-to-br from-purple-100 via-white to-blue-100 hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-40 dark:hover:bg-gray-800 dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-900 hover:shadow-lg cursor-pointer w-[250px] h-full overflow-hidden">
          <h3 className="mb-2 font-medium">{template.name}</h3>
          <p className="text-xs text-gray-700 dark:text-gray-400 mt-1">
            {template.description}
          </p>
          <div className="mt-2 mb-1">
            <h4 className="text-sm text-gray-800 font-medium dark:text-gray-500">
              Spaces: {template.spaces.length}
            </h4>
            <ul className="flex flex-wrap gap-1">
              {template.spaces.map((s, i) => (
                <li
                  className="text-xs bg-zinc-200 dark:bg-zinc-900 py-1 px-2 rounded w-fit"
                  key={i}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="w-full sm:w-[600px] bg-black">
        <DialogHeader>
          <DialogTitle>{template.name}</DialogTitle>
          <DialogDescription>{template.description}</DialogDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
            id={`template_form_${template.name}`}
            className="flex items-center gap-2 flex-wrap pt-4"
          >
            <Label htmlFor="title" className="flex-shrink-0 font-semibold">
              Workspace Name:
            </Label>
            <Input
              className="flex-grow"
              id="title"
              name="title"
              required
              type="text"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        </DialogHeader>

        <div className="space-y-4 py-4 max-h-[300px] overflow-auto">
          {template.spaces.map((space, index) => (
            <div key={index} className="border-b pb-4">
              <h4 className="font-semibold text-gray-800">{space.name}</h4>
              <p className="text-gray-600">{space.description}</p>
              <ul className="mt-2 flex gap-2">
                {space.lists.map((list, i) => (
                  <li
                    key={i}
                    style={{
                      background: list.color && list.color.bg,
                      color: list.color.text,
                    }}
                    className="text-sm flex-shrink-0 text-gray-500 bg-gray-100 rounded py-1 px-2"
                  >
                    {list.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form={`template_form_${template.name}`}>
           {sploading?<Spinner/>:" Create Workspace"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
