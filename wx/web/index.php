<?php

require '../vendor/autoload.php';
use \EasyWeChat\Foundation\Application;

$options = [
  'debug'  => true,
  'app_id' => 'wx1e47d3e921e8c9f7',
  'secret' => '675e32e48a0c59416768d8d5ab400cf5',
  'token'  => 'hch0629',
  'aes_key' =>'oIjCxTnCwXVCD4bgeceS4d6Y44YFg5exKj6ybGs8xmD',
  'log' => [
      'level' => 'debug',
      'file'  => '/tmp/easywechat.log', 
  ],
];

$app = new Application($options);
$server = $app->server;

$server->setMessageHandler(function ($message) {
  // $message->FromUserName // 用户的 openid
  // $message->MsgType // 消息类型：event, text....
  return "您好！欢迎关注我!";
});
$response = $server->serve();
$response->send(); 