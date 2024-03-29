PennController.ResetPrefix(null) // initiates PennController

//DebugOff();


var showProgressBar = true;
var progressBarText = "Fortschritt";

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
        preloadingMessage.html("<p>Please wait while the resources are preloading.</p>");
    window.requestAnimationFrame( replacePreloadingMessage );
};
window.requestAnimationFrame( replacePreloadingMessage );

const replaceUploadingMessage = ()=>{
    const uploadingMessage = $(".PennController-PennController > p");
    if (uploadingMessage.length > 0 && uploadingMessage[0].innerHTML.match(/^Please wait while the archive of your recordings is being uploaded to the server/))
        uploadingMessage.html("Please wait while the archive of your recordings is being uploaded to the server.");
    window.requestAnimationFrame( replaceUploadingMessage );
};
window.requestAnimationFrame( replaceUploadingMessage );

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
	  "preload_fillers1",
	   randomize("fillers1"),
	 "preload_list1_block1",
	 randomize("list1_block1"),
	 	"uploads",
	  "preload_list1_block2",
	 randomize("list1_block2"),
	 	"uploads",
	  "preload_list1_block3",
	 randomize("list1_block3"),
	 	"uploads",
	 "pause",
	 "untersuchung2",
	 "preload_fillers2",
	 randomize("fillers2"),
	  "preload_list1_block4",
	 randomize("list1_block4"),
	 	"uploads",
	  "preload_list1_block5",
	 randomize("list1_block5"),
	"uploads",
	"comment",
	"*sync_uploads*",
	"send",
	"final_message"
	 );

CheckPreloaded ( "familiarization" ,  5000 )
	    . label ( "preload_familiarization" ) ;

	CheckPreloaded ( "fam_block" ,  10000 )
	    . label ( "preload_fam_block" ) ;
	
	CheckPreloaded ( "practice" ,  5000 )
	    . label ( "preload_practice" ) ;
	
	CheckPreloaded ( "prac_block" ,  10000 )
	    . label ( "preload_prac_block" ) ;
	 
	 CheckPreloaded ( "fillers1" ,  5000 )
	    . label ( "preload_fillers1" ) ;
	    
	CheckPreloaded ( "teil1untersuchung" ,  10000 )
	    . label ( "preload_teil1untersuchung" ) ;
	
	CheckPreloaded ( "list1_block1" ,  10000 )
	    . label ( "preload_list1_block1" ) ;

CheckPreloaded ( "list1_block2" ,  10000 )
	    . label ( "preload_list1_block2" ) ;

CheckPreloaded ( "list1_block3" ,  10000 )
	    . label ( "preload_list1_block3" ) ;

CheckPreloaded ( "list1_block4" ,  10000 )
	    . label ( "preload_list1_block4" ) ;

CheckPreloaded ( "list1_block5" ,  10000 )
	    . label ( "preload_list1_block5" ) ;


//start the recorder and send result files to the server

