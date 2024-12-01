// 引入必要的模块
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // 存储在 uploads 文件夹中
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 使用当前时间戳作为文件名
  }
});

const upload = multer({ storage });

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' data:");
    next();
  });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  res.json({ imageUrl: `http://localhost:${port}/uploads/${req.file.filename}` });
});

app.use('/uploads/', express.static(uploadDir));

app.get('/', (req, res) => {
  res.send('Hello, Image Uploader Backend!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
