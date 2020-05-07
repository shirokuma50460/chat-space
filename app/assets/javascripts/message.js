$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      ` <div class="chat-main__index" data-message-id=${message.id}>
          <div class="chat-main__messeages__box">
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
            <img src=${message.image} >
          </div>
        </div>`
     return html;
   } 
   else {
     var html =
      ` <div class="chat-main__index" data-message-id=${message.id}>
          <div class="chat-main__messeages__box">
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
          </div>
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
  $(function(){
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.chat-main__index:last').data("message-id");
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          //追加するHTMLの入れ物を作る
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.chat-main__messeages').append(insertHTML);
          $('.chat-main__messeages').animate({ scrollTop: $('.chat-main__messeages')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
    }
  })
})
