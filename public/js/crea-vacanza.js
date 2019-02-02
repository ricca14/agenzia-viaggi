$('.continenti .grid_element_box_child').on('click', function () {
    if ($(this).hasClass('selected')) {
        console.log('Continente già selezionato')
    }
    else {
        $('.continenti .grid_element_box_child').removeClass('selected');
        $(this).addClass('selected');
        var continente = this.getElementsByTagName('INPUT')[0].value;
        $.ajax({
            type: "GET",
            url: '/continente/' + continente,
            success: function (data) {
                $('.title-header-box.nazioni').removeClass('d-none');
                $('#collapseNazioni').append(data)
                if (!$('#collapseNazioni').hasClass('show')) {
                    $('#collapseNazioni').addClass('show')
                }
                $('html, body').animate({
                    'scrollTop': $('#anchorNazioni').offset().top
                }, 1250);
            }
        });
    }
});