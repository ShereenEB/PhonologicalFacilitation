PennController.ResetPrefix(null);  // Initiates PennController

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
	 "questionnaire"
	 
"instruct_1_1_general",	 	
"instruct_1_2_general",	 
"preload_prac_cb",
"instruct_2_prac_cblock",
randomize("prac_cb"),
"preload_pretrain_cb",
"instruct_3_cblock_pretrain",
"pretrain_cb",
"instruct_4_pause_after_cblock_pretrain",
"preload_prac_ncb",
"instruct_5_prac_ncblock",
randomize("prac_ncb"),
"preload_pretrain_ncb",
"instruct_6_ncblock_pretrain",
"pretrain_ncb",
"instruct_7_pause_after_ncblock_pretrain",
"instruct_8_0_train",	 
"preload_train1_cb",
"instruct_8_1_cblock_train1",
randomize("train1_cb"),
"preload_train1_ncb",
"instruct_8_1_ncblock_train1",
randomize("train1_ncb"),	 
"preload_train2_cb",
"instruct_8_2_cblock_train2",
randomize("train2_cb"), 
"preload_train2_ncb",
"instruct_8_2_ncblock_train2",
randomize("train2_ncb"),
"instruct_8_2_pause_after_ncblock_train2.png",
"preload_train3_cb",
"instruct_8_3_cblock_train3",
randomize("train3_cb"),	 
"preload_train3_ncb",
"instruct_8_3_ncblock_train3",
randomize("train3_ncb"),	 
"preload_train4_cb",
"instruct_8_4_cblock_train4",
randomize("train4_cb"),
"preload_train4_ncb",
"instruct_8_4_ncblock_train4",
randomize("train4_ncb"),
"instruct_8_4_pause_after_ncblock_train4.png",
"preload_train5_cb",
"instruct_8_5_cblock_train5",
randomize("train5_cb"),
"preload_train5_ncb",
"instruct_8_5_ncblock_train5",
randomize("train5_ncb"),
"preload_train6_cb",
"instruct_8_6_cblock_train6",
randomize("train6_cb"),
"preload_train6_ncb",
"instruct_8_6_ncblock_train6",
randomize("train6_ncb"),	
"comment",
"send",
"final");
