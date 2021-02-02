PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence( "intro", "preload_prac_block", "prac_block", "bye" )


CheckPreloaded("intro", 5000)
    .label("intro");   


CheckPreloaded("prac_block", 5000)
    .label("preload_prac_block");   

CheckPreloaded("bye", 5000)
    .label("bye");   


newTrial( "intro" ,
    newImage("intro.jpg")
        .size( 800 , 700 )      // Resize the image to 150x250px
        .print()
        ,
        newKey(" ")
        .wait()
)

newTrial("ID",
newText("<p>Prolific ID:</p>")
        .print()
    ,
    newTextInput()
        .print()
        .wait()                 // The next command won't be executed until Enter is pressed
        .setVar( "Prolific ID" )
        // This setVar command stores the value from the TextInput element into the Var element
)


// This Template command generates as many trials as there are rows in myTable.csv
Template ( GetTable ( "prac_block.csv" ) ,
	    prac_block  =>
	    newTrial ( "prac_block" ,
		      defaultText
		      .print()
		      ,
	    newImage ( "fixation_cross" ,  "fixation.jpg" )
	        . size ( 300 ,  300 )
	        . print ( )
	        . log ( )
	    ,
	    newTimer ( "prac_fixation" ,  500 )
	        . start ( )
	        . wait ( )
	    ,
	    getImage ( "fixation_cross" )
	        . remove ( )
	    ,
	    newImage ( "prac_picture" ,  prac_block . picture )
	        . size ( 300 ,  300 )
	        . print ( )
	    ,
	    newTimer ( "prac_trial" ,  2000 )
	        . start ( )
	        . wait ( )
	        . log ( )
	    ,
	    getImage ( "prac_picture" )
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
