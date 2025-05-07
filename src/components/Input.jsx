const Input = ({ id, name, type, placeholder, autoComplete, value, onChange, label, required = true }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-gray-800">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;