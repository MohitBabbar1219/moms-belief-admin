const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    console.log(JSON.stringify(file));
    const fileNameAndExtension = file.originalname.split('.');
    cb(null, `${Date.now()}-${fileNameAndExtension[0]}.${fileNameAndExtension[fileNameAndExtension.length - 1]}`)
  }
});
const upload = multer({storage: storage});

module.exports = upload;