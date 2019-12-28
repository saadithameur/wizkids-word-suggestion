$(document).ready(function () {
    $('#userText').keyup(function(event) {
        var userText = document.getElementById("userText").value;
        var words = userText.split(" ");
        var currentLanguage = $("#userLanguage")[0].value;
        var currentWord = words[words.length - 1];
        if(currentWord.length<1) return;
        var requestUrl= 'http://localhost:54464/getSuggestions?locale='+currentLanguage+'&text='+currentWord;
        $.ajax({
            url: requestUrl,
            type: 'Get',
            success: function (data) {
                var json = jQuery.parseJSON(JSON.stringify(data));
                var list1= json["dictionnarySuggestion"];
                var li ="";
                list1.forEach(element => {
                    li += "<li id='"+element+"' onclick='setSelectedWord("+element+")'>"+element+"</li>";
                });
                document.getElementById("dictionarySuggestions").innerHTML=li;

                var list2= json["webServiceSuggestion"];
                var li2 = "";
                list2.forEach(element => {
                    li2 += "<li id='"+element+"' onclick='setSelectedWord("+element+")'>"+element+"</li>";
                });
                document.getElementById("serviceSuggestions").innerHTML=li2;
            }
          });
    }); 
  });
  function setSelectedWord(selectedWord) {
    var selectedSuggestion = selectedWord.innerText;
    var oldText = document.getElementById("userText").value;
    var newText = oldText.substr(0, oldText.lastIndexOf(" ")+1);
    newText=newText + selectedSuggestion;
    $("#userText").val(newText);
    document.getElementById("dictionarySuggestions").innerHTML="";
    document.getElementById("serviceSuggestions").innerHTML="";
  }