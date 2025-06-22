import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/user_profiles';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const uploadstudents = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter(req, file, cb) {
    if (
      file.fieldname === 'profileImage' &&
      !file.mimetype.startsWith('image/')
    ) {
      return cb(new Error('Only image files allowed for profileImage'));
    }
    if (
      file.fieldname === 'resume' &&
      !file.mimetype.includes('pdf')
    ) {
      return cb(new Error('Only PDF allowed for resume'));
    }
    cb(null, true);
  },
});

export default uploadstudents;
