const Input = ({ type, placeholder, defaultValue, value, disabled, name, id, onChange }) => {
  return (
    <div className="w-full">
      {name && (
        <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
          {name}
        </label>
      )}
      <input
        onChange={onChange} 
        id={id}
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value} 
        className="border w-full p-2 rounded"
      />
      
    </div>
  );
};

export default Input;

