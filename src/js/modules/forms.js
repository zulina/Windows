import checkNumInputs from './checkNumInputs';

// модуль для работы со всеми формами
const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    // при вводе номера убираем всё что не цифры
    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

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

    const clearInputs = () => {
        inputs.forEach(item => {
            // у элемента с тегом input есть свойство value
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            // добавляем элемент для вывода статуса
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            // если у формы есть этот атрибут со значением 'end'
            if (item.getAttribute('data-calc') === "end") {
                // добавляем все выбранные данные в калькуляторе к данным формы
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            
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
}

export default forms;