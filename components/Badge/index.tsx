import React from "react";

interface Props {
  label: string;
  onClick: () => void;
}

export default function Badge({ label, onClick }: Props) {
  return (
    <button
      className="w-full py-3 px-3 leading-none text-center whitespace-nowrap align-baseline font-semibold rounded-lg bg-white hover:bg-amber-200 active:bg-amber-300 active:opacity-75 lg:w-32"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
