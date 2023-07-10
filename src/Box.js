import { useState } from "react";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? <span>&ndash;</span> : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
