
/*Supabase links*/
const SUPABASE_URL = "https://yzwyegoxlagnodxhthha.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6d3llZ294bGFnbm9keGh0aGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjIxNjgsImV4cCI6MjA5MjQ5ODE2OH0.86jdL4XbzWVNXFSv6_895-2C4jk16DiTbqN94NB2t3k";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/*Load Data*/
async function load() {
    const {data, error } = await db
        .from('responsepage')
        .select('*')
        .order("created_at", {ascending: false});


    /*error*/
    if (error) {
        console.error(error);
    }

    /*html*/
    let html = "";

    /*Load onto screen*/
    data.forEach((item) => {
        html += `<div class="item">
                       <p>${item.liked}</p>
                       <p>${item.comeback}</p>
                       <p>${item.message}</p>
                        <div class ="time">${new Date(item.created_at).toLocaleString()}</div>
                        </div>
                        <button class="delete" onclick="deleteItem(${item.id})"></button>`
    });
    document.querySelector("#item").innerHTML = html;
}
/*Create*/
async function create(){
    const { error } = await db.from('responsepage').insert([{ message: 'message'}]);
    if (error) {
        console.error(error);
        return;
    }

    document.querySelector("#item").innerHTML = "";
}
/*Delete-Btn*/

async function deleteItem(id) {
    const {error} = await db
        .from('responsepage')
        .delete()
        .eq('id', id);
    if (error) {
        console.error(error);
    }
    load()
}
/*update*/

async function updateItem(id) {
    const {error} = await db
        .from('responsepage')
        .update({message: id})
        .eq('id', id);
    if (error) {
        console.error(error);
    }
    load();
}
/*Event Submit*/
document.querySelector("#review").addEventListener("submit", async (e) => {
    e.preventDefault();

    /*consts*/
    const likedVal = document.querySelector("#liked-input");
    const comeBackVal = document.querySelector("#comeback-input");
    const message = document.querySelector("#msg-input");

    const {error} = await db
        .from('responsepage')
        .insert([{liked: likedVal, comeback: comeBackVal, message: message}]);
    /*error*/
    if (error) {
        alert("Error: " + error.message);
        return;
    };
    /*Reset values*/
    document.querySelector("#liked-input").value = "";
    document.querySelector("#comeback-input").value = "";
    document.querySelector("#msg-input").value = "";
    /*Load*/
    load();
});

/*Values*/
const likeCount = document.querySelector("#like-Count");
let likes = 0;

/*Like btn*/
document.querySelector("#like-btn").addEventListener("click", () => {

    /*Add one to likes*/
    likes++;
    /*print likes*/
    likeCount.textContent = `We have ${likes} likes`

    /*Load*/
    load()
})



/*Load*/
load();