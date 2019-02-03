$('.col.grid_element_box').on('touchstart touchend', function (e) {
    e.preventDefault();
    $(this).toggleClass('hover_effect');
});

$('.continenti .grid_element_box_child').on('click', function () {
    if ($(this).hasClass('selected')) {
        console.log('Continente già selezionato');
    }
    else {
        $('.continenti .grid_element_box_child').removeClass('selected');
        $(this).addClass('selected');
        var continente = this.getElementsByTagName('INPUT')[0].value;

        $('.loader-container').removeClass('d-none');
        $.ajax({
            type: "GET",
            url: '/continente/' + continente,
            success: function (data) {
                // Rimuovo tutti gli elementi HTML per poi sostituirli
                var element = document.getElementById("collapseNazioni");
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                $('#collapseNazioni').append(data);

                // Rimuovo loader e rendo visibili nel caso le nazioni
                $('.title-header-box.nazioni').removeClass('d-none');
                $('.loader-container').addClass('d-none');
                if (!$('#collapseNazioni').hasClass('show')) {
                    $('#collapseNazioni').addClass('show');
                }

                // Animazione scroll verso nazioni
                $('html, body').animate({
                    'scrollTop': $('#anchorNazioni').offset().top
                }, 1250);
            },
            error: function (request, status, error) {
                $('.loader-container').addClass('d-none');
                alert(request.responseText);
            }
            
        });
    }
});