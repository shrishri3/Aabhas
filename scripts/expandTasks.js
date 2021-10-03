// menu clicking logic
$("document").ready(function(){
    var menu = $('.collapsed-items');
    var panel = $('.left-panel');
    var header = $('h4.task-menu-header');
    /* when menu header is clicked, display menu items */
    $('.task-menu-header').click(function(event) {
        if (menu.html() == '') {
            menu.html('<hr><div class="task_menu_item" id="experiment1"><p>Objective 1</p></div><hr><div class="task_menu_item" id="experiment2"><p>Objective 2</p></div><hr><div class="task_menu_item" id="experiment3"><p>Objective 3</p></div>');
            panel.css("height", "auto");
            header.html('Work<i class="fas fa-chevron-up"></i>');
        } else {
            menu.html('');
            header.html('Work<i class="fas fa-chevron-down"></i>');
        }
    });
    /* when menu item is clicked, display modal */
    var exp_modal;
    $("div").on('click', '.task_menu_item', function(event){ // this syntax bc class didn't exist when handler attached to dom
        /* get modal name from clicked item */
        var id = event.currentTarget.id;
        /* close tool model modal */
        $('.model-container').css("display", "none");
        $('.model-viewport').empty();
        /* display experiment modal */
        exp_modal = $('.experiment-modal');
        exp_modal.css("display", "block");

        var tool_name;
        if (id == 'experiment1') {
            $('.experiment-text.heading').html('<p>Experiment 1</p>');
            $('.experiment-text.intro').html('<p>Your first objective is to find a large rock cluster and collect a sample. You found one! Now, use the correct tool to break apart the cluster into usable samples. Click on the tool you want to use below: </p>');
            /* when tool option is clicked, display result (correct/incorrect) */
            $('.tool_picker_option').click(function(event) {
                /* get tool name from clicked item */
                tool_name = event.currentTarget.id;
                if (tool_name == 'drill') {
                    $('.experiment-text.result').html('<p>Yes, the drill is used to separate sediment or gain access to deeper layers in the rock. Now that the rock has been dislodged, select the correct tool to scoop it up and place it in the sample container.</p>');
                    $('.tool_picker_option').click(function(event) {
                        tool_name = event.currentTarget.id;
                        if (tool_name == 'scoop') {
                            $('.experiment-text.result').html('<p>A scoop is used to transport larger samples into the container. Congratulations, you have completed the first objective! When you are ready to continue, move to the next site.</p>');
                            $('.tool_picker_option').click(function(event) {
                                $('.experiment-text.result').html('<p>A scoop is used to transport larger samples into the container. Congratulations, you have completed the first objective! When you are ready to continue, move to the next site.</p>');
                            });
                        } else {
                            $('.experiment-text.result').html('<p>Try again! Now that the rock has been dislodged, select the correct tool to scoop it up and place it in the sample container.</p>');
                        }
                    });
                } else {
                    $('.experiment-text.result').html('<p>Try again! Use the correct tool to break apart the cluster into usable samples.</p>');
                }
            });
        } else if (id == 'experiment2') {
            /* reset text fields */
            $('.experiment-text.heading').html('<p></p>');
            $('.experiment-text.intro').html('<p></p>');
            $('.experiment-text.result').html('<p></p>');
            /* setup experiment 2 */
            $('.experiment-text.heading').html('<p>Experiment 2</p>');
            $('.experiment-text.intro').html('<p>Your task at this site is to collect smaller samples of finer sediment and clean them so that they may be properly analyzed. Use the correct tool to scoop up the finer sediment and place it in your palm.</p>');
            $('.tool_picker_option').click(function(event) {
                tool_name = event.currentTarget.id;
                if (tool_name == 'scongs') {
                    $('.experiment-text.result').html('<p>Correct. A smaller pair of tongs with a scoop is used to collect finer, more fragile, samples. These samples however are dusty and can not be properly analyzed. Use the correct tool to remove the dust so that they may be cataloged safely.</p>');
                    $('.tool_picker_option').click(function(event) {
                        tool_name = event.currentTarget.id;
                        if (tool_name == 'brush') {
                            $('.experiment-text.result').html('<p>Yes, the dust brush is used to remove accumulated dust and debris from samples. Congratulations, you have finished the second objective! When you are ready to continue, move to zone three.</p>');
                            $('.tool_picker_option').click(function(event) {
                                $('.experiment-text.result').html('<p>Yes, the dust brush is used to remove accumulated dust and debris from samples. Congratulations, you have finished the second objective! When you are ready to continue, move to zone three.</p>');
                            });
                        } else {
                            $('.experiment-text.result').html('<p>Try again! Use the correct tool to remove the dust so the samples may be cataloged safely.</p>');
                        }
                    });
                } else {
                    $('.experiment-text.result').html('<p>Try again! Use the correct tool to scoop up the finer sediment and place it in your palm.</p>');
                }
            });
        } else if (id == 'experiment3') {
            /* reset text fields */
            $('.experiment-text.heading').html('<p></p>');
            $('.experiment-text.intro').html('<p></p>');
            $('.experiment-text.result').html('<p></p>');
            /* setup experiment 3 */
            $('.experiment-text.heading').html('<p>Experiment 3</p>');
            $('.experiment-text.intro').html("<p>The moon is covered in a layer of dust. This dust is not moved naturally however, because the moon lacks the atmosphere required to create wind. The layers of dust therefore act as a time capsule and can be used to study different aspects of the moon's history. Use the correct tool to find areas where the dust is less dense.</p>");
            $('.tool_picker_option').click(function(event) {
                tool_name = event.currentTarget.id;
                if (tool_name == 'penetrometer') {
                    $('.experiment-text.result').html('<p>You did it! A penetrometer is used to determine the consistency or hardness of a substance. Use the correct tool to carefully gather the dust samples.</p>');
                    $('.tool_picker_option').click(function(event) {
                        tool_name = event.currentTarget.id;
                        if (tool_name == 'sampler') {
                            $('.experiment-text.result').html('<p>Correct. The surface sampler utilizes a mouse-trap like contraption to press down on the dust then spring the doors shut in order to collect it. Congratulations, all three objectives have been completed. When you are ready, return to the landing site to send the samples back to Earth.</p>');
                            $('.tool_picker_option').click(function(event) {
                                $('.experiment-text.result').html('<p>Correct. The surface sampler utilizes a mouse-trap like contraption to press down on the dust then spring the doors shut in order to collect it. Congratulations, all three objectives have been completed. When you are ready, return to the landing site to send the samples back to Earth.</p>');
                            });
                        } else {
                            $('.experiment-text.result').html('<p>Try again! Use the correct tool to carefully gather the dust samples.</p>');
                        }
                    });
                } else {
                    $('.experiment-text.result').html('<p>Try again! Use the correct tool to find areas where the dust is less dense.</p>'); ///
                }
            });
        }
    });
    /* when exit button is clicked, hide modals */
    $('img.exit-icon').click(function(event) {
        $('.experiment-modal').css("display", "none");
    });
});
