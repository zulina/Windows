const modals = () => {
    // привязка окна к определенному тригеру
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]');

        // при открытии модального окна
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
            });
        });

        // при закрытии модального окна
        close.addEventListener('click', () => {
            // закрываем все открытые окна
            windows.forEach(item => {
                item.style.display = 'none';
            });

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

                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');
            }
        });
    }

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

    // модальные окна калькулятора
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};

export default modals;