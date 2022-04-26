export interface ISelectProps {
  id: string
  label: string
  data: Nullable<string[]>
  callback: VoidFunc<string>
}
