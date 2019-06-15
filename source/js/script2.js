let form = document.querySelector('.form');
let submit = form.querySelector('.form__button_submit');

let user = document.getElementById('userphone');
let pass = document.getElementById('password');
let checks = function () {
    if (user.classList.contains('valid') && pass.classList.contains('valid')) {
        submit.classList.remove('disabled');
        submit.classList.add('active');
    } else {
        submit.classList.remove('active');
        submit.classList.add('disebled');
    }
}
user.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (!user.value.match(/^(8|\+7|7)[0-9]{10}$/)) {
        user.classList.remove('valid');
        user.classList.add('invalid');
    } else {
        user.classList.remove('invalid');
        user.classList.add('valid');
    };
    checks();
}
);
pass.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (pass.value.length < 5) {
        pass.classList.remove('valid');
        pass.classList.add('invalid');
    } else {
        pass.classList.remove('invalid');
        pass.classList.add('valid');
    };
    checks();
}
);

