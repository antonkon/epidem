function validateName(id) {
    var name = document.getElementById(id);
    if (name.value != "") {
        name.parentNode.classList.remove('has-warning');
        name.parentNode.classList.add("has-success");
        return true;
    } else {
        name.parentNode.classList.add('has-warning');
        return false;
    }
}

function validateEmail(id) {
    var email = document.getElementById(id);
    if (checkEmail(email.value)) {
        email.parentNode.classList.remove('has-error');
        email.parentNode.classList.add("has-success");
        return true;
    } else {
        email.parentNode.classList.add('has-error');
        return false;
    }
}

function validateNumber(id) {
	var number = document.getElementById(id);
    if (checkNumber(number.value)) {
        number.parentNode.classList.remove('has-error');
        number.parentNode.classList.add("has-success");
        return true;
    } else {
        number.parentNode.classList.add('has-error');
        return false;
    }
}
function checkNumber(number) {
	if (number == "") {
        return false;
    } else {
        var valid = /^[0-9]{10,11}$/.test(number);
        if (valid) {
            return true;
        } else {
            return false;
        }
    }
}

function validatePassword(id) {
    var pwd = document.getElementById(id);

    if (pwd.value.toString().length <= 5) {
        pwd.parentNode.classList.add('has-error');
        return false;
    } else {
        pwd.parentNode.classList.remove('has-error');
        pwd.parentNode.classList.add("has-success");
        return true;
    }
}

function validatePasswordC(id, id_c) {
    var pwd = document.getElementById(id);
    var pwd_c = document.getElementById(id_c);

    if (pwd.value != pwd_c.value) {
        pwd.parentNode.classList.add('has-error');
        return false;
    } else {
        pwd.parentNode.classList.remove('has-error');
        pwd.parentNode.classList.add("has-success");
        return true;
    }
}

function checkEmail(email) {
    if (email == "") {
        return false;
    } else {
        var valid = /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
        if (valid) {
            return true;
        } else {
            return false;
        }
    }
}

function focusField(id) {
    var name = document.getElementById(id);
    name.parentNode.classList.remove("has-warning");
    name.parentNode.classList.remove("has-error");
    name.parentNode.classList.remove("has-success");
}