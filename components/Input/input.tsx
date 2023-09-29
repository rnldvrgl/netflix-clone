const Input = ({ type = "text" }) => {
    return (
        <div>
            <input
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
            />
        </div>
    );
}

export default Input;