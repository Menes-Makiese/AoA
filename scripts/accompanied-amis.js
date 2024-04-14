import { checkWeather, genererElements, trierElementsCroissant, trierElementsDecroissant, gererChangementContinent, gererChangementBudgetMax, hideAllFiches, scrollToElementAndShowFiches } from "./script.js";

// Récupération des pièces depuis le fichier JSON
const reponseAmis = await fetch("/json/accompanied-amis.json");
const elementsAmis = await reponseAmis.json();

await checkWeather(elementsAmis);
genererElements("amis", elementsAmis);

document.querySelector('.amis').addEventListener('click', function () {
    hideAllFiches();
    scrollToElementAndShowFiches('.fiches-section', '.amis-fiches');
})

const boutonTrierCroissant = document.querySelector(".btn-trierC");
boutonTrierCroissant.addEventListener("click", function () {
    trierElementsCroissant("amis", elementsAmis);
});

const boutonTrierDecroissant = document.querySelector(".btn-trierD");
boutonTrierDecroissant.addEventListener("click", function () {
    trierElementsDecroissant("amis", elementsAmis);
});

document.querySelector('.continent-form').addEventListener('change', function () {
    gererChangementContinent("amis", elementsAmis);
});

gererChangementBudgetMax("amis", elementsAmis);
