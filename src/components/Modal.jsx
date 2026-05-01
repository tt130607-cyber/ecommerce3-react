import { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ onClose }) {
  const modalRoot = document.getElementById("modal-root");

  // закрытие по ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="modal">
        <button onClick={onClose}>✖</button>

        <h2>Modal Домашка</h2>
        <p>Тут может быть ваша реклама</p>
      </div>
    </div>,
    modalRoot
  );
}