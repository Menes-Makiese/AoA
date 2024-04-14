import { checkWeather, genererElements, trierElementsCroissant, trierElementsDecroissant, gererChangementContinent, gererChangementBudgetMax, hideAllFiches, scrollToElementAndShowFiches } from "./script.js";

// Récupération des pièces depuis le fichier JSON
const reponseSeminaire = await fetch("/json/accompanied-seminaire.json");
const elementsSeminaire = await reponseSeminaire.json();

await checkWeather(elementsSeminaire);
genererElements("seminaire",elementsSeminaire);

document.querySelector('.seminaire').addEventListener('click', function () {
    hideAllFiches();
    scrollToElementAndShowFiches('.fiches-section', '.seminaire-fiches');
})

const boutonTrierCroissant = document.querySelector(".btn-trierC");
boutonTrierCroissant.addEventListener("click", function () {
    trierElementsCroissant("seminaire", elementsSeminaire);
});

const boutonTrierDecroissant = document.querySelector(".btn-trierD");
boutonTrierDecroissant.addEventListener("click", function () {
    trierElementsDecroissant("seminaire", elementsSeminaire);
});

document.querySelector('.continent-form').addEventListener('change', function () {
    gererChangementContinent("seminaire", elementsSeminaire);
});

gererChangementBudgetMax("seminaire", elementsSeminaire);
