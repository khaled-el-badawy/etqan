import { useEffect, useState } from "react";
import "./ScrollTopButton.css";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-top-btn ${visible ? "visible" : ""}`}
      aria-label="Scroll to top"
      onClick={onClick}
    >
      ↑
    </button>
  );
}
