PennController.ResetPrefix(null) // Shorten command names (keep this line here)

var showProgressBar = true;
//var progressBarText = "Fortschritt";

//edit text pop up for voice recording
let replaceConsentMic = ()=>{
        let consentLink = $(".PennController-PennController a.Message-continue-link");
        if (consentLink.length > 0 && consentLink[0].innerHTML.match(/^By clicking this link I understand that I grant this experiment's script access to my recording device/))
            consentLink.html("Durch klicken erteile ich diesem Skript Zugriff auf mein Mikrofon.");
        else
            window.requestAnimationFrame( replaceConsentMic );
};

window.requestAnimationFrame( replaceConsentMic );

const replacePreloadingMessage = ()=>{
    const preloadingMessage = $(".PennController-PennController > div");
    if (preloadingMessage.length > 0 && preloadingMessage[0].innerHTML.match(/^<p>Please wait while the resources are preloading/))
        preloadingMessage.html("<p>Laden, bitte warten</p>");
    window.requestAnimationFrame( replacePreloadingMessage );
};
window.requestAnimationFrame( replacePreloadingMessage );

const replaceUploadingMessage = ()=>{
    const uploadingMessage = $(".PennController-PennController > p");
    if (uploadingMessage.length > 0 && uploadingMessage[0].innerHTML.match(/^Please wait while the archive of your recordings is being uploaded to the server/))
        uploadingMessage.html("Bitte warten Sie, bis das Archiv Ihrer Aufnahmen auf den Server hochgeladen wurde. Dies kann einige Minuten dauern.");
    window.requestAnimationFrame( replaceUploadingMessage );
};
window.requestAnimationFrame( replaceUploadingMessage );

// DebugOff()

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'

Sequence("intro_ID",
	 "consent_form",
	 "initiate_recorder",
	 "audio_check",
	 "questionnaire",
	 "preload_familiarization",
	 "familiarization",
	 "preload_fam_block",
	 randomize ("fam_block"),
	 "ubung", 
	 "preload_prac_block",
	 randomize("prac_block"),
	 "untersuchung1",
	 "preload_list1_block1",
	 randomize("list1_block1"),
	 "preload_list1_block2",
	 randomize("list1_block2"),
	 "preload_list1_block3",
	 randomize("list1_block3"),
	 "pause",
	 "untersuchung2",
	 "preload_list1_block4",
	 randomize("list1_block4"),
	 "preload_list1_block5",
	 randomize("list1_block5"),
	 "final_message" );

CheckPreloaded("intro_ID", 5000)
    .label("intro_ID");

CheckPreloaded("fixation_cross", 5000)
    .label("fixation_cross");
    
CheckPreloaded("consent_form", 5000)
    .label("intro_ID");

CheckPreloaded("familiarization", 5000)
    .label("preload_familiarization")

CheckPreloaded("fam_block", 5000)
    .label("preload_fam_block")

CheckPreloaded("ubung", 5000)
    .label("preload_ubung")
    
CheckPreloaded("prac_block", 5000)
    .label("preload_prac_block");

CheckPreloaded("untersuchung1", 5000)
    .label("preload_untersuchung1");

CheckPreloaded("list1_block1", 5000)
    .label("preload_list1_block1")

CheckPreloaded("bye", 5000)
    .label("preload_bye");   



//start the recorder and send result files to the server

Template(GetTable("intro_recorder.csv"),
    ir =>
    InitiateRecorder("https://gitup.uni-potsdam.de/elbuy/phonologicalfacilitation.git", ir.line1)
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
        
        newText(" ").print()
        
        ,
        
        newText(" ").print()
        
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
        .center()
            .print()
        ,
        newText("line1", ac.line1)
	     .bold()	
	     .center()
	     .css("background", "white")
        ,
        newText("line2", ac.line2)
        .center()
        ,
        newText("line3", ac.line3)
        .center()
        ,
        newText("line4", ac.line4)
        .center()
	     .css("background", "white")
        ,
        newText("line5", ac.line5)
        .center()
	     .css("background", "white")
        ,
        newText("line6", ac.line6)
        .center()
	     .css("background", "white")
	,
        newText("line7", ac.line7)
        .center()
 	     .css("background", "white")
	,
        newText("line8", ac.line8)
        .center()
            .css("border", "solid 2px white")
            ,
        newMediaRecorder("ac_recorder", "audio")
            .center()
            .print()
	    .css( "border" , "solid 3px red" )
        ,
        newButton("ac_test_button", "Fortfahren")
            .center()
            .size(100, 30)
            .css("border", "solid 5px white")
            .print()
            .wait(getMediaRecorder("ac_recorder").test.recorded())
    )
);


Template(GetTable("familiarization.csv"),
    fam =>
    newTrial("familiarization",
        defaultText
            .print()
        ,
        newText("line1", fam.line1)
            .center()
            .css("border", "solid 2px white")
     ,
      newKey(" ")
         .wait()
)

);

Template ( GetTable ( "fam_block.csv" ) ,
	    fam_block  =>
	    newTrial ( "fam_block" ,
		      defaultText
		      .print()
		      ,
	  	    newImage ( "fam_picture" ,  fam_block . picture )
	  	    .center()
	        . size ( 1280 ,  720 )
	        . print ( )
	    ,
	    
	    newKey(" ")
         .wait()
)

);

Template(GetTable("ubung.csv"),
    ubung =>
    newTrial("ubung",
        defaultText
            .print()
        ,
        newText("line1", ubung.line1)
            .center()
            .css("border", "solid 2px white")
     ,
      newKey(" ")
         .wait()
)

);


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
	     newTimer ( "prac_posttrial" ,  1500 )
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

Template(GetTable("untersuchung1.csv"),
    untersuchung1 =>
    newTrial("untersuchung1",
        defaultText
            .print()
        ,
        newText("line1", untersuchung1.line1)
            .center()
            .css("border", "solid 2px white")
     ,
      newKey(" ")
         .wait()
)

);

Template(GetTable("list1_block1.csv"),
   list1_block1 =>
    newTrial("list1_block1",
    
    newImage("fixation_cross", "fixation.jpg")
        .size(1280, 720)
        .print()
        .log()
    ,
    newTimer("list1_block1_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("list1_block1_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("list1_block1_picture", list1_block1.picture)
        .size(1280, 720)
        .print()
    ,
    newTimer("list1_block1_trial", 2000)
        .start()
        .wait()
        .log()
    ,
    getImage("list1_block1_picture")
        .remove()
    ,
    newTimer("list1_block1_posttrial", 1500)
        .start()
        .wait()
        .log()
    ,
    getMediaRecorder("list1_block1_recorder")
        .stop()
        .remove()
	.log()    
    )
    .log( "sub_id"     , list1_block1.sub_id)
    .log( "session" , list1_block1.session)
    .log( "target", list1_block1.target )
    .log( "distractor", list1_block1.distractor)
    .log( "condition", list1_block1.condition)
    .log( "picture", list1_block1.picture)
);


Template(GetTable("list1_block2.csv"),
   list1_block2 =>
    newTrial("list1_block2",
    
    newImage("fixation_cross", "fixation.jpg")
        .size(1280, 720)
        .print()
        .log()
    ,
    newTimer("list1_block2_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("list1_block2_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("list1_block2_picture", list1_block2.picture)
        .size(1280, 720)
        .print()
    ,
    newTimer("list1_block2_trial", 2000)
        .start()
        .wait()
        .log()
    ,
    getImage("list1_block2_picture")
        .remove()
    ,
    newTimer("list1_block2_posttrial", 1500)
        .start()
        .wait()
        .log()
    ,
    getMediaRecorder("list1_block2_recorder")
        .stop()
        .remove()
	.log()    
    )
    .log( "sub_id"     , list1_block2.sub_id)
    .log( "session" , list1_block2.session)
    .log( "target", list1_block2.target )
    .log( "distractor", list1_block2.distractor)
    .log( "condition", list1_block2.condition)
    .log( "picture", list1_block2.picture)
);


Template(GetTable("list1_block3.csv"),
   list1_block3 =>
    newTrial("list1_block3",
    
    newImage("fixation_cross", "fixation.jpg")
        .size(1280, 720)
        .print()
        .log()
    ,
    newTimer("list1_block3_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("list1_block3_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("list1_block3_picture", list1_block3.picture)
        .size(1280, 720)
        .print()
    ,
    newTimer("list1_block3_trial", 2000)
        .start()
        .wait()
        .log()
    ,
    getImage("list1_block3_picture")
        .remove()
    ,
    newTimer("list1_block3_posttrial", 1500)
        .start()
        .wait()
        .log()
    ,
    getMediaRecorder("list1_block3_recorder")
        .stop()
        .remove()
	.log()    
    )
    .log( "sub_id"     , list1_block3.sub_id)
    .log( "session" , list1_block3.session)
    .log( "target", list1_block3.target )
    .log( "distractor", list1_block3.distractor)
    .log( "condition", list1_block3.condition)
    .log( "picture", list1_block3.picture)
);


Template(GetTable("pause.csv"),
    pause =>
    newTrial("pause",
        defaultText
            .print()
        ,
        newText("line1", pause.line1)
            .center()
            .css("border", "solid 2px white")
     ,
      newKey(" ")
         .wait()
)

);


Template(GetTable("untersuchung2.csv"),
    untersuchung2 =>
    newTrial("untersuchung2",
        defaultText
            .print()
        ,
        newText("line1", untersuchung2.line1)
            .center()
            .css("border", "solid 2px white")
     ,
      newKey(" ")
         .wait()
)

);


Template(GetTable("list1_block4.csv"),
   list1_block4 =>
    newTrial("list1_block4",
    
    newImage("fixation_cross", "fixation.jpg")
        .size(1280, 720)
        .print()
        .log()
    ,
    newTimer("list1_block4_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("list1_block4_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("list1_block4_picture", list1_block4.picture)
        .size(1280, 720)
        .print()
    ,
    newTimer("list1_block4_trial", 2000)
        .start()
        .wait()
        .log()
    ,
    getImage("list1_block4_picture")
        .remove()
    ,
    newTimer("list1_block4_posttrial", 1500)
        .start()
        .wait()
        .log()
    ,
    getMediaRecorder("list1_block4_recorder")
        .stop()
        .remove()
	.log()    
    )
    .log( "sub_id"     , list1_block4.sub_id)
    .log( "session" , list1_block4.session)
    .log( "target", list1_block4.target )
    .log( "distractor", list1_block4.distractor)
    .log( "condition", list1_block4.condition)
    .log( "picture", list1_block4.picture)
);


Template(GetTable("list1_block5.csv"),
   list1_block5 =>
    newTrial("list1_block5",
    
    newImage("fixation_cross", "fixation.jpg")
        .size(1280, 720)
        .print()
        .log()
    ,
    newTimer("list1_block5_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("list1_block5_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("list1_block5_picture", list1_block5.picture)
        .size(1280, 720)
        .print()
    ,
    newTimer("list1_block5_trial", 2000)
        .start()
        .wait()
        .log()
    ,
    getImage("list1_block5_picture")
        .remove()
    ,
    newTimer("list1_block5_posttrial", 1500)
        .start()
        .wait()
        .log()
    ,
    getMediaRecorder("list1_block5_recorder")
        .stop()
        .remove()
	.log()    
    )
    .log( "sub_id"     , list1_block5.sub_id)
    .log( "session" , list1_block5.session)
    .log( "target", list1_block5.target )
    .log( "distractor", list1_block5.distractor)
    .log( "condition", list1_block5.condition)
    .log( "picture", list1_block5.picture)
);

Template(GetTable("final_message.csv"),
    final_message =>
    newTrial("final_message",
        defaultText
            .print()
        ,
        newText("line1", final_message.line1)
            .center()
            .css("border", "solid 2px white")
     ,
     
     newText("line2", final_message.line2)
            .center()
            .css("border", "solid 2px white")
            ,
    
     newText("<p><a href='https://_________> https://app.prolific.co/submissions/complete?cc=2D6D5A46.</a></p>")
        .print()
        .center()
        .css("border", "solid 2px white")
    ,
        
      newButton("finish", "fertig")
            .center()
            .size(100, 30)
            .css("border", "solid 5px white")
            .print()
            .wait()
)

);
