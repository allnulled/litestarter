#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const node_bin = process.argv.shift();
const litestarter_bin = process.argv.shift();
const output = path.resolve(process.argv.shift());

const copyDirectory = async function(src, dest) {
  try {
    // Leer los archivos y directorios en el directorio fuente
    const items = await fs.promises.readdir(src);
    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stats = await fs.promises.stat(srcPath);
      if (stats.isDirectory()) {
        if(!fs.existsSync(destPath)) {
          await fs.promises.mkdir(destPath);
        }
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }
    console.log("Directorio copiado con éxito");
  } catch (err) {
    console.error("Error al copiar el directorio:", err);
  }
}

copyDirectory(__dirname + "/starter", output);

Install_packages_if_needed_or_fail_silently: {
  try {
    require("child_process").execSync("npm install", {
      stdio: [ process.stdin, process.stdout, process.stderr ],
      cwd: output
    });
  } catch (error) {
    
  }
}