// Main JavaScript file for PICT Mobile Website

$(document).ready(function() {
    // Initialize page transitions
    $.mobile.defaultPageTransition = 'slide';
    
    // Add active class to current navigation item
    $(document).on('pageshow', function() {
        var currentPage = $.mobile.activePage.attr('id');
        $('div[data-role="navbar"] a').removeClass('ui-btn-active');
        $('div[data-role="navbar"] a').each(function() {
            if ($(this).attr('href').indexOf(currentPage) !== -1) {
                $(this).addClass('ui-btn-active');
            } else if ($(this).attr('href') === 'index.html' && currentPage === 'home') {
                $(this).addClass('ui-btn-active');
            }
        });
    });
    
    // Form validation
    $('form').on('submit', function(e) {
        e.preventDefault();
        
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        
        if (name === '' || email === '' || message === '') {
            alert('Please fill all required fields.');
            return false;
        }
        
        // Simulate form submission
        alert('Thank you for your message, ' + name + '! We will get back to you soon.');
        $(this)[0].reset();
    });
    
    // Collapsible content enhancement
    $('.ui-collapsible-heading').on('click', function() {
        var header = $(this);
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: header.offset().top - 60
            }, 200);
        }, 300);
    });
    
    // Panel closing
    $('#nav-panel ul li a').on('click', function() {
        $('#nav-panel').panel('close');
    });
    
    // Enhance list items with dynamic icons
    $('ul[data-role="listview"] > li').each(function() {
        var text = $(this).text().toLowerCase();
        if (text.indexOf('admission') !== -1) {
            $(this).attr('data-icon', 'arrow-r');
        } else if (text.indexOf('placement') !== -1) {
            $(this).attr('data-icon', 'star');
        }
    });
});

// Function to handle dynamically loaded content
$(document).on('pagebeforeshow', function() {
    // Refresh widgets that may have been added dynamically
    $('.ui-content').trigger('create');
});

// Function to scroll to top when user taps header
$(document).on('tap', '.ui-header', function() {
    $('html, body').animate({ scrollTop: 0 }, 300);
});

// Function to scroll to collapsible content when opened
$(document).on('collapsibleexpand', '.ui-collapsible', function() {
    var collapsible = $(this);
    setTimeout(function() {
        $.mobile.silentScroll(collapsible.offset().top - 50);
    }, 300);
});