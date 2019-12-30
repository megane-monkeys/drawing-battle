# 使用方法
## 仕様書ビルド

以下コマンドを実行。outputディレクトリに各仕様書が出力される。
```
$ ./build.sh
```

## ライブサーバ
仕様書変更時にリアルタイムで変更を確認できるサーバ。

### 起動
下記コマンドを実行。
```
$ docker-compose run --service-ports -d aglio aglio --theme-variables default --theme-template triple -i ./drawing_battle/index.apib --verbose -s -h 0.0.0.0
```
その後ブラウザ上で`http://localhost:3000/`にアクセスする事で、<br>
変更後の仕様書内容をリアルタイムで確認できる。

### 終了
下記コマンドを実行
```
$ docker-compose down
```

## モックサーバ
仕様書に基づいたモックサーバの立ち上げ

### 起動
以下のコマンドを実行。
```
$ docker-compose run -d aglio aglio -i ./drawing_battle/index.apib --compile -o ./drawing_battle/compiled.md
$ docker-compose run -d --service-ports aglio drakov -f ./drawing_battle/compiled.md --public --watch --debugMode --p 3001 --autoOptions --header Authorization --method GET --method PUT --method POST --method DELETE --method OPTIONS
```
その後、`http://localhost:3001/`へクエリを投げる事でモック動作を確認できる。

### 終了
下記コマンドを実行
```
$ docker-compose down
```
終了時はdownする。

## 実行例
```
curl -XGET http://localhost:3001/d-battle/api/v1/answers?seed=1 -H "Content-Type:application/json"
```

```
curl -XPOST http://localhost:3001/d-battle/api/v1/predict -H "Content-Type:application/json" -d "[[[1,1,1],[2,2,2],[3,3,3]]]" 
```
