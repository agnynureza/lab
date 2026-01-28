import express from "express";
import multer from "multer";

const app = express();
const host = "localhost";
const port = 3000;
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 500000 }, //500kb
});

app.post("/uploads", (req, res) => {
  upload.single("data")(req, res, (err) => {
    if (err) {
      console.error(err);
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "Berkas terlalu besar" });
      }
      return res.status(400).json({ message: "Berkas gagal diproses" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Berkas gagal diproses" });
    }

    console.log(req.file);

    return res.json({
      message: `Berkas ${req.file.originalname} berhasil diproses!`,
    });
  });
});

app.listen(port, () => {
  console.log(`Server start at http://${host}:${port}`);
});
