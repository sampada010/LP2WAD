$(document).ready(function() {
    
    // Show loading animation
    function showLoading() {
        $.mobile.loading('show', {
            text: 'Loading...',
            textVisible: true,
            theme: 'b',
            textonly: false
        });
    }
    
    // Hide loading animation
    function hideLoading() {
        $.mobile.loading('hide');
    }
    
    // Add page transition events
    $(document).on('pagebeforeshow', function() {
        showLoading();
    });
    
    $(document).on('pageshow', function() {
        hideLoading();
        animateElements();
    });
    
    // Form validation and submission
    $('#messageForm').on('submit', function(e) {
        e.preventDefault();
        
        // Show sending message
        $.mobile.loading('show', {
            text: 'Sending message...',
            textVisible: true,
            theme: 'b',
            textonly: false
        });
        
        // Simulate sending message (in a real app, this would be an AJAX call)
        setTimeout(function() {
            $.mobile.loading('hide');
            
            // Show success message
            $('<div>').simpledialog2({
                mode: 'button',
                headerText: 'Success',
                headerClose: true,
                buttonPrompt: 'Your message has been sent successfully! I will get back to you soon.',
                buttons: {
                    'OK': {
                        click: function() { 
                            // Clear form
                            $('#messageForm')[0].reset();
                        },
                        icon: 'check',
                        theme: 'b'
                    }
                }
            });
        }, 2000);
    });
    
    // Animate skill bars on skills page
    function animateSkillBars() {
        if ($('#skills').length) {
            $('.skill-item').each(function(i) {
                var $this = $(this);
                setTimeout(function() {
                    var value = $this.find('input[type="range"]').val();
                    $this.find('input[type="range"]').val(0).animate({value: value}, {
                        duration: 1000,
                        step: function(now) {
                            $(this).val(now);
                            $(this).slider('refresh');
                        }
                    });
                }, i * 200);
            });
        }
    }
    
    // Animate elements based on current page
    function animateElements() {
        // Animate profile image on home page
        if ($('#home').length) {
            $('.profile-container').hide().fadeIn(800);
        }
        
        // Animate about sections
        if ($('#about').length) {
            $('.about-section').each(function(i) {
                $(this).hide().delay(i * 300).fadeIn(800);
            });
        }
        
        // Animate project list
        if ($('#projects').length) {
            $('.project-list li').each(function(i) {
                $(this).hide().delay(i * 200).fadeIn(600);
            });
        }
        
        // Animate skill bars
        if ($('#skills').length) {
            animateSkillBars();
        }
        
        // Animate contact methods
        if ($('#contact').length) {
            $('.contact-method').each(function(i) {
                $(this).hide().delay(i * 200).fadeIn(600);
            });
            $('.social-links').hide().delay(600).fadeIn(800);
            $('.contact-form').hide().delay(1000).fadeIn(800);
        }
    }
    
    // Handle window resize events
    $(window).resize(function() {
        // Adjust any layout if needed
    });
    
    // Initialize page transitions
    $('body').pagecontainer({
        transition: 'slide'
    });
    
    // Fix for simpledialog2 if jQuery Mobile is updated
    try {
        if ($.mobile.sdCurrentDialog) {
            $.mobile.sdCurrentDialog.on('click', function() {
                return false;
            });
        }
    } catch(e) {
        // simpledialog2 not available
    }
    
    // Theme switcher (optional feature)
    function switchTheme(newTheme) {
        var themes = 'a b c d e';
        $('div[data-role="page"]').removeClass('ui-page-theme-' + themes)
            .addClass('ui-page-theme-' + newTheme);
            
        $('div[data-role="header"], div[data-role="footer"]').removeClass('ui-bar-' + themes)
            .addClass('ui-bar-' + newTheme);
    }
    
    // Uncomment to add theme switcher functionality
    /*
    $('#theme-selector').on('change', function() {
        switchTheme($(this).val());
    });
    */
    
    // Initialize animations
    animateElements();
});