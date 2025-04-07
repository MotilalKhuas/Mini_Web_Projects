const API_KEY = "ad582e2437ed4ea2ad601fa32f52366d";
const url =  "https://newsapi.org/v2/everything?q="

const company_logo = document.querySelector("#company-logo");
const nav_links = document.querySelector("#nav-links"); 
const search_input = document.querySelector("#search-bar > input")
const search_button = document.querySelector("#search-bar > button");
const news_container = document.querySelector("#news-container");

let activeNavLink;

async function fetchNews(query){
    let response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    let data = await response.json();
    bindData(data.articles);
}

function bindData(articles){
    news_container.innerHTML = "";

    const card_template = document.querySelector("#news-card-template");

    articles.forEach((article)=>{
        if (!article.urlToImage) return;

        const cloned_card = card_template.content.querySelector(".news-card").cloneNode(true);
        const newImg = cloned_card.querySelector(".img-box > img");
        const newsTitle = cloned_card.querySelector(".news-title");
        const newsSource = cloned_card.querySelector(".news-source"); 
        const newsDesc = cloned_card.querySelector(".news-desc");

        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });
    
        newImg.setAttribute("src", article.urlToImage);
        newsTitle.textContent = article.title;
        newsSource.textContent = `${article.source.name} · ${date}`;
        newsDesc.textContent = article.description;

        cloned_card.addEventListener("click", ()=>{
            window.open(article.url, "_blank");
        })

        news_container.append(cloned_card);
    })
}


window.addEventListener("load", ()=>fetchNews("india"));

company_logo.addEventListener("click", (event)=>{
    if(activeNavLink && activeNavLink.classList.contains("active"))
        activeNavLink.classList.remove("active");

    fetchNews("india");
})

nav_links.addEventListener("click", (event)=>{
    if(event.target.closest("button") == null) return;
    
    if(activeNavLink && activeNavLink.classList.contains("active"))
        activeNavLink.classList.remove("active");
        
    activeNavLink = event.target.closest("button");
    activeNavLink.classList.add("active");

    fetchNews(activeNavLink.textContent);
})


search_button.addEventListener("click", ()=>{

    if(search_input.value == "") return;

    if(activeNavLink && activeNavLink.classList.contains("active"))
        activeNavLink.classList.remove("active");

    fetchNews(search_input.value);
})