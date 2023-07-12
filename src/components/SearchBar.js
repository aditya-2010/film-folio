import { useEffect, useRef } from "react";
import { useKey } from "../hooks/useKey";

export default function SearchBar({ query, onSetQuery }) {
  const inputEle = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEle.current) return;
    inputEle.current.focus();
    onSetQuery("");
  });

  useEffect(() => {
    inputEle.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEle}
    />
  );
}
