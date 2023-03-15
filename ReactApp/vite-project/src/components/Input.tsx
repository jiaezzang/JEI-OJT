interface InputProps {
    label: string;
    type: string;
    id: string;
    value: any
    onChange: any;
  }
  
  const Input = ({ label, type, id, value, onChange}: InputProps) => {
  
    return (
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="username">
            {label}
        </label>
        <input
            className="border rounded-lg py-2 px-3 w-full"
            type={type}
            id={id}
            value={value}
            onChange={onChange}
        />
    </div>
    );
  };

  export default Input