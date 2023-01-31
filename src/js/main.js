import "./slider"; // подключение файла, но без доступа к его внутренностям 
import modals from "./modules/modals";
import tabs from "./modules/tabs";
import forms from './modules/forms';
import changeModalState from "./modules/changeModalState";
import { setDefaultValuesOfCalc } from "./modules/forms";
import timer from "./modules/timer";

// скрипты будут выполняться только когда дом-структура будет готова
window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // объект для хранения выбранных данных в калькуляторе
    let modalState = {};
    // устанавливаем значения по-умолчанию для калькулятора
    setDefaultValuesOfCalc();
    // запись данных в объект
    changeModalState(modalState);

    let deadline = '2023-02-14';

    // поведение модальных окон
    modals(modalState);
    // переключение по табам Остекленение
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    // переключение по табам Отделка
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    // переключение по табам Формы балкона в калькуляторе
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    // обработка введенных данных на формах
    forms(modalState);
    // установка таймера для акции
    timer('.container1', deadline);
});