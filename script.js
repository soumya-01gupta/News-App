const API_KEY = "d49c55d7e78f4bcb89363c523b8a4e18";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload()
{
    window.location.reload();
}

async function fetchNews(query)
{
    const pageSize = 30;
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}&pageSize=${pageSize}`);
    const data = await res.json();
    
    bindData(data.articles);
}

function bindData(articles)
{
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    //console.log(cardsContainer);
    //console.log(newsCardTemplate);

    //first empty the data and then add all the new results
    cardsContainer.innerHTML = ""; 
    
    articles.forEach((article) =>{
        //console.log("heya");
        if(!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);

    });
}


function fillDataInCard(cardClone, article)
{
    
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;  

    cardClone.firstElementChild.addEventListener('click', ()=>
    {
        window.open(article.url, "_blank");
    });

}

let currSelectedNav = null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem = document.getElementById(id);
    //if currSelectedNav is not null then remove its active class
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
});