import calcScroll from "./calcScroll";
import { modifyBody } from "./calcScroll";

const images = () => {
    const imgPopup = document.createElement('div'),
        workSection = document.querySelector('.works'),
        bigImage = document.createElement('img'),
        scroll = calcScroll();

    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    // выравнивание контента вокруг флекс-элементов (картинки)
    imgPopup.style.justifyContent = 'center';
    // выравнивание по центру
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            bigImage.style.maxHeight = (window.innerHeight - 100)+'px';
            // document.body.style.overflow = "hidden";
            modifyBody("hidden", scroll);
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
        }

        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none';
            // document.body.style.overflow = "";
            modifyBody("", "0px");
        }

    });
};

export default images;