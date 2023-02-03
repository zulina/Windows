import { clearInputs } from "./forms";
import { setWindowForm } from "./forms";
import { setWindowProfile } from "./forms";
import { setPropOfModalState } from './changeModalState';
import calcScroll from "./calcScroll";
import { modifyBody } from "./calcScroll";

const modals = (state) => {
    // привязка окна к определенному тригеру
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

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
                // document.body.style.overflow = "hidden";
                // document.body.style.marginRight = `${scroll}px`;
                modifyBody("hidden", scroll);
                // document.body.classList.add('modal-open');

                // при открытии первой формы калькулятора
                if (modalSelector === '.popup_calc') {
                    // устанавливаем профиль (холодное или теплое)
                    if (item.parentNode.parentNode.childNodes[1].classList.contains('glazing_warm')) {
                        setWindowProfile("warm");
                    } else {
                        setWindowProfile("cold");
                    }
                    // устанавливаем форму балкона по-умолчанию
                    setWindowForm('.balcon_icons_img', 'do_image_more');
                    // добавляем в объект значение формы
                    const windowForm = document.querySelector('.balcon_icons_img');
                    setPropOfModalState(state, 'form', windowForm);
                // при открытии второй формы калькулятора
                } else if (modalSelector === '.popup_calc_profile') {
                    // добавляем в объект значение типа
                    const windowType = document.querySelector('#view_type');
                    setPropOfModalState(state, 'type', windowType);
                    // добавляем в объект значение профиля
                    const windowProfile = document.querySelectorAll('.checkbox');
                    if (windowProfile[0].checked) {
                        setPropOfModalState(state, 'profile', windowProfile[0], 0);
                    } else if (windowProfile[1].checked) {
                        setPropOfModalState(state, 'profile', windowProfile[1], 1);
                    }
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
            // document.body.style.overflow = "";
            // document.body.style.marginRight = `0px`;
            modifyBody("", "0px");
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
                // document.body.style.overflow = "";
                // document.body.style.marginRight = `0px`;
                modifyBody("", "0px");
                // document.body.classList.remove('modal-open');
            }
        });
    }

    // открытие формы через время
    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            // document.body.style.overflow = "hidden";
            // document.body.style.marginRight = `${calcScroll()}px`;
            modifyBody("hidden", calcScroll());
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