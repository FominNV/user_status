import { FormEvent } from "react";

export interface IButtonProps {
  name: string
  loading?: boolean
  update: number
  onClick: EventFunc<FormEvent>
}
