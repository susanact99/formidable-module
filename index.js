const express = require("express");
const formidable = require("formidable");
const fs = require("fs");

const app = express();

// Verifica que la carpeta de subida exista
const uploadDir = __dirname + '/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use(express.static(__dirname + '/public'));
// Servir el formulario
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Manejar la subida de archivos
app.post('/', (req, res) => {
    const form = new formidable.Formidable({
        uploadDir: uploadDir, // Directorio donde guardar los archivos
        keepExtensions: true, // Mantener la extensión original del archivo
        multiples: true, // Permitir múltiples archivos
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Error procesando el formulario:", err);
            return res.status(500).send("Error al subir el archivo");
        }

        // Manejar archivos subidos
        if (Array.isArray(files.upload)) {
            files.upload.forEach(file => {
                console.log("Archivo subido:", file.originalFilename);
            });
        } else if (files.upload) {
            console.log("Archivo subido:", files.upload.originalFilename);
        } else {
            console.error("No se subió ningún archivo");
        }

        res.sendFile(__dirname + '/index.html');
    });
});

// Iniciar el servidor
app.listen(5000, () => {
    console.log("App is running on port 5000");
});
