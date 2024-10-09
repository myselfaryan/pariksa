import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown({ options, language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className={`flex justify-center items-center gap-2 text-sm ${isOpen ? "text-gray-200" : "text-white"}`}
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {language}
        {!isOpen ? (
          <FontAwesomeIcon icon={faCaretDown} />
        ) : (
          <FontAwesomeIcon icon={faCaretUp} />
        )}
      </button>
      {isOpen ? (
        <DropdownOptions
          options={options}
          setLanguage={setLanguage}
          setIsOpen={setIsOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function DropdownOptions({ options, setLanguage, setIsOpen }) {
  return (
    <ul className="absolute z-50 bg-code-bg text-gray-300 px-2 py-2">
      {options.map((option, index) => {
        return (
          <li
            key={index}
            className="cursor-pointer hover:bg-case-bg-code px-2 py-1 rounded-md"
            onClick={() => {
              setLanguage(option);
              setIsOpen(false);
            }}
          >
            {option}
          </li>
        );
      })}
    </ul>
  );
}
