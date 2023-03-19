interface ButtonProps {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    value: string;
  }
  
  const Button = ({ label, onClick, value}: ButtonProps) => {
  
    return (
      <button
      className="bg-violet-700 hover:bg-violet-400 rounded-xl shadow-lg px-4 py-2 mr-2 text-white w-full mt-4"
        onClick={onClick} value={value}
      >
        {label}
      </button>
    );
  };

  export default Button