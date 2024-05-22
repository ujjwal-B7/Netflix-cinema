// "use client";
import { ForwardedRef, forwardRef } from "react";

interface Props {
  id: string;
  type: string;
  label: string;
  error?: string;
  // [x:string] -> represents the key of object
  // any -> represents the value of key
  // for.eg: if we send age =20,boolean=true then the key is always string 'age','boolean' but the value could be number,boolean, so any type that means any value is acceptable
  [key: string]: any;
}

const Input = forwardRef(
  (
    { id, type, label, error, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          {...rest}
          id={id}
          type={type}
          required
          className="cursor-pointer block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
          placeholder=" "
        />
        <label
          htmlFor={id}
          className="cursor-pointer absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3
      "
        >
          {label}
        </label>
        {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
      </div>
    );
  }
);
// Input.displayName = "Input";
export default Input;
