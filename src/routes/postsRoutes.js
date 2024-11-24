// Importa o módulo express para criar o servidor web
import express from "express";

// Importa os controladores para as rotas de posts
import { createNewPost, listAllPosts, updateNewPost, uploadImage } from "../controllers/postsController.js";

// Importa o módulo multer para lidar com o upload de arquivos
import multer from "multer";

import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

// Configura o armazenamento do multer para salvar as imagens em 'uploads/' com o nome original do arquivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do middleware multer com a configuração de armazenamento definida
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {

    // Habilita o processamento de JSON no corpo das requisições
    app.use(express.json());

    app.use(cors(corsOptions))

    // Define a rota GET /posts para retornar todos os posts, usando o controlador listAllPosts
    app.get("/posts", listAllPosts);

    // Define a rota POST /posts para criar um novo post, usando o controlador createNewPost
    app.post("/posts", createNewPost);

    // Define a rota POST /upload para fazer upload de uma imagem, usando o middleware upload.single("image") para processar o arquivo e o controlador uploadImage
    app.post("/upload", upload.single("image"), uploadImage)

    app.put("/upload/:id", updateNewPost);

};

// Exporta as rotas para serem usadas na aplicação principal
export default routes;
