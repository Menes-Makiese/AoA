import { checkWeather, genererElements, trierElementsCroissant, trierElementsDecroissant, gererChangementContinent, gererChangementBudgetMax, hideAllFiches, scrollToElementAndShowFiches } from "./script.js";

// Récupération des pièces depuis le fichier JSON
const reponseDecouverte = await fetch("/json/alone-decouverte.json");
const elementsDecouverte = await reponseDecouverte.json();

await checkWeather(elementsDecouverte);
genererElements("decouverte", elementsDecouverte);

document.querySelector('.decouverte').addEventListener('click', function () {
    hideAllFiches();
    scrollToElementAndShowFiches('.fiches-section', '.decouverte-fiches');
})

const boutonTrierCroissant = document.querySelector(".btn-trierC");
boutonTrierCroissant.addEventListener("click", function () {
    trierElementsCroissant("decouverte", elementsDecouverte);
});

const boutonTrierDecroissant = document.querySelector(".btn-trierD");
boutonTrierDecroissant.addEventListener("click", function () {
    trierElementsDecroissant("decouverte", elementsDecouverte);
});

document.querySelector('.continent-form').addEventListener('change', function () {
    gererChangementContinent("decouverte", elementsDecouverte);
});

gererChangementBudgetMax("decouverte", elementsDecouverte);
