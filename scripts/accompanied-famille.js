import { checkWeather, genererElements, trierElementsCroissant, trierElementsDecroissant, gererChangementContinent, gererChangementBudgetMax, hideAllFiches, scrollToElementAndShowFiches } from "./script.js";

// Récupération des pièces depuis le fichier JSON
const reponseFamille = await fetch("/json/accompanied-famille.json");
const elementsFamille = await reponseFamille.json();

await checkWeather(elementsFamille);
genererElements("famille", elementsFamille);

document.querySelector('.famille').addEventListener('click', function () {
    hideAllFiches();
    scrollToElementAndShowFiches('.fiches-section', '.famille-fiches');
})

const boutonTrierCroissant = document.querySelector(".btn-trierC");
boutonTrierCroissant.addEventListener("click", function () {
    trierElementsCroissant("famille", elementsFamille);
});

const boutonTrierDecroissant = document.querySelector(".btn-trierD");
boutonTrierDecroissant.addEventListener("click", function () {
    trierElementsDecroissant("famille", elementsFamille);
});

document.querySelector('.continent-form').addEventListener('change', function () {
    gererChangementContinent("famille", elementsFamille);
});

gererChangementBudgetMax("famille", elementsFamille);
