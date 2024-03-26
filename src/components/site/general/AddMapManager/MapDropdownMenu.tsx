import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CgMenuHotdog } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
export function MapDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <CgMenuHotdog size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CiEdit />
            <span className="px-2"> Modifier</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AiOutlineDelete color="red" />
            <span className="px-2 text-red-500"> Supprimer</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
