'use client';

import React from "react";
import clsx from "clsx";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    register,
    required,
    errors,
    type = 'text',
    disabled
}) => {
    return (
        <div className="relative">
            <input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, { required })}
                className={`
                block
                rounded-md
                px-6
                pt-6
                pb-1
                w-full
                text-md
                text-white
                bg-neutral-700
                appearance-none
                focus:outline-none
                focus:right-0
                peer
                `}
                placeholder=""
            />
            <label
                htmlFor={id}
                className={clsx(`
                absolute
                text-md
                text-zinc-400
                duration-150
                transform
                -translate-y-3
                scale-75
                top-4
                z-10
                origin-[0]
                left-6
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-3`,
                    errors[id] && 'focus:ring-rose-500',
                    disabled && 'opacity-50 cursor-default'
                )}
            >
                {label}
            </label>
        </div>
    );
}

export default Input;