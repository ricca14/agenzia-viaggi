// $('.col.grid_element_box').on('touchstart touchend click', function (e) {
//     console.log(event.type);
//     e.preventDefault();
//     $(this).toggleClass('hover_effect');
// });

$('.continenti .grid_element_box_child').on('click', function () {
    if ($(this).hasClass('selected')) {
        console.log('Continente già selezionato');
    }
    else {
        $('.continenti .grid_element_box_child').removeClass('selected');
        $(this).addClass('selected');
        
        // Gestione etichette piccine
        var c = $('.continenti .grid_element_box_child_label');
        for (var i = 0; i < c.length; i++) {
            if ($(c[i]).hasClass('holiday-green')) {
                $(c[i]).removeClass('holiday-green');
                $(c[i]).addClass('holiday-blue');
            }
        }
        var child = $(this).children()[0];
        $(child).removeClass('holiday-blue');
        $(child).addClass('holiday-green');

        $('.grid_element_box.continenti').removeClass('holiday-green').removeClass('hover_effect');
        $($(this).parent()[0]).addClass('hover_effect');

        // CAPIRE COME RENDERE LA COSA PIÙ SELEZIONABILE

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


$('.grid_element_box.nazioni').on('click', function () {

    console.log('NAZIONI');

    // if ($(this).hasClass('selected')) {
    //     console.log('Continente già selezionato');
    // }
    // else {
    //     $('.nazioni .grid_element_box_child').removeClass('selected');
    //     $(this).addClass('selected');

    //     // Gestione etichette piccine
    //     var c = $('.nazioni .grid_element_box_child_label');
    //     for (var i = 0; i < c.length; i++) {
    //         if ($(c[i]).hasClass('holiday-green')) {
    //             $(c[i]).removeClass('holiday-green');
    //             $(c[i]).addClass('holiday-blue');
    //         }
    //     }
    //     var child = $(this).children()[0];
    //     $(child).removeClass('holiday-blue');
    //     $(child).addClass('holiday-green');

    //     $('.grid_element_box.nazioni').removeClass('holiday-green').removeClass('hover_effect');
    //     $($(this).parent()[0]).addClass('hover_effect');
    // }
});