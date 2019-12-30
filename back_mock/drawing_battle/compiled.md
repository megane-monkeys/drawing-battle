FORMAT: 1A
HOST: http://example.org

 <!-- OpenIssue: https://github.com/Aconex/drakov/issues/147 -->

# drawing-battle API Reference

# Data Structures


# Group お題選択
ランダムシード値から回答ラベルを抽出します。

## お題
### お題取得 [GET /d-battle/api/v1/answers{?seed}]
+ Parameter
    + seed: 1(number,optional) - 正解ラベルを選択するときの乱数シード
+ Response 200 (application/json)
    + Attribute
        + label: うさぎ(string, required)



# Group 予測
## 予測
### 予測結果取得 [POST /d-battle/api/v1/predicts]
+ Request (application/json)
    + Attribute (array, required, fixed-type)
        +  (array, required, fixed-type)
            + (array, required, fixed-type)
                + (number)
                + (number)
                + (number)

+ Response 200 (application/json)
    + Attribute
        + label: うさぎ(string, required)
