import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    // для айди делаем через All чтобы создать псевдомассив
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    // записываем в объект выбранные значения на формах
    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                setPropOfModalState(state, prop, item, i, elem);
            });
        });
    }

    // при нажатии на элементы в калькуляторе
    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export const setPropOfModalState = (state, prop, item, i=0, elem=false) => {
    // устанавливаем значения объекта
    switch(item.nodeName) {
        case 'SPAN' :
            state[prop] = i;
            break;
        case 'INPUT' :
            if (item.getAttribute('type') === 'checkbox') {
                i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                // устанавливаем галочку только на выбранном
                if (elem) {
                    elem.forEach((box, j) => {
                        box.checked = false;
                        if (i == j) {
                            box.checked = true;
                        }
                    });
                }
            } else {
                state[prop] = item.value;
            }
            break;
        case 'SELECT' :
            state[prop] = item.value;
            break;
    };
    // устанавливаем доступность кнопки Далее
    if (Object.keys(state).length < 3) {
        document.querySelector('.popup_calc_button').setAttribute('disabled', 'true');
    } else if (Object.keys(state).length === 3) {
        document.querySelector('.popup_calc_button').removeAttribute('disabled');
    } else if (Object.keys(state).length < 5) {
        document.querySelector('.popup_calc_profile_button').setAttribute('disabled', 'true');
    } else if (Object.keys(state).length === 5) {
        document.querySelector('.popup_calc_profile_button').removeAttribute('disabled');
    }

    // if (elem.length > 1) {
    //     state[prop] = i;
    // } else {
    //     state[prop] = item.value;
    // }
    console.log(state);
};

export const deletePropOfModalState = (state) => {
    Object.keys(state).forEach(key => {
        delete state[key];
    });
};

export default changeModalState;