import { checkWeather, genererElements, trierElementsCroissant, trierElementsDecroissant, gererChangementContinent, gererChangementBudgetMax, hideAllFiches, scrollToElementAndShowFiches } from "./script.js";

// Récupération des pièces depuis le fichier JSON
const reponseAmoureux = await fetch("/json/accompanied-amoureux.json");
const elementsAmoureux = await reponseAmoureux.json();

await checkWeather(elementsAmoureux)
genererElements("amoureux", elementsAmoureux);

document.querySelector('.amoureux').addEventListener('click', function () {
    hideAllFiches();
    scrollToElementAndShowFiches('.fiches-section', '.amoureux-fiches');
})

const boutonTrierCroissant = document.querySelector(".btn-trierC");
boutonTrierCroissant.addEventListener("click", function () {
    trierElementsCroissant("amoureux", elementsAmoureux);
});

const boutonTrierDecroissant = document.querySelector(".btn-trierD");
boutonTrierDecroissant.addEventListener("click", function () {
    trierElementsDecroissant("amoureux", elementsAmoureux);
});

document.querySelector('.continent-form').addEventListener('change', function () {
    gererChangementContinent("amoureux", elementsAmoureux);
});

gererChangementBudgetMax("amoureux", elementsAmoureux);
