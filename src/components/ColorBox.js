import { useState, useEffect } from "react";
import "./ColorBox.css";

const apiEndpoint = "https://www.thecolorapi.com/id";

export const ColorBox = ({ color, onDelete, onChange }) => {
  const [colorName, setColorName] = useState("");
  useEffect(() => {
    const fetchColorName = async () => {
      try {
        const response = await fetch(`${apiEndpoint}?hex=${color.slice(1)}`);

        if (response.ok) {
          const data = await response.json();
          setColorName(data.name.value);
        } else {
          throw new Error(`Server returned ${response.status}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (color) {
      fetchColorName();
    }
  }, [color]);

  const handleClick = () => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        alert("Copied");
      })
      .catch((err) => {
        alert("Copy failed");
      });
  };
  return (
    <div
      className="color-box"
      style={{
        backgroundColor: color,
      }}
      onClick={handleClick}
    >
      <p>{colorName}</p>
      <input
        type="text"
        value={color}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
      <div
        className="color-box__delete"
        onClick={(event) => {
          event.stopPropagation();
          onDelete();
        }}
      >
        X
      </div>
    </div>
  );
};
