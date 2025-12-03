import { Input } from "../ui/input";
import { Label } from "../ui/label";

const InputForm = ({
  name,
  placeholder,
  type,
  label,
  value,
  onChange,
  className,
}) => {
  return (
    <div className="grid gap-3">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={`border rounded-md p-2 ${className}`}
      />
    </div>
  );
};
export default InputForm;
