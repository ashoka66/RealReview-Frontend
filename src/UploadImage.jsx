import React, { useState } from "react";
import axios from "axios";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState("");//privte variable with setters and getters 
  const [message, setMessage] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !location ) {
      setMessage("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("location", location);

    try {
      const response = await axios.post(
        "http://localhost:4041/image-api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Upload successful!");
      console.log(response.data);
    } catch (error) {
      setMessage("Upload failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} /><br />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} /><br />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default UploadImage;
