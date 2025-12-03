import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const TextAreaForm = ({ name, placeholder, label, value, onChange }) => {
  return (
    <div className="grid gap-3">
        <Label htmlFor={name}>{label}</Label>
        <Textarea name={name} placeholder={placeholder} value={value} onChange={onChange} 
        className="w-full border rounded-lg p-3 min-h-[100px] resize-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
  )
}
export default TextAreaForm