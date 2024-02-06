const API_KEY = "d49c55d7e78f4bcb89363c523b8a4e18";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => {
    try {
        fetchNews("latest");
    } catch (error) {
        console.error('Error fetching news on load:', error);
    }
});

function reload() {
    try {
        window.location.reload();
    } catch (error) {
        console.error('Error reloading page:', error);
    }
}

async function fetchNews(query) {
    try {
        const pageSize = 50;
        const sortBy = 'publishedAt';
        const orderBy = 'desc';

        const res = await fetch(`${url}${query}&apiKey=${API_KEY}&pageSize=${pageSize}&sortBy=${sortBy}&orderBy=${orderBy}`);
        const data = await res.json();

        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function bindData(articles) {
    try {
        const cardsContainer = document.getElementById("cards-container");
        const newsCardTemplate = document.getElementById("template-news-card");

        // first empty the data and then add all the new results
        cardsContainer.innerHTML = "";

        articles.forEach((article) => {
            if (!article.urlToImage) return;

            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
        });
    } catch (error) {
        console.error('Error binding data:', error);
    }
}

function fillDataInCard(cardClone, article) {
    try {
        const newsImg = cardClone.querySelector('#news-img');
        const newsTitle = cardClone.querySelector('#news-title');
        const newsSource = cardClone.querySelector('#news-source');
        const newsDesc = cardClone.querySelector('#news-desc');

        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;

        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });

        newsSource.innerHTML = `${article.source.name} · ${date}`;

        cardClone.firstElementChild.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });
    } catch (error) {
        console.error('Error filling data in card:', error);
    }
}

let currSelectedNav = null;

function onNavItemClick(id) {
    try {
        fetchNews(id);
        const navItem = document.getElementById(id);
        // if currSelectedNav is not null then remove its active class
        currSelectedNav?.classList.remove('active');
        currSelectedNav = navItem;
        currSelectedNav.classList.add('active');
    } catch (error) {
        console.error('Error handling nav item click:', error);
    }
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click", () => {
    try {
        const query = searchText.value;
        if (!query) return;
        fetchNews(query);
        currSelectedNav?.classList.remove('active');
        currSelectedNav = null;
    } catch (error) {
        console.error('Error handling search button click:', error);
    }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
  import { getAuth,GoogleAuthProvider,signInWithPopup,signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDr45_q5lhuxfFRDzeT6h1XqtjNzWX_UD8",
    authDomain: "news-blast-a725d.firebaseapp.com",
    projectId: "news-blast-a725d",
    storageBucket: "news-blast-a725d.appspot.com",
    messagingSenderId: "939032460704",
    appId: "1:939032460704:web:71c349c01f7aab91a338c5"
  };

  const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'en';

const provider = new GoogleAuthProvider();

// Function to handle logout
window.logout = () => {
    try {
        signOut(auth).then(() => {
            console.log('User signed out');
            window.location.href = "login.html";
        }).catch((error) => {
            console.error('Error signing out', error);
        });
    } catch (error) {
        console.error('Error handling logout:', error);
    }
};