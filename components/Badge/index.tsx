import React from "react";

interface Props {
  label: string;
  onClick: () => void;
}

export default function Badge({ label }: Props) {
  return (
    <button
      className="w-full py-3 px-3 leading-none text-center whitespace-nowrap align-baseline font-semibold rounded-lg hover:bg-amber-200 active:opacity-75 lg:w-32"
    >
      {label}
    </button>
  );
}
