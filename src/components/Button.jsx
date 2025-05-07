const Button = ({ type = 'button', disabled = false, onClick, children, className = '' }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;