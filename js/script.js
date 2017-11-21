
$(document).ready(function() {

    var resultsDiv = $('#target');
    $('button').click(function(){
    	$.ajax({
    		url: 'data/data.xml',
    		type: 'GET',
    		dataType: 'xml',
    		success:parseXML,
      });
    });

  var imgs = ["imgs/superhot.jpg","imgs/hot.jpg", "imgs/cold.jpg","imgs/freezing.jpg"];
    
    function parseXML(data) {
      
      resultsDiv.empty().hide();
      $(data).find('quiz').each(function(){
           counter = 1;
           $(data).find('question').each(function(){
                var questionText='Q: ' +  counter + $(this).find('text').text();
                $('<p></p>').addClass('question')
                            .text(questionText)
                            .appendTo(resultsDiv);
                $(this).find('option').each(function() {
                            var optionText= $(this).text();
                            var isCorrect = $(this).attr("correct");
                            $('<p></p>').addClass('option')
                                        .text(optionText)
                                        .attr("data-correct", isCorrect)
                                        .appendTo(resultsDiv)
                });
                counter++;
                resultsDiv.append('<hr>');
          });
      });
     resultsDiv.fadeIn(1000) ;
    }

    $(document).on('mouseenter', function () {
      
      $(this).addClass('optionHovered');
    }) ;

    $(document).on('mouseleave', '.option', function () {
      
      $(this).removeClass('optionHovered');
    }) ;

    $(document).on('click', '.option', function() {
       $('body').css('background-image', 'url(' + imgs[2] +')');
      console.log('obj');
      console.log(imgs[2]);
      if ($(this).attr("data-correct") == 'true')
        $(this).addClass('correct');
      else
        $(this).addClass('wrong');
    });

});
