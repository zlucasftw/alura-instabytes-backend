// Importa a função createConnection para conectar ao banco de dados
import createConnection from "../config/database.js";

// Chama a função createConnection para estabelecer a conexão com o banco de dados
const connection = await createConnection(process.env.STRING_CONEXAO);

// Acessa o banco de dados "imersao-instabytes"
const db = connection.db("imersao-instabytes");

// Acessa a coleção "posts"
const collections = db.collection("posts");

// Função assíncrona para obter todos os posts do banco de dados
export async function getAllPosts() {

    // Busca todos os documentos da coleção e retorna como um array
    return collections.find().toArray();

};

export async function createPost(newPost) {

    return collections.insertOne(newPost);

}
