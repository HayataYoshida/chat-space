$(function(){

  function buildHTML(message){
    console.log(message)
    image = ( message.image ) ? `<img class="lower-message__image" src=${message.image} >` : ""; //三項演算子
                var html =  
                ` <div class="message" data-message-id="${message.id}">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                  ${message.content}
                  </p>
                  ${image}
                </div>
              </div>`
          return html; 
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
      $('.messages').append(html);
      $("form")[0].reset();
      $('input').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 50);
    })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });
  
               //以下は自動更新の記述
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
      })
      .fail(function() {
        alert('error');
      });
    };
  
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);    // 引数で渡している7000という数字は、7秒という意味
  }   

  });




//id属性はブラウザの検証を利用するとわかる。 new_messageと書いてある。
// 「console.log()」は何らかの文字列を出力するためのメソッド
//「コンソール」に表示したい内容を出力することで、プログラムが正常に動作しているかなどの確認が行える。
//  非同期通信を行うために、preventDefault()を使用してデフォルトのイベントを止める


// 上記コードは、『application.js』ファイルの『= require_tree .』の呼び出し処理がなければ使えない。
// 「app/assets/javascriptsディレクトリ以下のjsファイルをすべて読み込む」という意味。