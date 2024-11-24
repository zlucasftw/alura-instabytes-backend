import express from "express";
import { listAllPosts } from "../controllers/postsController.js";

const routes = (app) => {

    // Habilita o processamento de JSON no corpo das requisições
    app.use(express.json());

    // Define a rota GET /posts para retornar todos os posts
    app.get("/posts", listAllPosts);

};

export default routes;
