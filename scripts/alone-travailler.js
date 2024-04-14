import { checkWeather, genererElements, trierElementsCroissant, trierElementsDecroissant, gererChangementContinent, gererChangementBudgetMax, scrollToElementAndShowFiches, hideAllFiches } from "./script.js";

// Récupération des pièces depuis le fichier JSON
const reponseTravail = await fetch("/json/alone-travailler.json");
const elementsTravail = await reponseTravail.json();

await checkWeather(elementsTravail);
genererElements("travail", elementsTravail);

document.querySelector('.travail').addEventListener('click', function () {
    hideAllFiches(); 
    scrollToElementAndShowFiches('.fiches-section', '.travail-fiches');
})

const boutonTrierCroissant = document.querySelector(".btn-trierC");
boutonTrierCroissant.addEventListener("click", function () {
    trierElementsCroissant("travail", elementsTravail);
});

const boutonTrierDecroissant = document.querySelector(".btn-trierD");
boutonTrierDecroissant.addEventListener("click", function () {
    trierElementsDecroissant("travail", elementsTravail);
});

document.querySelector('.continent-form').addEventListener('change', function () {
    gererChangementContinent("travail", elementsTravail);
});

gererChangementBudgetMax("travail", elementsTravail);
