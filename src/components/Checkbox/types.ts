import { Dispatch, SetStateAction } from "react";

export interface ICheckboxProps {
  id: string
  label: string
  text: string
  checked: boolean
  setState: Dispatch<SetStateAction<boolean>>
}
