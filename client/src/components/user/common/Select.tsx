

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface SelectDropdownProps {
  options: { label: string; value: string,color:{bg:string,text:string} }[];
  placeholder?: React.ReactNode;
  value: string;
  onChange?: (value: string) => void;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  placeholder = "Medium",
  value,
  onChange,
}) => {
  console.log(value);
  
  const selectedOption=options.find((val)=>val.value===value)
  const borderColor=selectedOption?.color.text
  console.log("borderColor",borderColor);
  
  return (
    <Select onValueChange={onChange} >
      <SelectTrigger className={`w-[120px] ${borderColor}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="">
          {options.map((opt) => (
            <SelectItem  key={opt.value} value={opt.value} className={`${opt.color.text}`}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
