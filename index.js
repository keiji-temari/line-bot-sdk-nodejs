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

// QRコードに対応するエンドポイント
app.get('/qr1', (req, res) => {
  const userId = 'ユーザーのLINE ID';  // ここにユーザーIDを取得するロジックが必要
  client.pushMessage(userId, {
    type: 'text',
    text: 'スポット1をクリアしました！'
  });
  res.send('QR1 スキャン完了');
});

app.get('/qr2', (req, res) => {
  const userId = 'ユーザーのLINE ID';
  client.pushMessage(userId, {
    type: 'text',
    text: 'スポット2をクリアしました！'
  });
  res.send('QR2 スキャン完了');
});

// サーバーを起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`サーバーがポート${port}で起動しました！`);
});
