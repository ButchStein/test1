function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];

    //add reference to the input node
    this.inputNode = input;

    //trigger method to attach the listener
    this.registerListener();
}

CustomValidation.prototype = {
    addInvalidity: function (message) {
        this.invalidities.push(message);
    },
    getInvalidities: function () {
        return this.invalidities.join('. \n');
    },
    checkValidity: function (input) {
        for (var i = 0; i < this.validityChecks.length; i++) {

            var isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }

            var requirementElement = this.validityChecks[i].element;

            if (requirementElement) {
                if (isInvalid) {
                    requirementElement.classList.add('invalid');
                    requirementElement.classList.remove('valid');
                } else {
                    requirementElement.classList.remove('invalid');
                    requirementElement.classList.add('valid');
                }

            } // end if requirementElement
        } // end for
    },
    checkInput: function () {

        this.inputNode.CustomValidation.invalidities = [];
        this.checkValidity(this.inputNode);

        if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
            this.inputNode.setCustomValidity('');
        } else {
            var message = this.inputNode.CustomValidation.getInvalidities();
            this.inputNode.setCustomValidity(message);
        }
    },
    registerListener: function () {

        var CustomValidation = this;

        this.inputNode.addEventListener('keyup', function () {
            CustomValidation.checkInput();
        });


    }

};



var userphoneValidityChecks = [

    {
        isInvalid: function (input) {
            var illegalCharacters = input.value.match(/^((8|\+7)[\- ]?)?(\(? \d{3} \)?[\- ]?)?[\d\- ]{10,23}$/);
            return illegalCharacters ? false : true;
        },
        invalidityMessage: 'Введите корректный номер',
        element: document.getElementById('userphone')
    }
];

var passwordValidityChecks = [
    {
        isInvalid: function (input) {
            return input.value.length < 5;
        },
        invalidityMessage: 'Пароль не меньше 5 символов',
        element: document.getElementById('password')
    },

];



var userphoneInput = document.getElementById('userphone');
var passwordInput = document.getElementById('password');

userphoneInput.CustomValidation = new CustomValidation(userphoneInput);
userphoneInput.CustomValidation.validityChecks = userphoneValidityChecks;

passwordInput.CustomValidation = new CustomValidation(passwordInput);
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;


var inputs = document.querySelectorAll('input:not([type="submit"])');


var submit = document.querySelector('input[type="submit"');
var form = document.getElementById('log_in');

// if (CustomValidation) {
//     submit.classList.remove('disabled');
// } else {
//     submit.classList.add('disabled');
// }

function validate() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();

    }

}

// submit.addEventListener('click', validate);
form.addEventListener('submit', validate);


form.addEventListener('click', function () {

    function setCursorPosition(pos, elem) {

        elem.focus();

        if (elem.setSelectionRange) { elem.setSelectionRange(pos, pos); }

        else if (elem.createTextRange) {

            var range = elem.createTextRange();

            range.collapse(true);

            range.moveEnd("character", pos);

            range.moveStart("character", pos);

            range.select()

        }

    }



    function mask(event) {

        var matrix = "8 ( ___ ) ___-__-__",

            i = 0,

            def = matrix.replace(/\D/g, ""),

            val = this.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;

        this.value = matrix.replace(/./g, function (a) {

            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a

        });

        if (event.type == "change") {

            if (this.value.length == 2) this.value = ""

        } else setCursorPosition(this.value.length, this)

    };

    var input = document.querySelector("#userphone");

    input.addEventListener("input", mask, false);

    input.addEventListener("focus", mask, false);

    input.addEventListener("change", mask, false);
});
