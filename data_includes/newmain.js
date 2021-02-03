PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'

Sequence( "intro_ID", "consent_form", "preload_prac_block", "practice", randomize("prac_block"), "preload_bye", "bye" )

CheckPreloaded("intro_ID", 5000)
    .label("intro_ID");

CheckPreloaded("fixation_cross", 5000)
    .label("fixation_cross");
    
CheckPreloaded("consent_form", 5000)
    .label("intro_ID");

CheckPreloaded("prac_block", 5000)
    .label("preload_prac_block");

CheckPreloaded("practice", 5000)
    .label("preload_practice")

CheckPreloaded("bye", 5000)
    .label("preload_bye");   


//newTrial( "practice" ,
  //  newImage("practice.jpg")
    //    .size( 400 , 600 )      // Resize the image to 150x250px
      //  .print()
        //.center()
        //,
        //newKey(" ")
        //.wait()
//)
//newTrial("ID",
//newText("<p>Prolific ID:</p>")
  //      .print()
    //,
    //newTextInput()
      //  .print()
        //.wait()                 // The next command won't be executed until Enter is pressed
        //.setVar( "Prolific ID" )
        // This setVar command stores the value from the TextInput element into the Var element
//)


Template(GetTable("intro_ID.csv"),
    iid =>
    newTrial("intro_ID",
        defaultText
            .print()
        ,
        newText("instr_1", iid.line1)
            .center()
            .css("text-decoration","underline")
            .print()
        ,
        newButton("instr_button", "Fortfahren")
            .center()
            .size(100, 30)
            .css("border", "solid 5px white")
            .print()
            .wait()
    )
);

Template(GetTable("consent_form.csv"),
    cf =>
    newTrial("consent_form",
        defaultText
            .print()
        ,
        newText("line1", cf.line1)
            .center()
            .css("border", "solid 2px white")
        ,
        newCanvas("consent_canvas", 800, 400)
            .center()
            .add(0, 0, getText("line1"))
            .print()
        ,
        newButton("Ich stimme zu.")
            .print()
            .center()
            .log()
            .wait()
    )
);

// This Template command generates as many trials as there are rows in myTable.csv
Template ( GetTable ( "prac_block.csv" ) ,
	    prac_block  =>
	    newTrial ( "prac_block" ,
		      defaultText
		      .print()
		      ,
	    newImage ( "fixation_cross" ,  "fixation.jpg" )
	        .center()
	        . size ( 1280 ,  720 )
	        . print ( )
	        . log ( )
	    ,
	    newTimer ( "prac_fixation" ,  500 )
	        . start ( )
	        . wait ( )
	    ,
	    getImage ( "fixation_cross" )
	        . center()
	        . remove ( )
	    ,
	    newImage ( "prac_picture" ,  prac_block . picture )
	        . size ( 1280 ,  720 )
	        . print ( )
	    ,
	    newTimer ( "prac_trial" ,  2000 )
	        . start ( )
	        . wait ( )
	        . log ( )
	    ,
	    getImage ( "prac_picture" )
	        .center()
	        . remove ( )
	    ,
	     newTimer ( "post_trial" ,  1500 )
	        . start ( )
	        . wait ( )
	        . log ( )
	    )
    .log( "Participant ID" , prac_block.sub_id )
    .log( "Target" , prac_block.target )
    .log( "Distractor" , prac_block.distractor )
    .log( "Condition" , prac_block.condition )
    // Add these columns to the results lines of these Template-based trials
)


// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
newTrial( "bye" ,
    newText("Thank you for your participation!").print(),
    newButton().wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial
