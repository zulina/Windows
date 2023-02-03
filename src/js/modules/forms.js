import checkNumInputs from './checkNumInputs';
import { deletePropOfModalState } from './changeModalState';

// модуль для работы со всеми формами
const forms = (state) => {
    const form = document.querySelectorAll('form');

    // при вводе номера убираем всё что не цифры
    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // при отправке данных
    const postData = async (url, data) => {
        // устанавливаем значение загрузки для элемента вывода статуса
        document.querySelector('.status').textContent = message.loading;
        // для постинга всегда указываем объект с параметрами
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        // ?
        return await res.text();
    };

    // при нажатии отправки
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            // добавляем элемент для вывода статуса
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            // если это последняя форма калькулятора
            if (item.getAttribute('data-calc') === "end") {
                // добавляем все выбранные данные в калькуляторе к данным формы
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            
            // отправляем данные на сервер
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

// устанавливаем форму балкона по-умолчанию в калькуляторе
export const setWindowForm = (tabSelector, activeClass) => {
    const tab = document.querySelectorAll(tabSelector);

    // убираем активность на табах
    tab.forEach(item => {
        item.classList.remove(activeClass);
    });

    tab[0].classList.add(activeClass);
};

export const setWindowType = (windowTypeValue) => {
    const windowType = document.querySelector('#view_type');
    windowType.value = windowTypeValue;
};

export const setWindowProfile = (windowProfileValue) => {
    const windowProfile = document.querySelectorAll('.checkbox');
    switch(windowProfileValue) {
        case "cold":
            windowProfile[0].checked = true;
            windowProfile[1].checked = false;
            break;
        case "warm":
            windowProfile[0].checked = false;
            windowProfile[1].checked = true;
            break;
        case "":
            windowProfile[0].checked = false;
            windowProfile[1].checked = false;
            break;
    }
};

// очистка введенных данных
export const clearInputs = (state) => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(item => {
        // у элемента с тегом input есть свойство value
        item.value = '';
    });
    // удаляем свойства в объекте
    deletePropOfModalState(state);
};

export default forms;