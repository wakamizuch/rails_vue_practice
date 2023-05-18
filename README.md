# Ruby on Rails x Vue.js practice

このプロジェクトは Rails x Vue のWebアプリケーションテンプレートです。<br>
始める場合は、Dockerが使用できる環境を準備してから **環境構築** のステップを踏んでください。

## 環境構築
まずはこのプロジェクトをForkします。<br>
自分のアカウントにリポジトリがコピーされたら、それをCloneします。
```bash
# リポジトリをClone
$ git clone git@github.com:{Your Account Name}/rails_vue_practice.git
$ cd rails_vue_practice

# Dockerのbuildを実行します
$ sudo docker compose build
```
## 利用方法

### プロジェクトの起動
```bash
# Dockerコンテナを立ち上げます
# vueの初回起動はかなり時間がかかります
$ sudo docker compose up
```

### アプリケーションへのアクセス
**localhost:8080** でWebページにアクセスできます。

### コンテナ内でのコマンド実行
*rails_exec* コマンドファイルと *vue_exec* コマンドファイルを利用して、コンテナ内部でコマンドを実行できます。

## コマンド早見表
※ 全てプロジェクトルートディレクトリで実行しています。
```bash
# --- Rails ---

# bundle install
$ sudo ./rails_exec bundle install
# rails console
$ sudo ./rails_exec rails console
# migrate
$ sudo ./rails_exec rails db:migrate
# モデル作成
$ sudo ./rails_exec rails g model {モデル名}


# --- Vue ---

# npm install
$ sudo ./vue_exec npm install xxx
$ sudo ./vue_exec npm install
```
