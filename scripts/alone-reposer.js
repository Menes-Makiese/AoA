import { checkWeather, genererElements, trierElementsCroissant, trierElementsDecroissant, gererChangementContinent, gererChangementBudgetMax, hideAllFiches, scrollToElementAndShowFiches } from "./script.js";

// Récupération des pièces depuis le fichier JSON
const reponseReposer = await fetch("/json/alone-reposer.json");
const elementsReposer = await reponseReposer.json();

document.querySelector('.reposer').addEventListener('click', function () {
    hideAllFiches(); 
    scrollToElementAndShowFiches('.fiches-section', '.reposer-fiches');
})

await checkWeather(elementsReposer);
genererElements("reposer",elementsReposer);

const boutonTrierCroissant = document.querySelector(".btn-trierC");
boutonTrierCroissant.addEventListener("click", function () {
    trierElementsCroissant("reposer", elementsReposer);
});

const boutonTrierDecroissant = document.querySelector(".btn-trierD");
boutonTrierDecroissant.addEventListener("click", function () {
    trierElementsDecroissant("reposer", elementsReposer);
});

document.querySelector('.continent-form').addEventListener('change', function () {
    gererChangementContinent("reposer", elementsReposer);
});

gererChangementBudgetMax("reposer", elementsReposer);
