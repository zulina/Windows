const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        // скрываем весь контент
        content.forEach(item => {
            item.style.display = 'none'
        });

        // убираем активность на табах
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        // показываем контент выбранного таба
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    // навешиваем обработчик на общую область табов
    header.addEventListener('click', (e) => {
        const target = e.target;
        // убираем точку из селектора - получаем класс
        if (target && (target.classList.contains(tabSelector.replace(/\./, "")) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export const setDefaultTab = (tabSelector, activeClass) => {
    const tab = document.querySelectorAll(tabSelector);

    // убираем активность на табах
    tab.forEach(item => {
        item.classList.remove(activeClass);
    });

    tab[0].classList.add(activeClass);
}

export default tabs;