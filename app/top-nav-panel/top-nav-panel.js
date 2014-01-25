$(document).ready(function(){
    console.log("document ready!");
    var topNavPanel = {};

    topNavPanel.hideContents = function(){
        $('.working-timetable-content').hide();
        $('.contacts-content').hide();
        $('.storage-content').hide();
        $('.history-content').hide();
    };

    topNavPanel.hideContents();

    $('.working-timetable').on('click',function(){
        topNavPanel.hideContents();
        $('.working-timetable-content').fadeIn();
    });

    $('.contacts').on('click', function(){
        topNavPanel.hideContents();
        $('.contacts-content').fadeIn();
    });

    $('.storage').on('click', function(){
        topNavPanel.hideContents();
        $('.storage-content').fadeIn();
    });

    $('.history').on('click', function(){
        topNavPanel.hideContents();
        $('.history-content').fadeIn();
    });
});