function buildHTML(message) {
  var image = message.image ?`<img src= "${message.image}">`:""; 
  var html = `<div class ="message" data-message-id="${message.id}">
                <div class ="upper-message">
                  <div class ="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class ="upper-message__date">
                    ${message.date}
                  </div>
                </div>
                <div class ="text-message">
                  <p class ="text-message__content">
                      ${content}
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
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
  })
.fail(function() {
  alert("メッセージ送信に失敗しました");
  });
});

//id属性はブラウザの検証を利用するとわかる。 new_messageと書いてある。
// 「console.log()」は何らかの文字列を出力するためのメソッド
//「コンソール」に表示したい内容を出力することで、プログラムが正常に動作しているかなどの確認が行える。
//  非同期通信を行うために、preventDefault()を使用してデフォルトのイベントを止める


// 上記コードは、『application.js』ファイルの『= require_tree .』の呼び出し処理がなければ使えない。
// 「app/assets/javascriptsディレクトリ以下のjsファイルをすべて読み込む」という意味。