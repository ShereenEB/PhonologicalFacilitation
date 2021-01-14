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
"Practice"
"preload_prac_block" ,
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
"final" ) ;
