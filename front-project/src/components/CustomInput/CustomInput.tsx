interface CustomInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default CustomInput;