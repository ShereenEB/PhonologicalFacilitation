PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'

Sequence( "intro_ID",
	 "consent_form",
	 "initiate_recorder",
	 "audio_check",
	 "questionnaire",
	 "preload_fam_block",
	 "familiarization",
	 randomize("fam_block"),
	 "preload_prac_block", 
	 "practice", 
	 randomize("prac_block"), 
	 "preload_bye", 
	 "bye" );

CheckPreloaded("intro_ID", 5000)
    .label("intro_ID");

CheckPreloaded("fixation_cross", 5000)
    .label("fixation_cross");
    
CheckPreloaded("consent_form", 5000)
    .label("intro_ID");

CheckPreloaded("fam_block", 5000)
    .label("preload_fam_block");
    
CheckPreloaded("prac_block", 5000)
    .label("preload_prac_block");
    
CheckPreloaded("familiarization", 5000)
    .label("familiarization");

CheckPreloaded("practice", 5000)
    .label("preload_practice")

CheckPreloaded("bye", 5000)
    .label("preload_bye");   


newTrial ("familiarization",
newImage("familiarization.jpg")
.size *1280, 720)
.print()
.center()
,
    newKey(" ")
        .wait()


newTrial( "practice" ,
  newImage("practice.jpg")
    .size( 1280 , 720 )     
  .print()
.center()
 ,
 newKey(" ")
 .wait()
)

//start the recorder and send result files to the server

Template(GetTable("intro_recorder.csv"),
    ir =>
    InitiateRecorder("https://gitup.uni-potsdam.de/elbuy/phonologicalfacilitation/tree/master/exp2", ir.line1)
        .label("initiate_recorder")
)

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


Template(GetTable("questionnaire.csv"),
    qu =>
    newTrial("questionnaire",
        defaultText
            .print()
        ,
        newText("line1", qu.line1)
            .css("border", "solid 10px white")
	    .css("background", "white")
	    .center()
        ,
        
        newText(" ").print()
        
        ,
        newTextInput("Gender")
            .size(100, 20)
            .log()
        .center()
        ,
        
         newText(" ").print()
        
        ,
        newText("line2", qu.line2)
            .after(getTextInput("Gender"))
            .print()
        .center()
        ,
        
         newText(" ").print()
        
        ,
        newDropDown("Age", "--")
            .add("18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100+")
            .print()
            .center()
            .log()
        ,
         
         newText(" ").print()
        
        ,
        newText("line3", qu.line3)
            .after(getDropDown("Age"))
            .center()
            .print()
        ,
        
         newText(" ").print()
        
        ,
        newTextInput("Language")
            .size(100, 20)
            .center()
            .log()
        ,
         
         newText(" ").print()
        
        ,
        newText("line4", qu.line4)
            .after(getTextInput("Language"))
            .center()
            .print()
        ,
        
         newText(" ").print()
        
        ,
        newImage("yes_hear", "resp_ja.jpg")
        .center()
            .size(30,20)
        ,
        
         newText(" ").print()
        
        ,
        newImage("no_hear", "resp_nein.jpg")
        .center()
            .size(30,20)
        ,
        
         newText(" ").print()
        
        ,
        newText("line5", qu.line5)
            .after(getImage("yes_hear"))
            .after(getImage("no_hear"))
            .center()
            .print()
        ,
        
         newText(" ").print()
        
        ,
        newSelector("Hearing")
            .add(getImage("yes_hear") , getImage("no_hear"))
            .select(getImage("no_hear"))
            .center()
            .log()
        ,
        
         newText(" ").print()
        
        ,
        newImage("yes_imp", "resp_ja.jpg")
            .size(30,20)
            .center()
        ,
        
         newText(" ").print()
        
        ,
        newImage("no_imp", "resp_nein.jpg")
            .size(30,20)
            .center()
        ,
        
         newText(" ").print()
        
        ,
        newText("line6", qu.line6)
            .after(getImage("yes_imp"))
            .after(getImage("no_imp"))
            .center()
            .print()
        ,
        
         newText(" ").print()
        
        ,
        newSelector("Impairments_yn")
            .add(getImage("yes_imp") , getImage("no_imp"))
            .select(getImage("no_imp"))
            .center()
            .log()
        ,
        
         newText(" ").print()
        
        ,
        newTextInput("Impairments")
            .size(100, 20)
            .center()
            .log()
        ,
        
         newText(" ").print()
        
        ,
        newText("line7", qu.line7)
            .after(getTextInput("Impairments"))
            .center()
            .print()
	,
	 newText(" ").print()
        
        ,
    	newVar("ProlificID")
	,       
        newTextInput("Prolific_ID_input")
            .size(200, 20)
            .center()
	    .print()
            .log()
        ,
        
         newText(" ").print()
        
        ,
	getVar("ProlificID")
        	.global()
        	.set(getTextInput("Prolific_ID_input"))
	,
	 
	 newText(" ").print()
        
        ,
        newText("line8", qu.line8)
            .after(getTextInput("Prolific_ID_input"))
            .center()
            .print()        
   	 ,
   	  newText(" ").print()
        
        ,
        newButton("qu_test_button", "Fortfahren in den Vollbildmodus.")
            .print()
            .center()
            .wait(
                getTextInput("Gender")
                .test.text(/[^ ]+/)
                )
            ,
            fullscreen()
    ).log( "ProlificID" , getVar("ProlificID")  )
);


Template(GetTable("audio_check.csv"),
    ac =>
    newTrial("audio_check",
        defaultText
            .print()
        ,
        newText("line1", ac.line1)
	     .bold()	
	     .css("background", "white")
        ,
        newText("line2", ac.line2)
        ,
        newText("line3", ac.line3)
        ,
        newText("line4", ac.line4)
	     .css("background", "white")
        ,
        newText("line5", ac.line5)
	     .css("background", "white")
        ,
        newText("line6", ac.line6)
	     .css("background", "white")
	,
        newText("line7", ac.line7)
 	     .css("background", "white")
	,
        newMediaRecorder("ac_recorder", "audio")
            .center()
            .print()
	    .css( "border" , "solid 3px red" )
        ,
        newText("line8", ac.line8)
            .css("border", "solid 2px white")
        ,
        newButton("ac_test_button", "Fortfahren")
            .center()
            .size(100, 30)
            .css("border", "solid 5px white")
            .print()
            .wait(getMediaRecorder("ac_recorder").test.recorded())
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
);

Template ( GetTable ( "fam_block.csv" ) ,
	    fam_block  =>
	    newTrial ( "fam_block" ,
		      defaultText
		      .print()
		      ,
	    newImage ( "fam_picture" ,  fam_block . picture )
	        . size ( 1280 ,  720 )
	        . print ( )
	    ,
	    
	    getImage ( "prac_picture" )
	        .center()
	        . remove ( )
,
   
    newKey(" ")
        .wait()


newTrial( "bye" ,
    newText("Thank you for your participation!").print(),
    newButton("Finish").wait()
)

.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial
