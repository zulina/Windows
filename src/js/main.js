import "./slider"; // подключение файла, но без доступа к его внутренностям 
import modals from "./modules/modals";
import tabs from "./modules/tabs";
import forms from './modules/forms';
import changeModalState from "./modules/changeModalState";

// скрипты будут выполняться только когда дом-структура будет готова
window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // объект для хранения выбранных данных в калькуляторе
    let modalState = {};
    changeModalState(modalState);

    modals();
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    forms(modalState);
});