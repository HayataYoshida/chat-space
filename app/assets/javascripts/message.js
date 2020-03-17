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



$(function(){
  var reloadMessages = function(){  //自動更新の関数
    if (window.location.href.match(/\/groups\/\d+\/messages/)){ //今いるページのリンクが/groups/グループid/messagesであれば以下を実行
      var last_message_id = $('.message:last').data("message-id"); //dataメソッドで.messageにある:last(最後)のカスタムデータ属性を取得しlast_message_idに代入
      $.ajax({
        url: "api/messages", //サーバの指定(api/message_controller)
        type: 'get', //メソッド(get)
        dataType: 'json', //データの形式(json)
        data: {id: last_message_id} //飛ばすデータ(取得したlast_message_id)
      })
      .done(function(messages){ //自動更新成功の時の処理(controllerから受け取ったmessageを引数にする)
        var insertHTML = ''; //HTMLの入れ物
        messages.forEach(function(message){ //配列messagesの中身一つ一つをHTMLに変換して入れ物に足し合わせる
          insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得 
          $(".messages").append(insertHTML); //メッセージを追加
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 50); //自動更新が成功した時(メッセージが送信できた時)のみ一番下までスクロールする
        })
      })

      .fail(function(){ //自動更新が失敗した時の処理
        alert('自動更新に失敗しました'); //アラートを出す
      });
    }
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000); //7000ミリ秒(7秒)ごとにreloadMessages(自動更新の関数)を実行
});
});

//id属性はブラウザの検証を利用するとわかる。 new_messageと書いてある。
// 「console.log()」は何らかの文字列を出力するためのメソッド
//「コンソール」に表示したい内容を出力することで、プログラムが正常に動作しているかなどの確認が行える。
//  非同期通信を行うために、preventDefault()を使用してデフォルトのイベントを止める


// 上記コードは、『application.js』ファイルの『= require_tree .』の呼び出し処理がなければ使えない。
// 「app/assets/javascriptsディレクトリ以下のjsファイルをすべて読み込む」という意味。