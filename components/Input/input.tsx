const Input = ({ type = "text", placeholder = "" }) => {
    return (
        <div className="relative">
            <input
                id="email"
                type={type}
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
                placeholder={placeholder}
            />
            <label htmlFor="email">

            </label>
        </div>
    );
}

export default Input;