import { createPost, getAllPosts, updatePost } from "../models/postsModel.js";
import geminiDescriptionGeneration from "../services/geminiService.js";
import fs from "fs";

export async function listAllPosts(req, res){

    // Chama a função getAllPosts para obter todos os posts
    const posts = await getAllPosts();

    // Retorna os posts com status 200 (OK)
    res.status(200).json(posts);

};

export async function createNewPost(req, res) {
    const newPost = req.body;

    try {

        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }

};

export async function uploadImage(req, res) {
    
    const newPost = {
        descricao: req.body.descricao,
        imagem_url: req.file.originalname,
        imagem_alt: req.body.image_alt
    };

    try {

        const createdPost = await createPost(newPost);
        const updatedImage = `uploads/${createdPost.insertedId}.png`;

        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(createdPost);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }

}; 

export async function updateNewPost(req, res) {

    const id = req.params.id;
    const imageUrl = `http://localhost:3000/${id}.png`;

    try {

        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await geminiDescriptionGeneration(imageBuffer);

        const post = {
            imagem_url: imageUrl,
            descricao: description,
            imagem_alt: req.body.imagem_alt
        }

        const updatedPost = await updatePost(id, post);
        res.status(200).json(updatedPost);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }

};