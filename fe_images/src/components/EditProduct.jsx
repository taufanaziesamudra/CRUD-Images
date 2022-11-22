import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  // Mengambil data dari postman berdasarkan id
  const getProductById = async () => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setTitle(response.data.name); // Set title dari body
    setFile(response.data.image); // set File dari image
    setPreview(response.data.url); // Set preview untuk mengset image dai URL
  };

  // Function untuk meload image yang akan diupload
  const loadImage = (e) => {
    const image = e.target.files[0]; 
    setFile(image);
    setPreview(URL.createObjectURL(image)); //
  };


  // Function untuk mengupdate product
  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Membuat variable formData di data tersebut diambil dari FormData
    formData.append("file", file); // Menambahkan file
    formData.append("title", title); // Menambahkan title
    try {
      // Mengambil data dari patch membawa parameter id dan formdat yang sudah dibuat
      await axios.patch(`http://localhost:5000/products/${id}`, formData, { 
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updateProduct}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
