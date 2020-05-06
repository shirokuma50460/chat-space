$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      ` <div class="chat-main__messeages__box">
          <div class="chat-main__messeages__box__name">
            ${message.user_name}
          </div>
          <div class="chat-main__messeages__box__day-time">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__messeages__message">
          ${message.content}
         <img src=${message.image} >
        </div>`
     return html;
   } else {
     var html =
      ` <div class="chat-main__messeages__box">
          <div class="chat-main__messeages__box__name">
            ${message.user_name}
          </div>
          <div class="chat-main__messeages__box__day-time">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__messeages__message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__messeages').append(html);
    $('form')[0].reset();
    $('.chat-main__messeages').animate({ scrollTop: $('.chat-main__messeages')[0].scrollHeight});
    $('.chat-main__form__send').attr('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
})
});