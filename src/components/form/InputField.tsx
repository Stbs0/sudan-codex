import React from "react";

type Props = {
  children: React.ReactNode;
};

const InputField = ({ children }: Props) => {
  return (
    <div className='border-l-2 border-neutral-500 px-2 flex flex-col space-y-2'>
      {children}
    </div>
  );
};

export default InputField;
