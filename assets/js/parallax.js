// Crear un nuevo archivo parallax.js o agregar al final del main.js

(function($) {
    "use strict";
    
    // Función para inicializar el efecto parallax
    function initParallax() {
        // Configurar el parallax para el slider
        $('.slider-area .single-slider').each(function() {
            var windowHeight = $(window).height();
            var scroll = $(window).scrollTop();
            var offset = $(this).offset().top;
            var distance = (scroll - offset) * 0.4;
            
            if ($(window).width() > 768) {
                $(this).css('background-position', 'center ' + distance + 'px');
            }
        });
        
        // Configurar parallax para otras secciones
        $('.parallax').each(function() {
            var windowHeight = $(window).height();
            var scroll = $(window).scrollTop();
            var offset = $(this).offset().top;
            var distance = (scroll - offset) * 0.5;
            
            if ($(window).width() > 768) {
                $(this).css('background-position', 'center ' + distance + 'px');
            }
        });
        
        // Efecto parallax para elementos específicos
        $('.parallax-img').each(function() {
            var scroll = $(window).scrollTop();
            var offset = $(this).offset().top;
            var distance = (scroll - offset) * 0.2;
            
            if ($(window).width() > 768) {
                $(this).css('transform', 'translateY(' + distance + 'px)');
            }
        });
    }
    
    // Ejecutar al cargar y al hacer scroll
    $(window).on('scroll', function() {
        requestAnimationFrame(initParallax);
    });
    
    $(document).ready(function() {
        initParallax();
    });
    
})(jQuery);