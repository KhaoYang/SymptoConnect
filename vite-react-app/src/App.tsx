import { useState } from "react";
import axios from "axios";
import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { ChatGPT } from "./ChatGPT";
import Form from "./form";

function App() {
  const navigate = useNavigate();
  const [popupText, setPopupText] = useState(" ");
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = (text: string) => {
    setPopupText(text);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <main>
        <ChatGPT />
      </main>
      <div className="title">
        <h1>SymptoConnect</h1>
      </div>
      <div className="button-container">
        <button className="button1">GPT</button>
        <button
          className="button2"
          onClick={() => handleButtonClick("This is the add more button")}
        >
          +
        </button>

        <button className="button3">o</button>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleClosePopup}>
                &times;
              </span>
              <p>{popupText}</p>
              <div className="popup-buttons">
                <button className="popup-button-left">Left Button</button>
                <button
                  className="popup-button-close"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
                <button className="popup-button-right">Right Button</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
