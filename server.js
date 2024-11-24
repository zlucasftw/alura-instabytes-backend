import express from "express";

const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato fazendo yoga",
        /* imagem: "https://placekitten.com/400/300" */
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "Gatinho dormindo",
        /* imagem: "https://placekitten.com/200/200" */
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 4,
        descricao: "Gato explorando a caixa",
        /* imagem: "https://placekitten.com/300/200" */
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 5,
        descricao: "Gato com um brinquedo",
        /* imagem: "https://placekitten.com/400/300" */
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 6,
        descricao: "Gato olhando pela janela",
        /* imagem: "https://placekitten.com/200/200" */
        imagem: "https://placecats.com/millie/300/150"
    }
]

function buscarPostPorID(id) {
    /* return posts.findIndex((post) => {
        return post.id === Number(id);
    }); */

    if (id.trim() === "" || id === null) {
        return false;
    }

    try {
        id = Number(id);
    } catch (error) {
        return false;
    }

    return posts.filter(((post) => post.id === id));
}

const app = express();
app.use(express.json());

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id);

    if (index === false) {
        res.sendStatus(400);
    } else {
        res.status(200).json(index);
    }
    /* res.status(200).json(posts[index]); */
    
});

app.listen(3000, () => {
    console.log("Servidor escutando...");
});
