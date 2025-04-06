import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Para resolver __dirname e __filename no ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, "../images");
const outputDir = path.resolve(__dirname, "../public/images");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function convertImage(filePath, outputFilePath) {
  return sharp(filePath)
    .avif({ quality: 50 })
    .toFile(outputFilePath)
    .then(() => console.log(`✔ Convertido: ${outputFilePath}`))
    .catch((err) => console.error(`✖ Erro ao converter ${filePath}:`, err));
}

function walkAndConvert(currentPath, relativePath = "") {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentPath, entry.name);
    const relPath = path.join(relativePath, entry.name);
    const destPath = path.join(outputDir, relPath);

    if (entry.isDirectory()) {
      ensureDir(destPath);
      walkAndConvert(fullPath, relPath);
    } else if (
      entry.isFile() &&
      path.extname(entry.name).toLowerCase() === ".png"
    ) {
      const outputFilePath = destPath.replace(/\.png$/i, ".avif");
      convertImage(fullPath, outputFilePath);
    }
  }
}

ensureDir(outputDir);
walkAndConvert(inputDir);
