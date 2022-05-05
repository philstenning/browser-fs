import React, { useState } from "react";
import { useExcludedFolders } from "react-fsa-database";
export default function ExcludedFolders() {
  const [text, setText] = useState("");
  const { excludedFolders, addExcludedFolderName, deleteExcludedFolderName } =
    useExcludedFolders();

  const handleClick = () => {
    addExcludedFolderName(text);
    setText("");
  };
  
  return (
    <div>
      <h3>Excluded Folders</h3>
      <div>
        <label htmlFor="excludedFolders">
          <input
            type="text"
            name="excludedFolders"
            id="addExcludedFolderName"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button onClick={handleClick}>Add</button>
      </div>

      
      <ul>
        {excludedFolders.map((ef) => (
          <li key={ef.id}>
            {ef.name}{" "}
            <button onClick={() => deleteExcludedFolderName(ef.id)}>
              delete
            </button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
