// $('.col.grid_element_box').on('touchstart touchend click', function (e) {
//     console.log(event.type);
//     e.preventDefault();
//     $(this).toggleClass('hover_effect');
// });

function setNazione(id) {
    div_nazione = document.getElementById('nazione-' + id);
    if ($(div_nazione).hasClass('selected')) {
        console.log('Nazione già selezionato');
    }
    else {
        $('.nazioni .grid_element_box_child').removeClass('selected');
        $(div_nazione).addClass('selected');
        var c = $('.nazioni .grid_element_box_child_label');
        setSelectedAndLabel(c, $(div_nazione));
    }
}

function setSelectedAndLabel(list, element) {
    for (var i = 0; i < list.length; i++) {
        if ($(list[i]).hasClass('holiday-green')) {
            $(list[i]).removeClass('holiday-green');
            $(list[i]).addClass('holiday-blue');
        }
    }
    var child = element.children()[0];
    $(child).removeClass('holiday-blue');
    $(child).addClass('holiday-green');
}

$(document).ready(function () {

    $('.continenti .grid_element_box_child').on('click', function () {
        if ($(this).hasClass('selected')) {
            console.log('Continente già selezionato');
        }
        else {
            $('.continenti .grid_element_box_child').removeClass('selected');
            $(this).addClass('selected');
            
            // Gestione etichette piccine
            var c = $('.continenti .grid_element_box_child_label');
            setSelectedAndLabel(c, $(this));

            $('.grid_element_box.continenti').removeClass('holiday-green').removeClass('hover_effect');
            $($(this).parent()[0]).addClass('hover_effect');

            
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
                    $('#anchorNazioni').removeClass('d-none');
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
// });

});