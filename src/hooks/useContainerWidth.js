import { useState, useEffect } from "react";

export default function useContainerWidth() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    const containerElement = document.querySelector(".container");

    setWidth(containerElement.offsetWidth);
  };

  return width;
}
