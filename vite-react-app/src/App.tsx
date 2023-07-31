import { useState, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import "./App.css";

import { ChatGPT } from "./ChatGPT";

function App() {
  const tableRef = useRef(null);
  const [popupText, setPopupText] = useState(" ");
  const [showPopup, setShowPopup] = useState(false);
  const [GPTshowPopup, setGPTShowPopup] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [showLeftNestedPopup, setShowLeftNestedPopup] = useState(false);
  const [leftNestedPopupText, setLeftNestedPopupText] = useState("");
  const [textInput, setTextInput] = useState("");
  const [timestampInput, setTimestampInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showImageInput, setShowImageInput] = useState(true);

  const handleButtonClick = (text: string) => {
    setPopupText(text);
    setShowPopup(true);
    setShowLeftNestedPopup(false);
    setGPTShowPopup(false);
  };
  const deleteButton = (index, e) => {
    setTableData((tableData) => {
      return tableData.filter((v, i) => i !== index);
    });
  };
  const GPThandleButtonClick = (text: string) => {
    setPopupText(text);
    setGPTShowPopup(true);
    setShowLeftNestedPopup(false);
  };
  const handleLeftNestedPopupSubmit = () => {
    if (leftNestedPopupText) {
      setTableData((prevData) => [
        ...prevData,
        { text: leftNestedPopupText, timestamp: new Date().toLocaleString() },
      ]);
      setLeftNestedPopupText("");
    }
    setShowLeftNestedPopup(false);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    setGPTShowPopup(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleRightPopupSubmit = () => {
    const timestamp = timestampInput || new Date().toLocaleString();
    setTableData((prevData) => [
      ...prevData,
      {
        image: imageFile ? URL.createObjectURL(imageFile) : "",
        text: textInput,
        timestamp,
      },
    ]);
    setImageFile(null); // Reset the image file state
    setTextInput("");
    setTimestampInput("");
    setShowImageInput(false);
    setShowPopup(false);
  };

  return (
    <>
      <div className="title-row">
        <h1>SymptoConnect</h1>
      </div>
      <div className="button-container">
        <button
          className="button1 ripple"
          onClick={() => GPThandleButtonClick("Ask Any questions you need")}
        >
          GPT
        </button>
        {GPTshowPopup && (
          <div className="popup">
            <div className="popup-content">
              <ChatGPT />
              <button className="GPTButton" onClick={handleClosePopup}>
                X
              </button>
            </div>
          </div>
        )}
        <button
          className="button2 ripple"
          onClick={() =>
            handleButtonClick("Input your symptoms and any images")
          }
        >
          +
        </button>

        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button className="button3 ripple">export</button>
        </DownloadTableExcel>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <input
                title="image"
                type="file"
                accept="image"
                onChange={handleImageChange}
              />
              <input
                type="text"
                placeholder="Text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <input
                type="text"
                placeholder="Timestamp (optional)"
                value={timestampInput}
                onChange={(e) => setTimestampInput(e.target.value)}
              />

              {/* Existing code... */}
              <div className="popup-buttons">
                <button
                  className="popup-button-right ripple"
                  onClick={() => setShowImageInput(!showImageInput)}
                >
                  {showImageInput ? "Hide Image" : "Add Image"}
                </button>
                <button
                  className="popup-button-close ripple"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
                <button
                  className="popup-button-right ripple"
                  onClick={handleRightPopupSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showLeftNestedPopup && (
        <div className="popup">
          <div className="popup-content">
            <input
              title="..."
              type="text"
              value={leftNestedPopupText}
              onChange={(e) => setLeftNestedPopupText(e.target.value)}
            />
            <button onClick={handleLeftNestedPopupSubmit}>Submit</button>
            <button onClick={() => setShowLeftNestedPopup(false)}>Close</button>
          </div>
        </div>
      )}
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Text</th>
              <th>Timestamps</th>
              <th> Image </th>
              <th>Delete Item</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.text}</td>
                <td>{item.timestamp}</td>
                <td>{item.image && <img src={item.image} alt="Captured" />}</td>
                <td>
                  <button
                    className="deleteButton ripple"
                    onClick={(e) => deleteButton(index, e)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
