function onSubmitLogin() {
    $('#login-form').submit();
}

$('#login-form').on('submit', function (e) {
    e.preventDefault();
    showLoader();
    $.ajax({
        type: "POST",
        url: "/admin/login",
        data: $(this).serialize(),
        success: function (data) {
            hideLoader();
            location.reload();
        },
        error: function (request, status, error) {
            hideLoader();
            alert('ERRORE LOGIN! Utente non valido');
        }
    });
});

function showLoader() {
    $('.loader-container').removeClass('d-none');
}
function hideLoader() {
    $('.loader-container').addClass('d-none');
}