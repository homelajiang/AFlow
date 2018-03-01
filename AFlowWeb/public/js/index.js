$(document).ready(function () {
    $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: true, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover 获取焦点展开
            gutter: 0, // Spacing from edge 对齐
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        }
    );

    // setTimeout(function () {
    //     $('.dropdown-button').dropdown('open');
    // }, 3000);

});