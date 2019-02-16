
$("#nome,#cognome,#telefono,#comment,#numero_persone,#fascia_prezzo,#data_da,#data_a").blur(function () {
    validated(this, Boolean(this !== null && this.value !== ""));
});

// Migliorare gestione date
// $("#data_da,#data_a").blur(function () {
//     // test per grafica da eliminare
//     // $("#confirmModal").modal();
//     validated(this, Boolean(this !== null && this.value !== ""));
// });

$("#email").blur(function () {
    validated(this, Boolean(this !== null && this.value !== "" && validateEmail(this.value)));
});

$('#confirmModal').on('hidden.bs.modal', function () {
    location.reload();
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validated(object, flag) {
    if (Boolean(flag)) {
        object.classList.remove('is-invalid');
        object.classList.add('is-valid');
    }
    else {
        object.classList.remove('is-valid');
        object.classList.add('is-invalid');
    }

    // GESTIONE SE CAMPO E REQUIRED DISALBILITO BUTTON SUBMIT
    var openSubmit = true;
    $('.form-group input').each(function () {
        if ($(this).hasClass('required') && !$(this).hasClass('is-valid')) {
            openSubmit = false;
        }
    });
    $('.form-group textarea').each(function () {
        if ($(this).hasClass('required') && !$(this).hasClass('is-valid')) {
            openSubmit = false;
        }
    });

    if (!$("#submit").hasClass('disabled') && !openSubmit) {
        $("#submit")[0].classList.add('disabled');
    }
    else if ($("#submit").hasClass('disabled') && openSubmit) {
        $("#submit")[0].classList.remove('disabled');
    }
}
function validateForm() {
    return !($("#submit").hasClass('disabled'));
}
