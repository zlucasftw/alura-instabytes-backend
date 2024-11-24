// Importa o módulo express para criar o servidor web
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do aplicativo Express
const app = express();
routes(app);

// Define a rota GET /posts/:id para retornar um post específico pelo ID
app.get("/posts/:id", (req, res) => {

    // Chama a função buscarPostPorID (não definida no código) para buscar um post pelo ID
    const index = buscarPostPorID(req.params.id);

    // Verifica se o post foi encontrado
    if (index === false) {
        // Se não encontrado, retorna status 400 (Bad Request)
        res.sendStatus(400);
    } else {
        // Se encontrado, retorna o post com status 200 (OK)
        res.status(200).json(index);
    }
    /* res.status(200).json(posts[index]); */

});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    // Exibe uma mensagem no console indicando que o servidor está escutando
    console.log("Servidor escutando...");
});