Template(GetTable("intro_recorder.csv"),
    ir =>
    InitiateRecorder("https://www.phonologicalfacilitation.online/phonologicalfacilitation/uploadrecordings.php",ir.line1)
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
        newMediaRecorder("ac_recorder", "audio")
            .center()
            .print()
	    .css( "border" , "solid 3px red" )
        ,
        newButton("ac_test_button", "Continue")
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
	        .center()
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
    .log( "Session" , prac_block.session )
    .log( "Picture" , prac_block.picture )
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

Template ( GetTable ( "fillers1.csv" ) ,
	    fillers1  =>
	    newTrial ( "fillers1" ,
		      defaultText
		      .print()
		      ,
	    newImage ( "fixation_cross" ,  "fixation.jpg" )
	        .center()
	        . size ( 1280 ,  720 )
	        . print ( )
	        . log ( )
	    ,
	    newTimer ( "fillers1_fixation" ,  500 )
	        . start ( )
	        . wait ( )
	    ,
	    getImage ( "fixation_cross" )
	        . center()
	        . remove ( )
	    ,
	    newImage ( "fillers1_picture" ,  fillers1 . picture )
	        . size ( 1280 ,  720 )
	        .center()
	        . print ( )
	    ,
	    newTimer ( "fillers1_trial" ,  2000 )
	        . start ( )
	        . wait ( )
	        . log ( )
	    ,
	    getImage ( "fillers1_picture" )
	        .center()
	        . remove ( )
	    ,
	     newTimer ( "fillers1_posttrial" ,  1500 )
	        . start ( )
	        . wait ( )
	        . log ( )
	    )
    .log( "Participant ID" , fillers1.sub_id )
    .log( "Target" , fillers1.target )
    .log( "Distractor" , fillers1.distractor )
    .log( "Condition" , fillers1.condition )
);


Template(GetTable("list1_block1.csv"),
   list1_block1 =>
    newTrial("list1_block1",
    
    newImage("fixation_cross", "fixation.jpg")
        .size(1280, 720)
         .center()
        .print()
        .log()
    ,
    newTimer("list1_block1_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
     .center()
        .remove()
    ,
    newMediaRecorder(GetURLParameter("id")+"_list1_block1", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("list1_block1_picture", list1_block1.picture)
        .size(1280, 720)
         .center()
        .print()
    ,
    newTimer("list1_block1_trial", 2000)
        .start()
        .wait()
        .log()
    ,
    getImage("list1_block1_picture")
     .center()
        .remove()
    ,
    newTimer("list1_block1_posttrial", 1500)
        .start()
        .wait()
        .log()
    ,
    getMediaRecorder(GetURLParameter("id")+"_list1_block1")
        .stop()
        .remove()
	.log()    
    )
    
    .log( "list"     , list1_block1.list)
     .log( "block"     , list1_block1.block)
         .log( "item" , list1_block1.item)
    .log( "target", list1_block1.target )
    .log( "distractor", list1_block1.distractor)
    .log( "picture", list1_block1.picture)
     .log( "condition", list1_block1.condition)
     .log( "recordingfile", list1_block1.recordingfile)
);

UploadRecordings("uploads");


Template(GetTable("list1_block2.csv"),
   list1_block2 =>
    newTrial("list1_block2",
    
    newImage("fixation_cross", "fixation.jpg")
        .size(1280, 720)
         .center()
        .print()
        .log()
    ,
    newTimer("list1_block2_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
     .center()
        .remove()
    ,
    newMediaRecorder(GetURLParameter("id")+"_list1_block2", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("list1_block2_picture", list1_block2.picture)
        .size(1280, 720)
         .center()
        .print()
    ,
    newTimer("list1_block2_trial", 2000)
        .start()
        .wait()
        .log()
    ,
    getImage("list1_block2_picture")
     .center()
        .remove()
    ,
    newTimer("list1_block2_posttrial", 1500)
        .start()
        .wait()
        .log()
    ,
    getMediaRecorder(GetURLParameter("id")+"_list1_block2")
        .stop()
        .remove()
	.log()    
    )
    
    .log( "list"     , list1_block2.list)
     .log( "block"     , list1_block2.block)
         .log( "item" , list1_block2.item)
    .log( "target", list1_block2.target )
    .log( "distractor", list1_block2.distractor)
    .log( "picture", list1_block2.picture)
     .log( "condition", list1_block2.condition)
     .log( "recordingfile", list1_block2.recordingfile)
);


Template(GetTable("list1_block3.csv"),
   list1_block3 =>
    newTrial("list1_block3",
    
    newImage("fixation_cross", "fixation.jpg")
        .size(1280, 720)
         .center()
        .print()
        .log()
    ,
    newTimer("list1_block3_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
     .center()
        .remove()
    ,
     newMediaRecorder(GetURLParameter("id")+"_list1_block3", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("list1_block3_picture", list1_block3.picture)
        .size(1280, 720)
         .center()
        .print()
    ,
    newTimer("list1_block3_trial", 2000)
        .start()
        .wait()
        .log()
    ,
    getImage("list1_block3_picture")
     .center()
        .remove()
    ,
    newTimer("list1_block3_posttrial", 1500)
        .start()
        .wait()
        .log()

   ,
     getMediaRecorder(GetURLParameter("id")+"_list1_block3")
        .stop()
        .remove()
	.log()    
    )
    
    .log( "list"     , list1_block3.list)
     .log( "block"     , list1_block3.block)
         .log( "item" , list1_block3.item)
    .log( "target", list1_block3.target )
    .log( "distractor", list1_block3.distractor)
    .log( "picture", list1_block3.picture)
     .log( "condition", list1_block3.condition)
     .log( "recordingfile", list1_block3.recordingfile)
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

Template ( GetTable ( "fillers2.csv" ) ,
	    fillers2  =>
	    newTrial ( "fillers2" ,
		      defaultText
		      .print()
		      ,
	    newImage ( "fixation_cross" ,  "fixation.jpg" )
	        .center()
	        . size ( 1280 ,  720 )
	        . print ( )
	        . log ( )
	    ,
	    newTimer ( "fillers2_fixation" ,  500 )
	        . start ( )
	        . wait ( )
	    ,
	    getImage ( "fixation_cross" )
	        . center()
	        . remove ( )
	    ,
	    newImage ( "fillers2_picture" ,  fillers2 . picture )
	        . size ( 1280 ,  720 )
	        .center()
	        . print ( )
	    ,
	    newTimer ( "fillers2_trial" ,  2000 )
	        . start ( )
	        . wait ( )
	        . log ( )
	    ,
	    getImage ( "fillers2_picture" )
	        .center()
	        . remove ( )
	    ,
	     newTimer ( "fillers2_posttrial" ,  1500 )
	        . start ( )
	        . wait ( )
	        . log ( )
	    )
    .log( "Participant ID" , fillers2.sub_id )
    .log( "Target" , fillers2.target )
    .log( "Distractor" , fillers2.distractor )
    .log( "Condition" , fillers2.condition )
);


Template(GetTable("list1_block4.csv"),
   list1_block4 =>
    newTrial("list1_block4",
    
    newImage("fixation_cross", "fixation.jpg")
        .size(1280, 720)
         .center()
        .print()
        .log()
    ,
    newTimer("list1_block4_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
     .center()
        .remove()
    ,
     newMediaRecorder(GetURLParameter("id")+"_list1_block4", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("list1_block4_picture", list1_block4.picture)
     .center()
        .size(1280, 720)
        .print()
    ,
    newTimer("list1_block4_trial", 2000)
        .start()
        .wait()
        .log()
    ,
    getImage("list1_block4_picture")
     .center()
        .remove()
    ,
    newTimer("list1_block4_posttrial", 1500)
        .start()
        .wait()
        .log()
    ,
       
     getMediaRecorder(GetURLParameter("id")+"_list1_block4")
        .stop()
        .remove()
	.log()    
    )
    
    .log( "list"     , list1_block4.list)
     .log( "block"     , list1_block4.block)
         .log( "item" , list1_block4.item)
    .log( "target", list1_block4.target )
    .log( "distractor", list1_block4.distractor)
    .log( "picture", list1_block4.picture)
     .log( "condition", list1_block4.condition)
     .log( "recordingfile", list1_block4.recordingfile)
);




Template(GetTable("list1_block5.csv"),
   list1_block5 =>
    newTrial("list1_block5",
    
    newImage("fixation_cross", "fixation.jpg")
        .size(1280, 720)
         .center()
        .print()
        .log()
    ,
    newTimer("list1_block5_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
     .center()
        .remove()
    ,
   newMediaRecorder(GetURLParameter("id")+"_list1_block5", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("list1_block5_picture", list1_block5.picture)
        .size(1280, 720)
         .center()
        .print()
    ,
    newTimer("list1_block5_trial", 2000)
        .start()
        .wait()
        .log()
    ,
    getImage("list1_block5_picture")
     .center()
        .remove()
    ,
    newTimer("list1_block5_posttrial", 1500)
        .start()
        .wait()
        .log()
       ,
     getMediaRecorder(GetURLParameter("id")+"_list1_block5")
        .stop()
        .remove()
	.log()    
    )
    
    .log( "list"     , list1_block5.list)
     .log( "block"     , list1_block5.block)
         .log( "item" , list1_block5.item)
    .log( "target", list1_block5.target )
    .log( "distractor", list1_block5.distractor)
    .log( "picture", list1_block5.picture)
     .log( "condition", list1_block5.condition)
     .log( "recordingfile", list1_block5.recordingfile)
);



Template(GetTable("feedback.csv"),
    fb =>
        newTrial("comment",
            newText(fb.line1)
                .print()
            ,
	    newText(fb.line2)
                .print()
            ,
	    newTextInput("feedback")
                .settings.size(400, 50)
                .css("border", "solid 2px grey")
                .settings.log()
                .print()
	    ,
            newText(fb.line5)
                .print()
            ,
	    newTextInput("feedback")
                .settings.size(400, 50)
                .css("border", "solid 2px grey")
                .settings.log()
                .print()
	    ,
            newButton("comment_end_button", "Fortfahren")
                .css("border", "solid 5px white")
                .print()
                .wait()
        )
)

UploadRecordings("*sync_uploads*")

SendResults("send")

Template(GetTable("final_message.csv"),
    fin =>
        newTrial("final_message",
            exitFullscreen()
            ,
            newText(fin.line1)
                .print()
            ,
            newButton("void")
                .wait()
        )
);
