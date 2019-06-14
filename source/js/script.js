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
            var illegalCharacters = input.value.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,21}$/);
            return illegalCharacters ? false : true;
        },
        invalidityMessage: 'Введите корректный номер',
        element: document.getElementById('userphone')
    }
];

var passwordValidityChecks = [
    {
        isInvalid: function (input) {
            return input.value.length < 8 | input.value.length > 100;
        },
        invalidityMessage: 'This input needs to be between 8 and 100 characters',
        element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)')
    },
    {
        isInvalid: function (input) {
            return !input.value.match(/[0-9]/g);
        },
        invalidityMessage: 'At least 1 number is required',
        element: document.querySelector('label[for="password"] .input-requirements li:nth-child(2)')
    },
    {
        isInvalid: function (input) {
            return !input.value.match(/[a-z]/g);
        },
        invalidityMessage: 'At least 1 lowercase letter is required',
        element: document.querySelector('label[for="password"] .input-requirements li:nth-child(3)')
    },
    {
        isInvalid: function (input) {
            return !input.value.match(/[A-Z]/g);
        },
        invalidityMessage: 'At least 1 uppercase letter is required',
        element: document.querySelector('label[for="password"] .input-requirements li:nth-child(4)')
    },
    {
        isInvalid: function (input) {
            return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
        },
        invalidityMessage: 'You need one of the required special characters',
        element: document.querySelector('label[for="password"] .input-requirements li:nth-child(5)')
    }
];




var userphoneInput = document.getElementById('userphone');
var passwordInput = document.getElementById('password');

userphoneInput.CustomValidation = new CustomValidation(userphoneInput);
userphoneInput.CustomValidation.validityChecks = userphoneValidityChecks;

passwordInput.CustomValidation = new CustomValidation(passwordInput);
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

/* ----------------------------

	Event Listeners

---------------------------- */

var inputs = document.querySelectorAll('input:not([type="submit"])');


var submit = document.querySelector('input[type="submit"');
var form = document.getElementById('log_in');

function validate() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();
        console.log(inputs[i]);
    }
}

submit.addEventListener('click', validate);
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

        var matrix = "8 (___) ___-__-__",

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
