import { Dispatch, SetStateAction } from "react";

export interface IInputProps {
  id: string
  label: string
  type: string
  error: Nullable<string>
  description: string
  setState: Dispatch<SetStateAction<string>>
}
