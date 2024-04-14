const apiKey = "a2b3be62ba1eb77e011d75ef7c72bec0";

export async function checkWeather(dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
        let ville = dataArray[i].ville;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${ville.replaceAll(' ', '+')}&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données météorologiques');
            }
            let data = await response.json();

            
            dataArray[i].temperatureMin = data.main.temp_min;
            dataArray[i].temperatureMax = data.main.temp_max;

            //console.log(`Température minimale pour ${ville}: ${data.main.temp_min}°C`);
        } catch (error) {
            console.error(`Erreur lors de la récupération des données météorologiques pour ${ville}: ${error.message}`);
            dataArray[i].temperatureMin = null;
            dataArray[i].temperatureMax = null;
        }
    }
}


function hideAllSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}


function showSection(id) {
    hideAllSections();
    document.getElementById(`${id}`).style.display = 'flex';
}
showSection('accueil');

const aText = new Array("AoC ", "Pour le voyage ", "ideal");

let iSpeed = 110;
let iIndex = 0;
let iArrLength = aText[0].length;
let iScrollAt = 20; 
let iTextPos = 0;
let iRow; 

function typewriter() {
    let sContents = '';
    iRow = Math.max(0, iIndex - iScrollAt);
    let destination = document.getElementById("typedtext");
    document.querySelector(".video.alone").style.display = "none";
    document.querySelector(".video.accompanied").style.display = "none";

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos);
    if (iTextPos++ === iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex != aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout(typewriter, iSpeed);
        } else {
            setTimeout(() => {
                setTimeout(() => {
                    document.getElementById("typedtext").style.opacity = "0";
                }, 1000);
                setTimeout(() => {
                    document.getElementById("typedtext").style.display = 'none'
                }, 1500);
                setTimeout(() => {
                    document.querySelector(".video.alone").style.display = "flex";
                    document.querySelector(".video.accompanied").style.display = "flex";
                }, 1600);
                setTimeout(() => {
                    document.querySelector(".video.alone").style.opacity = '1';
                    document.querySelector(".video.accompanied").style.opacity = '1';
                }, 2000)
            }, 600)
        }
    } else {
        setTimeout(typewriter, iSpeed);
    }
}
typewriter();


function videoHover(videoContainerClass) {
    const videoContainers = document.querySelectorAll(`.${videoContainerClass}`);

    videoContainers.forEach(videoContainer => {
        const video = videoContainer.querySelector("video");

        videoContainer.addEventListener("mouseover", () => {
            video.play();
        });

        videoContainer.addEventListener("mouseout", () => {
            video.pause();
        });
    });
}
videoHover("alone");
videoHover("accompanied");



function scrollToAloneSection() {
    const aloneSection = document.querySelector('.alone-section');
    const accompaniedSection = document.querySelector('.accompanied-section');
    const fichesSection = document.querySelector('.fiches-section');

    accompaniedSection.style.display = 'none';
    fichesSection.style.display = 'none';
    aloneSection.style.display = 'flex';

    aloneSection.scrollIntoView({ behavior: 'smooth' });
}
document.getElementById('scrollToAlone').addEventListener('click', function (event) {
    event.preventDefault();
    scrollToAloneSection();
});


function scrollToAccompaniedSection() {
    const accompaniedSection = document.querySelector('.accompanied-section');
    const aloneSection = document.querySelector('.alone-section');
    const fichesSection = document.querySelector('.fiches-section');

    aloneSection.style.display = 'none';
    fichesSection.style.display = 'none';
    accompaniedSection.style.display = 'flex';

    accompaniedSection.scrollIntoView({ behavior: 'smooth' });
}
document.getElementById('scrollToAccompanied').addEventListener('click', function (event) {
    event.preventDefault();
    scrollToAccompaniedSection();
});


