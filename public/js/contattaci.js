function onSubmitForm() {
    $('#contact-us').submit();
}
$('#contact-us').on('submit', function (e) {
    e.preventDefault();
    // if the validator does not prevent form submit
    if (validateForm()) {
        $.ajax({
            type: "POST",
            url: "/contattaci",
            data: $(this).serialize(),
            success: function (data) {
                // data = JSON object that contact.php returns
                $("#confirmModal").modal();
            }
        });
        return false;
    }
});