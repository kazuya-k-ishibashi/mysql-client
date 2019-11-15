
# mysql-client

## Install

```
$ yarn install
$ yarn build
```


## Config

ormconfigを作成する。  
https://typeorm.io/#/using-ormconfig


## Boot

```
$ yarn start
```


## Command

「;」を入力するまでをひとつのコマンドとして読み取ります。


  - connect [databaseName];
  - disconnect;
  - exit;
  - その他


### connect [databaseName];

ormconfigのname属性を参照し、指定されたdatabaseNameに一致する接続設定を用いてデータベースへ接続します。


### disconnect;

現在接続しているデータベースへの接続を終了します。


### exit;

アプリを終了します。  
データベースへ接続している場合、その接続を終了します。


### その他

現在接続しているデータベースへSQLとして送信します。  
データベースに接続していない場合、エラーを返します。

