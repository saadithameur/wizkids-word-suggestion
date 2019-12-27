$(document).ready(function () {
    $('#userText').keyup(function(event) {
        var userText = document.getElementById("userText").value;
        var words = userText.split(" ");
        var currentLanguage = $("#userLanguage")[0].value;
        var currentWord = words[words.length - 1];
        
        //$("#userText").val("Hello world!");
    }); 
    $('li').click(function(event) {
        var selectedSuggestion = ($(this).prop("id"));
        var oldText = document.getElementById("userText").value;
        var newText = oldText.substr(0, oldText.lastIndexOf(" ")+1);
        newText=newText + selectedSuggestion;
        $("#userText").val(newText);
        document.getElementById("dictionarySuggestions").innerHTML="";
        document.getElementById("serviceSuggestions").innerHTML="";
    });
  });