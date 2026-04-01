const API = "http://localhost:3000/api/articles";

async function load() {
    const res = await fetch(API);
    const data = await res.json();
    display(data);
}

function display(list) {
    const div = document.getElementById("articles");
    div.innerHTML = "";

    list.forEach(a => {
        div.innerHTML += `
        <div class="article">
            <h3>${a.titre}</h3>
            <p>${a.contenu}</p>
            <small>${a.auteur} | ${a.categorie}</small><br><br>

            <button onclick="deleteArticle(${a.id})" class="delete">Supprimer</button>
        </div>
        `;
    });
}

async function addArticle() {
    const article = {
        titre: titre.value,
        auteur: auteur.value,
        categorie: categorie.value,
        tags: tags.value,
        contenu: contenu.value,
        date: new Date().toISOString().split("T")[0]
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article)
    });

    load();
}

async function deleteArticle(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    load();
}

async function search() {
    const q = document.getElementById("search").value;

    const res = await fetch(`${API}/search?query=${q}`);
    const data = await res.json();

    display(data);
}

async function filter() {
    const cat = document.getElementById("filtreCat").value;

    const res = await fetch(`${API}/filter?categorie=${cat}`);
    const data = await res.json();

    display(data);
}

load();