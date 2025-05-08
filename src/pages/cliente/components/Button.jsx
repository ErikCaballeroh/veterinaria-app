const Button = ({ type = 'button', disabled = false, onClick, children, className = '' }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`bg-zinc-800 text-white rounded-md px-4 py-2 mt-2 w-full hover:bg-zinc-700 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;