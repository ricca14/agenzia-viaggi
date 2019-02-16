function setNazione(id) {
    div_nazione = document.getElementById('nazione-' + id);
    $('#nazione').val(id);
    
    if ($(div_nazione).hasClass('selected')) {
        console.log('Nazione già selezionato');
    }
    else {
        showLoader();

        $('.nazioni .grid_element_box_child').removeClass('selected');
        $(div_nazione).addClass('selected');
        setSelectedAndLabel($('.nazioni .grid_element_box_child_label'), $(div_nazione));

        // Rimuovo loader e rendo visibili nel caso le nazioni
        showElement($('#anchorInformazioni'));
        hideLoader();
        $('#collapseInformazioni').addClass('show');

        // Animazione scroll verso nazioni
        scrollToAnchor('#anchorInformazioni', 1250);
    }
}

$('.continenti .grid_element_box_child').on('click', function () {
    if ($(this).hasClass('selected')) {
        console.log('Continente già selezionato');
    }
    else {
        showLoader();
        $('.continenti .grid_element_box_child').removeClass('selected');
        $(this).addClass('selected');
        setSelectedAndLabel($('.continenti .grid_element_box_child_label'), $(this));

        // Per sicurezza nascondo la parte delle informazioni
        hideElement($('#anchorInformazioni'));
        $('#collapseInformazioni').removeClass('show');
        
        $('.grid_element_box.continenti').removeClass('holiday-green').removeClass('hover_effect');
        $($(this).parent()[0]).addClass('hover_effect');

        var continente = this.getElementsByTagName('INPUT')[0].value;
        $('#continente').val(continente);
        $.ajax({
            type: "GET",
            url: '/continente/' + continente,
            success: function (data) {
                // Rimuovo tutti gli elementi HTML per poi sostituirli
                addHTML('collapseNazioni', data);

                // Rimuovo loader e rendo visibili nel caso le nazioni
                showElement($('#anchorNazioni'));
                hideLoader();
                $('#collapseNazioni').addClass('show');

                // Animazione scroll verso nazioni
                scrollToAnchor('#anchorNazioni', 1250);
            },
            error: function (request, status, error) {
                hideLoader();
                alert(request.responseText);
            } 
        });
    }
});

// SUBMIT FORM CREA VACANZA
function onSubmitForm() {
    $('#richiesta-vacanza').submit();
}
$('#richiesta-vacanza').on('submit', function (e) {
    e.preventDefault();
    // if the validator does not prevent form submit
    if (validateForm()) {
        showLoader()
        $.ajax({
            type: "POST",
            url: "/vacanze/crea-vacanza",
            data: $(this).serialize(),
            success: function (data) {
                // data = JSON object that contact.php returns
                hideLoader();
                $("#confirmModal").modal();
            },
            error: function (request, status, error) {
                hideLoader();
                alert(request.responseText);
            } 
        });
        return false;
    }
});




function scrollToAnchor(anchor, timer=0) {
    $('html, body').animate({
        'scrollTop': $(anchor).offset().top
    }, timer);
}
function addHTML(label, data) {
    var element = document.getElementById(label);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    $('#' + label).append(data);
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
function setSelectedAndLabel(list, element) {
    for (var i = 0; i < list.length; i++) {
        $(list[i]).removeClass('holiday-green').addClass('holiday-blue');
    }
    var child = element.children()[0];
    $(child).removeClass('holiday-blue');
    $(child).addClass('holiday-green');
}