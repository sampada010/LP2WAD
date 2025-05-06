// JavaScript for PICT B.E. Course Structure website

$(document).ready(function() {
    // Initialize the page
    console.log("PICT B.E. Course Structure website initialized");
    
    // Add active class to currently opened section
    $('[data-role="collapsible"]').on('collapsibleexpand', function() {
        // Remove active class from all sections
        $('[data-role="collapsible"]').removeClass('active-section');
        
        // Add active class to the current section
        $(this).addClass('active-section');
        
        // Smooth scroll to the expanded section
        $('html, body').animate({
            scrollTop: $(this).offset().top - 60
        }, 500);
        
        // Track which section was opened (could be used for analytics)
        var sectionId = $(this).attr('id');
        console.log("Section opened: " + sectionId);
    });
    
    // Cache content for faster loading
    $(document).on("pagebeforeshow", function() {
        // Pre-load any resources if needed
        preloadContent();
    });
    
    // Add swipe functionality for mobile
    $(document).on("pagecreate", "#home", function() {
        // Enable swipe to navigate between collapsible sections
        setupSwipeNavigation();
    });
    
    // Function to preload content
    function preloadContent() {
        // This would preload any images or other resources
        // Currently just a placeholder for future enhancements
    }
    
    // Function to setup swipe navigation
    function setupSwipeNavigation() {
        var collapsibles = $('[data-role="collapsible"]');
        
        collapsibles.each(function(index) {
            $(this).on("swipeleft", function() {
                // If not the last item, open the next one
                if (index < collapsibles.length - 1) {
                    $(collapsibles[index]).collapsible("collapse");
                    $(collapsibles[index + 1]).collapsible("expand");
                }
            });
            
            $(this).on("swiperight", function() {
                // If not the first item, open the previous one
                if (index > 0) {
                    $(collapsibles[index]).collapsible("collapse");
                    $(collapsibles[index - 1]).collapsible("expand");
                }
            });
        });
    }
    
    // Function to handle orientation changes
    $(window).on("orientationchange", function(event) {
        adjustLayoutForOrientation(event.orientation);
    });
    
    function adjustLayoutForOrientation(orientation) {
        if (orientation === "portrait") {
            // Adjust layout for portrait mode
            $(".ui-content").css("padding-bottom", "60px");
        } else {
            // Adjust layout for landscape mode
            $(".ui-content").css("padding-bottom", "40px");
        }
    }
    
    // Initialize with current orientation
    var initialOrientation = window.orientation === 0 ? "portrait" : "landscape";
    adjustLayoutForOrientation(initialOrientation);
});