import { clearInputs } from "./forms";
import { setPropOfModalState } from './changeModalState';

const modals = (state) => {
    // привязка окна к определенному тригеру
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]');

        // при нажатии на триггер - открываем модальное окно
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                // закрываем все открытые окна
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                // для отображения модального окна
                modal.style.display = "block";
                // убираем прокрутку страницы
                document.body.style.overflow = "hidden";
                // document.body.classList.add('modal-open');

                // добавляем в объект значения по-умолчанию
                if (modalSelector === '.popup_calc') {
                    const windowForm = document.querySelector('.balcon_icons_img');
                    setPropOfModalState(state, 'form', windowForm);
                } else if (modalSelector === '.popup_calc_profile') {
                    const windowType = document.querySelector('#view_type');
                    setPropOfModalState(state, 'type', windowType);
                    // const windowProfile = document.querySelector('.checkbox');
                    // setPropOfModalState(state, 'profile', windowProfile);
                }   
            });
        });

        // при закрытии модального окна крестиком
        close.addEventListener('click', () => {
            // закрываем все открытые окна
            windows.forEach(item => {
                item.style.display = 'none';
            });

            clearInputs(state);

            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
        });

        // при нажатии на подложку
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                // закрываем все открытые окна
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                clearInputs(state);

                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');
            }
        });
    }

    // открытие формы через время
    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
         }, time);
    }

    // при нажатии на Вызвать замерщика
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    // при нажатии на Заказать обратный звонок
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    //showModalByTime('.popup', 60000);

    // при нажатии на Рассчитать стоимость
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    // при нажатии на Далее
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    // при нажатии на Далее
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};

export default modals;