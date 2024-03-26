import React from "react";


// Component for individual perk item
export default function PerkItem({ path,name, selected, onChange }) {
  function handleCbClick(){
    onChange(name);
  }

  return (
    <label className="border p-4 my-2 flex rounded-2xl gap-2 items-center cursor-pointer" >
      <input
        type="checkbox"
        checked={selected}
        name={name}
        onChange={handleCbClick}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          height: "24px",
          width: "24px",
          fill: "currentcolor",
        }}
      >
        {path}
      </svg>
      <span>{name}</span>
    </label>
  );
}
