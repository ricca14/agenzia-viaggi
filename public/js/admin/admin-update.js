function onSubmitForm(params) {
    $('#modifica_continente').submit();
}

$('#modifica_continente').on('submit', function (e) {
    e.preventDefault();
    // if the validator does not prevent form submit
    var form = document.getElementById('modifica_continente');
    var formData = new FormData(form);

    if (validateForm()) {
        showLoader();
        $.ajax({
            type: "POST",
            url: "/admin/continente",
            data: formData,
            success: function (data) {
                // data = JSON object that contact.php returns
                hideLoader();
            },
            error: function (request, status, error) {
                hideLoader();
                alert(request.responseText);
            }
        });
        return false;
    }
});

function validateForm() {
    return true;
}


function showLoader() {
    $('.loader-container').removeClass('d-none');
}
function hideLoader() {
    $('.loader-container').addClass('d-none');
}
function hideElement(element) {
    $(element).addClass('d-none');
}
function showElement(element) {
    $(element).removeClass('d-none');
}