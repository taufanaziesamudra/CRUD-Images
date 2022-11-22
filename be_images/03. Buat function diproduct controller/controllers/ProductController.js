import Product from "../models/ProductModel.js";
import path from "path";
export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id, // Mengambil data berdasarkan id
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveProduct = (req, res) => {
  if (req.files === null)
    // Kondisi jika tidak ada file
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title; // Ambil titile di body client
  const file = req.files.file; // Ambil file dari body client
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // URL yang akan disimpan didatabase
  const allowedType = [".png", ".jpg", ".jpeg"]; // Type file yang boleh diupload

  if (!allowedType.includes(ext.toLowerCase()))
    // Kondisi type data
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    // Kondisi besar data tidak boleh lebih dari 5mb
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    // Menaruh postingan images
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Product.create({ name: name, image: fileName, url: url });
      res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateProduct = (req, res) => {};

export const deleteProduct = (req, res) => {};
