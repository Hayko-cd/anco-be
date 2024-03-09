// multer.config.ts
import { diskStorage } from 'multer';
import * as path from 'path';

export const multerConfig = {
  dest: './uploads',
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const originalFileName = file.originalname;
      const fileExtension = path.extname(originalFileName); // Extract original file extension
      callback(null, originalFileName.replace(fileExtension, '') + '-' + uniqueSuffix + fileExtension);
    },
  }),
};
