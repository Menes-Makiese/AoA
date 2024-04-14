import { checkWeather, genererElements, trierElementsCroissant, trierElementsDecroissant, gererChangementContinent, gererChangementBudgetMax, hideAllFiches, scrollToElementAndShowFiches } from "./script.js";

// Récupération des pièces depuis le fichier JSON
const reponseAmuser = await fetch("/json/alone-amuser.json");
const elementsAmuser = await reponseAmuser.json();

await checkWeather(elementsAmuser);
genererElements("amuser", elementsAmuser);

document.querySelector('.amuser').addEventListener('click', function () {
    hideAllFiches();
    scrollToElementAndShowFiches('.fiches-section', '.amuser-fiches');
})

const boutonTrierCroissant = document.querySelector(".btn-trierC");
boutonTrierCroissant.addEventListener("click", function () {
    trierElementsCroissant("amuser", elementsAmuser);
});

const boutonTrierDecroissant = document.querySelector(".btn-trierD");
boutonTrierDecroissant.addEventListener("click", function () {
    trierElementsDecroissant("amuser", elementsAmuser);
});

document.querySelector('.continent-form').addEventListener('change', function () {
    gererChangementContinent("amuser", elementsAmuser);
});

gererChangementBudgetMax("amuser", elementsAmuser);
