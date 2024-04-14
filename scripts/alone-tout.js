import { checkWeather, genererElements, trierElementsCroissant, trierElementsDecroissant, gererChangementContinent, gererChangementBudgetMax, hideAllFiches, scrollToElementAndShowFiches } from "./script.js";

// Récupération des pièces depuis le fichier JSON
const reponseTout = await fetch("/json/alone-tout.json");
const elementsTout = await reponseTout.json();

await checkWeather(elementsTout);
genererElements("tout", elementsTout);

document.querySelector('.tout').addEventListener('click', function () {
    hideAllFiches();
    scrollToElementAndShowFiches('.fiches-section', '.tout-fiches');
})

const boutonTrierCroissant = document.querySelector(".btn-trierC");
boutonTrierCroissant.addEventListener("click", function () {
    trierElementsCroissant("tout", elementsTout);
});

const boutonTrierDecroissant = document.querySelector(".btn-trierD");
boutonTrierDecroissant.addEventListener("click", function () {
    trierElementsDecroissant("tout", elementsTout);
});

document.querySelector('.continent-form').addEventListener('change', function () {
    gererChangementContinent("tout", elementsTout);
});

gererChangementBudgetMax("tout", elementsTout);
