const modals = () => {
    // привязка окна к определенному тригеру
    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);

        // при открытии модального окна
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                // для отображения модального окна
                modal.style.display = "block";
                // убираем прокрутку страницы
                document.body.style.overflow = "hidden";
                // document.body.classList.add('modal-open');
            });
        });

        // при закрытии модального окна
        close.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
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

    showModalByTime('.popup', 60000);
};

export default modals;