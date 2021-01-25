PennController . ResetPrefix ( null ) ;   // Initiates PennController
	

	var  showProgressBar  =  true ;
	// var progressBarText = "progress";
	

	// edit text pop up for voice recording
	let  replaceConsentMic  =  ( ) => {
	        let  consentLink  =  $ ( ".PennController-PennController a.Message-continue-link" ) ;
	        if  ( consentLink . length  >  0  &&  consentLink [ 0 ] . innerHTML . match ( / ^ By clicking this link I understand that I grant this experiment's script access to my recording device / ) )
	            consentLink . html ( "Click to give this script access to my microphone." ) ;
	        else
	            window . requestAnimationFrame (  replaceConsentMic  ) ;
	} ;
	

	window . requestAnimationFrame (  replaceConsentMic  ) ;
	

	const  replacePreloadingMessage  =  ( ) => {
	    const  preloadingMessage  =  $ ( ".PennController-PennController> div" ) ;
	    if  ( preloadingMessage . length  >  0  &&  preloadingMessage [ 0 ] . innerHTML . match ( / ^ <p> Please wait while the resources are preloading / ) )
	        preloadingMessage . html ( "<p> Loading, please wait </p>" ) ;
	    window . requestAnimationFrame (  replacePreloadingMessage  ) ;
	} ;
	window . requestAnimationFrame (  replacePreloadingMessage  ) ;
	

	const  replaceUploadingMessage  =  ( ) => {
	    const  uploadingMessage  =  $ ( ".PennController-PennController> p" ) ;
	    if  ( uploadingMessage . length  >  0  &&  uploadingMessage [ 0 ] . innerHTML . match ( / ^ Please wait while the archive of your recordings is being uploaded to the server / ) )
	        uploadingMessage . html ( "Please wait for the archive of your recordings to be uploaded to the server. This may take a few minutes." ) ;
	    window . requestAnimationFrame (  replaceUploadingMessage  ) ;
	} ;
	window . requestAnimationFrame (  replaceUploadingMessage  ) ;
	

	// DebugOff ()
	

	// Show the 'intro' trial first, then all the 'experiment' trials in a random order
	// then send the results and finally show the trial labeled 'bye'
	Sequence ( "intro_ID" ,
		 "consent_form" ,
		 "initiate_recorder" ,
		 "audio_check" ,
		 "questionnaire" ,	 
		 
	"Welcome" ,	 	
	"Familiarization" ,	 
	"FAM_block" ,
	"Practice",
	"preload_prac_block" ) ,
	randomize ( "prac_block" ) ,
	"Teil1Untersuchung" ,
	randomize ("list1_block1") ,
	randomize ("list1_block2"),
	randomize ("list1_block3"),
	"PAUSE"
	"Teil2Untersuchung",
	randomize ("list1_block4"),
	randomize ("list1_block5"),
	

	"comment" ,
	"send" ,
	"final" 
	

	CheckPreloaded ( "welcome" ,  5000 )
	    . label ( "preload_welcome" ) ;   
	

	CheckPreloaded ( "familiarization" ,  5000 )
	    . label ( "preload_familiarization" ) ;   
	CheckPreloaded ( "practice" ,  5000 )
	    . label ( "preload_practice" ) ;
	 
	CheckPreloaded ( "Teil1Untersuchung" ,  10000 )
	    . label ( "preload_Teil1Untersuchung" ) ;
	CheckPreloaded ( "FAM_block" ,  10000 )
	    . label ( "preload_FAM_block" ) ;
	CheckPreloaded ( "prac_block" ,  10000 )
	    . label ( "preload_prac_block" ) ;
	CheckPreloaded ( "list1_block1" ,  10000 )
	    . label ( "preload_list1_block1" ) ;
	

	
// start the recorder and send result files to the server
Template ( GetTable ( "intro_recorder.csv" ) ,
    ir  =>
    InitiateRecorder ( "https://gitup.uni-potsdam.de/elbuy/phonologicalfacilitation/exp2/upload-recording.php" ,  ir . Line1 )
        . label ( "initiate_recorder" )
)

	/////template for intro participant form, consent, questionnaire
	

	Template ( GetTable ( "intro_ID.csv" ) ,
	    iid  =>
	    newTrial ( "intro_ID" ,
	        defaultText
	            . print ( )
	        ,
	        newText ( "instr_1" ,  iid . line1 )
	            . css ( "text-decoration" , "underline" )
	            . print ( )
	        ,
	        newButton ( "instr_button" ,  "Continue" )
	            . center ( )
	            . size ( 100 ,  30 )
	            . css ( "border" ,  "solid 5px white" )
	            . print ( )
	            . wait ( )
	    )
	) ;
	

	Template ( GetTable ( "consent_form.csv" ) ,
	    cf  =>
	    newTrial ( "consent_form" ,
	        defaultText
	            . print ( )
	        ,
	        newText ( "line1" ,  cf . line1 )
	            . css ( "border" ,  "solid 2px white" )
	        ,
	        newCanvas ( "consent_canvas" ,  800 ,  400 )
	            . add ( 0 ,  0 ,  getText ( "line1" ) )
	            . print ( )
	        ,
	        newButton ( "I agree." )
	            . print ( )
	            . center ( )
	            . log ( )
	            . wait ( )
	    )
	) ;
	

	

	Template ( GetTable ( "questionnaire.csv" ) ,
	    qu  =>
	    newTrial ( "questionnaire" ,
	        defaultText
	            . print ( )
	        ,
	        newText ( "line1" ,  qu . line1 )
	            . css ( "border" ,  "solid 10px white" )
		    . css ( "background" ,  "white" )
	        ,
	        newTextInput ( "Gender" )
	            . size ( 100 ,  20 )
	            . log ( )
	        ,
	        newText ( "line2" ,  qu . line2 )
	            . after ( getTextInput ( "Gender" ) )
	            . print ( )
	        ,
	        newDropDown ( "Age" ,  "-" )
	            . add ( "18" ,  "19" ,  "20" ,  "21" ,  "22" ,  "23" ,  "24" ,  "25" ,  "26" ,  "27" ,  "28" ,  "29" ,  "30" ,  "31" ,  "32" ,  "33" ,  "34" ,  "35" ,  "36" ,  "37" ,  "38" , "39", "40", "41", "42", "43" ,  "44" ,  "45" ,  "46" ,  "47" ,  "48" ,  "49" ,  "50" ,  "51" ,  "52" ,  "53" ,  "54" ,  "55" ,  "56"  ,  " 57 " ,  " 58 " ,  " 59 " ,  " 60 " ,  " 61 " ,  " 62 " ,  " 63 " ,  " 64 " ,  " 65 " , "66" ,  "67" ,  "68" ,  "69" ,  "70" ,  "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99" ,  "100+" )
	            . print ( )
	            . log ( )
	        ,
	        newText ( "line3" ,  qu . line3 )
	            . after ( getDropDown ( "Age" ) )
	            . print ( )
	        ,
	        newTextInput ( "Language" )
	            . size ( 100 ,  20 )
	            . log ( )
	        ,
	        newText ( "line4" ,  qu . line4 )
	            . after ( getTextInput ( "Language" ) )
	            . print ( )
	        ,
	        newImage ( "yes_hear" ,  "resp_ja.png" )
	            . size ( 30 , 20 )
	        ,
	        newImage ( "no_hear" ,  "resp_nein.png" )
	            . size ( 30 , 20 )
	        ,
	        newText ( "line5" ,  qu . line5 )
	            . after ( getImage ( "yes_hear" ) )
	            . after ( getImage ( "no_hear" ) )
	            . print ( )
	        ,
	        newSelector ( "Hearing" )
	            . add ( getImage ( "yes_hear" )  ,  getImage ( "no_hear" ) )
	            . select ( getImage ( "no_hear" ) )
	            . log ( )
	        ,
	        newImage ( "yes_imp" ,  "resp_ja.png" )
	            . size ( 30 , 20 )
	        ,
	        newImage ( "no_imp" ,  "resp_nein.png" )
	            . size ( 30 , 20 )
	        ,
	        newText ( "line6" ,  qu . line6 )
	            . after ( getImage ( "yes_imp" ) )
	            . after ( getImage ( "no_imp" ) )
	            . print ( )
	        ,
	        newSelector ( "Impairments_yn" )
	            . add ( getImage ( "yes_imp" )  ,  getImage ( "no_imp" ) )
	            . select ( getImage ( "no_imp" ) )
	            . log ( )
	        ,
	        newTextInput ( "Impairments" )
	            . size ( 100 ,  20 )
	            . log ( )
	        ,
	        newText ( "line7" ,  qu . line7 )
	            . after ( getTextInput ( "Impairments" ) )
	            . print ( )
		,
	    	newVar ( "ProlificID" )
		,       
	        newTextInput ( "Prolific_ID_input" )
	            . size ( 200 ,  20 )
		    . print ( )
	            . log ( )
	        ,
		getVar ( "ProlificID" )
	        	. global ( )
	        	. set ( getTextInput ( "Prolific_ID_input" ) )
		,
	        newText ( "line8" ,  qu . line8 )
	            . after ( getTextInput ( "Prolific_ID_input" ) )
	            . print ( )        
	   	 ,
	        newButton ( "qu_test_button" ,  "Proceed to full screen mode." )
	            . print ( )
	            . wait (
	                getTextInput ( "Gender" )
	                . test . text ( / [ ^ ] + / )
	                )
	            ,
	            fullscreen ( )
	    ) . log (  "ProlificID"  ,  getVar ( "ProlificID" )   )
	) ;
	

	///// template for audio check
	

	Template ( GetTable ( "audio_check.csv" ) ,
	    ac  =>
	    newTrial ( "audio_check" ,
	        defaultText
	            . print ( )
	        ,
	        newText ( "line1" ,  ac . line1 )
		     . bold ( )	
		     . css ( "background" ,  "white" )
	        ,
	        newText ( "line2" ,  ac . line2 )
	        ,
	        newText ( "line3" ,  ac . line3 )
	        ,
	        newText ( "line4" ,  ac . line4 )
		     . css ( "background" ,  "white" )
	        ,
	        newText ( "line5" ,  ac . line5 )
		     . css ( "background" ,  "white" )
	        ,
	        newText ( "line6" ,  ac . line6 )
		     . css ( "background" ,  "white" )
		,
	        newText ( "line7" ,  ac . line7 )
	 	     . css ( "background" ,  "white" )
		,
	        newMediaRecorder ( "ac_recorder" ,  "audio" )
	            . center ( )
	            . print ( )
		    . css (  "border"  ,  "solid 3px red"  )
	        ,
	        newText ( "line8" ,  ac . line8 )
	            . css ( "border" ,  "solid 2px white" )
	        ,
	        newButton ( "ac_test_button" ,  "Continue" )
	            . center ( )
	            . size ( 100 ,  30 )
	            . css ( "border" ,  "solid 5px white" )
	            . print ( )
	            . wait ( getMediaRecorder ( "ac_recorder" ) . test . recorded ( ) )
	    )
	) ;
	

	

	////start familiarization trials
	

	newTrial ( "Familiarization_Instruct" ,
	    defaultText
	        . print ( )
	    ,
	    newImage ( "Familiarization" ,  "Familiarization.jpg" )
	        . size ( 1280 ,  720 )
	        . print ( )
	    ,
	    newKey ( "space" ,  "" )
		. log ( )
	        . wait ( )
	) ;
	

	Template ( GetTable ( "FAM_block.csv" ) ,
	    FAM_block  =>
	    newTrial ( "FAM_block" ,
	    
	    newImage ( "fixation_cross" ,  "fixation.jpg" )
	        . size ( 300 ,  300 )
	        . print ( )
	        . log ( )
	    ,
	    newTimer ( "FAM_fixation" ,  500 )
	        . start ( )
	        . wait ( )
	    ,
	    getImage ( "fixation_cross" )
	        . remove ( )
	    ,
	    newMediaRecorder ( "FAM_recorder" ,  "audio" )
	        . hidden ( )
	        . record ( )
	        . log ( )
	    ,
	    newImage ( "FAM_picture" ,  FAM_block . picture )
	        . size ( 300 ,  300 )
	        . print ( )
	    ,
	    newTimer ( "FAM_trial" ,  2000 )
	        . start ( )
	        . wait ( )
	        . log ( )
	    ,
	    getImage ( "FAM_picture" )
	        . remove ( )
	    ,
	    newTimer ( "post_trial" ,  1500 )
	        . start ( )
	        . wait ( )
	        . log ( )
	    ,
	    getMediaRecorder ( "FAM_recorder" )
	        . stop ( )
	        . remove ( )
		. log ( )
	    )
		  
	    . log (  "ProlificID"  ,  getVar ( "ProlificID" )  )
	    . log (  "Participant_ID" ,  FAM_block . sub_id )
	    . log (  "Session" ,  FAM_block . session )
	    . log (  "Target_word" ,  FAM_block . target  )
	    . log (  "Distractor_word" ,  FAM_block . distractor )
	    . log (  "Condition" ,  FAM_block . condition )
	    . log (  "Conditionletter" ,  FAM_block . conditionletter )
	

	) ;
	

	

	newTrial ( "FAM_kamel" ,
	    defaultText
	        . print ( )
	    ,
	    newImage ( "KamelFAM" ,  "KamelFAM.jpg" )
	        . size ( 1280 ,  720 )
	        . print ( )
	    ,
	    newKey ( "space" ,  "" )
		. log ( )
	        . wait ( )
	) ;
	

	newTrial ( "BettFAM" , 
	    defaultText
	        . print ( )
	    ,
	    newImage ( "BettFAM" ,  "BettFAM.jpd" )
	        . size ( 1280 ,  720 )
	        . print ( )
	    ,
	    newKey ( "space" ,  "" )
		. log ( )
	        . wait ( )
	) ;
	

	newTrial ( "KrokodilFAM" ,
	    defaultText
	        . print ( )
	    ,
	    newImage ( "KrokodilFAM" ,  "KrokodilFAM.jpg" )
	        . size ( 1280 ,  720 )
	        . print ( )
	    ,
	    newKey ( "space" ,  "" )
		. log ( )
	        . wait ( )
	) ;
	

	newTrial ( "AxtFAM" ,
	    defaultText
	        . print ( )
	    ,
	    newImage ( "AxtFAM" ,  "AxtFAM.jpg" )
	        . size ( 1280 ,  720 )
	        . print ( )
	    ,
	    newKey ( "space" ,  "" )
		. log ( )
	        . wait ( )
	)
	

	////////////////////////////////////// templates for practice trials 
	

	Template ( GetTable ( "prac_block.csv" ) ,
	    prac_block  =>
	    newTrial ( "prac_block" ,
	    
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
	    newMediaRecorder ( "prac_recorder" ,  "audio" )
	        . hidden ( )
	        . record ( )
	        . log ( )
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
	    ,
	    getMediaRecorder ( "prac_recorder" )
	        . stop ( )
	        . remove ( )
		. log ( )
	    )
	    . log (  "ProlificID"  ,  getVar ( "ProlificID" )  )
	    . log (  "Participant_ID" ,  prac_block . sub_id )
	    . log (  "Session" ,  prac_block . session )
	    . log (  "Target_word" ,  prac_block . target  )
	    . log (  "Distractor_word" ,  prac_block . distractor )
	    . log (  "Condition" ,  prac_block . condition )
	    . log (  "Conditionletter" ,  prac_block . conditionletter )
	

	) ;

