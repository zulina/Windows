import "./slider"; // подключение файла, но без доступа к его внутренностям 
import modals from "./modules/modals";
import tabs from "./modules/tabs";

// скрипты будут выполняться только когда дом-структура будет готова
window.addEventListener('DOMContentLoaded', () => {
    modals();
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
});