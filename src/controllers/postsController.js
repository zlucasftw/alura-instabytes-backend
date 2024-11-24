import { getAllPosts } from "../models/postsModel.js";

export async function listAllPosts(req, res){

    // Chama a função getAllPosts para obter todos os posts
    const posts = await getAllPosts();

    // Retorna os posts com status 200 (OK)
    res.status(200).json(posts);

}
