import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public")); // Membuat file gambar menjadi static file
app.use(ProductRoute);

app.listen(6000, () => console.log("Server Ruuning"));
