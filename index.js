const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// LINE Messaging API用の設定
const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: '2006460991',
  channelSecret: 'c4584a9ab0cc4ddac438e2f2fdb1136e'
};
const client = new line.Client(config);

// リクエストの解析
app.use(bodyParser.json());

// Webhookエンドポイント
app.post('/callback', (req, res) => {
  const events = req.body.events;  // LINEから送られたイベント情報

  // イベントごとに処理を行う
  events.forEach((event) => {
    const userId = event.source.userId;  // ユーザーIDを取得

    // もしQRコード1に対応するメッセージなら
    if (event.message.text === 'qr1') {
      client.pushMessage(userId, {
        type: 'text',
        text: 'スポット1をクリアしました！'
      });
    }

    // もしQRコード2に対応するメッセージなら
    else if (event.message.text === 'qr2') {
      client.pushMessage(userId, {
        type: 'text',
        text: 'スポット2をクリアしました！'
      });
    }
  });

  res.status(200).end();  // 成功レスポンス
});

// サーバーを起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`サーバーがポート${port}で起動しました！`);
});
