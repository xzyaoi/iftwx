<?php

require '../vendor/autoload.php';
use \EasyWeChat\Foundation\Application;
use \EasyWeChat\Message;
use \Parse\ParseClient;
use \Parse\ParseUser;
use \Parse\ParseException;

// Parse Configuration
ParseClient::initialize( 'zhulijun-app-id', null, 'an82as3aHDa62IFaJw' );
ParseClient::setServerURL('https://cloud.yice.org.cn','zhulijun');

// Wx App Options
$options = [
  'debug'  => true,
  'app_id' => 'wx1e47d3e921e8c9f7',
  'secret' => '675e32e48a0c59416768d8d5ab400cf5',
  'token'  => 'hch0629',
  'aes_key' => 'oIjCxTnCwXVCD4bgeceS4d6Y44YFg5exKj6ybGs8xmD', // 可选
  'log' => [
      'level' => 'debug',
      'file'  => '/tmp/easywechat.log',
  ],
];

$app = new Application($options);
$server = $app->server;

$server->setMessageHandler(function ($message) {
  if($message->Content=='ni'){
    return 'it is ni!'
  }
  return $message->Content;
});

$response = $server->serve();
$response->send(); 