function initSlider(sectionClass) {
    const section = document.querySelector(sectionClass);
    const boxList = section.querySelector(".slider-wrapper .box-list");
    const slideButtons = section.querySelectorAll(".slider-wrapper .slide-button");
    const maxScrollLeft = boxList.scrollWidth - boxList.clientWidth;

    
    slideButtons[0].style.display = 'none';

    
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.classList.contains("bef-slide") ? -1 : 1;
            const scrollAmount = boxList.clientWidth * direction;
            boxList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        })
    })

    const handleSlideButtons = () => {
        slideButtons[0].style.display = boxList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = boxList.scrollLeft <= maxScrollLeft ? "block" : "none";
    }

    boxList.addEventListener("scroll", () => {
        handleSlideButtons();
    })
}
window.addEventListener("load", () => {
    initSlider(".alone-section");
    initSlider(".accompanied-section");
});


export function hideAllFiches() {
    const fichesElements = document.querySelectorAll('.fiches');
    fichesElements.forEach(fiche => {
        fiche.style.display = 'none'
    });
}


export function genererElements(typeElement, elements) {
    const container = document.querySelector(`.${typeElement}-fiches`);

    elements.forEach(article => {
        const element = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.setAttribute("alt", `photo de${article.ville}`)
        imageElement.src = article.image;

        const villeElement = document.createElement("h2");
        villeElement.classList = "ville-element";
        villeElement.innerText = article.ville;

        const paysElement = document.createElement("h3");
        paysElement.classList = "pays-element";
        paysElement.innerText = article.pays;

        const budgetElement = document.createElement("p");
        budgetElement.classList = "budget-element";
        budgetElement.innerText = `Budget moyen/semaine: ${article.budget} €`;

        const descriptionElement = document.createElement("p");
        descriptionElement.classList = "description-element";
        descriptionElement.innerText = article.description;

        const temperaturebox = document.createElement("div");
        temperaturebox.className = "temperature-box";

        const temperatureElement = document.createElement("p");
        temperatureElement.classList = "temperature-element";
        temperatureElement.innerText = `${Math.round(article.temperatureMin)} à ${Math.round(article.temperatureMax)}°C`;
        temperaturebox.appendChild(temperatureElement);

        element.appendChild(imageElement);
        element.appendChild(villeElement);
        element.appendChild(paysElement);
        element.appendChild(descriptionElement);
        element.appendChild(budgetElement);
        element.appendChild(temperaturebox);

        container.appendChild(element);
    });
}


export function trierElementsCroissant(type, elements) {
    const elementsTriés = Array.from(elements);
    elementsTriés.sort(function (a, b) {
        return a.budget - b.budget;
    });
    document.querySelector(`.${type}-fiches`).innerHTML = "";
    genererElements(type, elementsTriés);
}


export function trierElementsDecroissant(type, elements) {
    const elementsTriés = Array.from(elements);
    elementsTriés.sort(function (a, b) {
        return b.budget - a.budget;
    });
    document.querySelector(`.${type}-fiches`).innerHTML = "";
    genererElements(type, elementsTriés);
}



export function gererChangementContinent(typeElement, elements) {
    
    const checkboxes = document.querySelectorAll(`.continent-form input[type="checkbox"]:checked`);

    if (checkboxes.length === 0) {
        document.querySelector(`.${typeElement}-fiches`).innerHTML = "";
        genererElements(typeElement, elements);
    } else {
        const filteredElements = elements.filter(element => {
            return Array.from(checkboxes).some(checkbox => element.continent === checkbox.name);
        });
        document.querySelector(`.${typeElement}-fiches`).innerHTML = "";
        genererElements(typeElement, filteredElements);
    }
}


export function gererChangementBudgetMax(typeElement, elements) {
    const inputBudgetMax = document.getElementById("budgetMax");
    inputBudgetMax.addEventListener('input', function () {
        const elementsFiltrees = elements.filter(function (element) {
            return element.budget <= inputBudgetMax.value;
        });
        document.querySelector(`.${typeElement}-fiches`).innerHTML = "";
        genererElements(typeElement, elementsFiltrees);
    });
}


export function scrollToElementAndShowFiches(elementSelector, fichesSelector) {
    const element = document.querySelector(elementSelector);
    const fiches = document.querySelector(fichesSelector);
    const filtres = document.querySelector(".filtres");
    element.style.display = 'flex';
    fiches.style.display = 'flex';
    filtres.scrollIntoView({ behavior: 'smooth' });
}
