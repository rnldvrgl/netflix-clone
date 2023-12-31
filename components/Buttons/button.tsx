import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    type: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, icon, className, type, disabled, loading, onClick }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`
            bg-red-600
            py-3
            text-white
            rounded-md
            w-full
            mt-10
            hover:bg-red-700
            transition
            `}
        >
            {children}
        </button>
    );
}

export default Button;