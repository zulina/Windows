const timer = (id, deadline) => {

    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        }
        return num;
    };

    // вычисление оставшихся дней, часов, минут, секунд
    const getTimeRemaning = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor(t / 1000) % 60,
            minutes = Math.floor(t / 1000 / 60) % 60,
            hours = Math.floor(t / 1000 / 60 / 60) % 24,
            days = Math.floor(t / 1000 / 60 / 60 / 24);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    // устанавливаем значения в таймер на странице с интервалом в 1 сек
    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // при открытии страницы устанавливаем чтобы перебить значения которые стоят в html
        updateClock();

        // присваивание значений элементам на странице
        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            };
        }
    };

    setClock(id, deadline);

};

export default timer;