var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
var Textbox = $("#textarea");
var instructions = $("#instructions");

var Content = "";
var currentLang = 'en-US'; // Default language is English

recognition.continuous = true;

recognition.onresult = function (event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  
  Content += transcript;
  Textbox.val(Content);
};

$("#start").on("click", function (e) {
  if ($(this).text() == "Click here to Stop Recording") {
    $(this).html("Click here to Start Recording");
    $("#instructions").html("");
    recognition.stop();
  } else {
    $(this).html("Click here to Stop Recording");
    $("#instructions").html("Try Speaking, Voice Recognition is On, Contents will be displayed below");
    if (Content.length) {
      Content += " ";
    }
    recognition.lang = currentLang;
    recognition.start();
  }
});

Textbox.on("input", function () {
  Content = $(this).val();
});

// Add language switching functionality
$("#switchLanguage").on("click", function () {
  if (currentLang === 'en-US') {
    currentLang = 'ur-PK'; // Switch to Urdu (Pakistan)
    $("#switchLanguage").html("Switch to English");
  } else {
    currentLang = 'en-US'; // Switch back to English
    $("#switchLanguage").html("Switch to Urdu");
  }
  recognition.lang = currentLang;
});
