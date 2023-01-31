import checkNumInputs from './checkNumInputs';
import { setDefaultTab } from './tabs';
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

export const setDefaultValuesOfCalc = () => {
    setDefaultTab('.balcon_icons_img', 'do_image_more');

    const windowType = document.querySelector('#view_type');
    windowType.value = "tree";
    
    // const windowProfile = document.querySelectorAll('.checkbox');
    // windowProfile.forEach(item => {
    //     item.checked = false;
    // });
    // windowProfile[0].checked = true;
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
    // устанавливаем значения по-умолчанию на формах
    setDefaultValuesOfCalc();
};

export default forms;