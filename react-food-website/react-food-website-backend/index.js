// Expressライブラリと仮データをインポート
import express from "express";
// import * as data from "./sample-data.js";
import sequelize from "sequelize";
// import { Restaurant, Review, User } from "./migration.js";

import cors from "cors"; // CORS (Cross-origin resource sharing)を可能にする
import { Restaurant, Review, User } from "./models.js";

// Expressアプリケーションのインスタンスを作成
const app = express();
app.use(cors());

// ===== エンドポイントの実装 =====
// 1. レストランの一覧を取得するエンドポイント
app.get("/restaurants", async (req, res) => {   // reqパスに対するGETリクエストを，resハンドラーの関数で処理する
    // クエリ文字列；/restaurants?limit=3&offset=5みたいなやつ（省略可能）
    const limit = +req.query.limit || 5;   // 取得件数を保持する変数；reqで指定がなければデフォルトで5件
    const offset = +req.query.offset || 0; // オフセットを保持する変数；reqで指定がなければ0件目（頭）から取得していく
    // 「+」は「単項プラス演算子」と呼ばれ，数値に型変換してくれる
    
    const restaurants = await Restaurant.findAndCountAll({
        attributes: {
            include: [
                [
                    sequelize.literal(
                        `(SELECT COUNT(*) FROM reviews AS r WHERE r.restaurant_id = restaurant_id)`,
                    ),
                    "review_count",
                ],
            ],
        },
        include: { model: Review, limit: 3, include: {model: User}}, // 関係が設定されたテーブルをJOINした上で，結果を取得するようにする；ここでは，userテーブルをJOINすることで，レビューを書いたユーザの情報を含んだうえでレスポンスを返す
        order: [[ sequelize.literal("review_count"), "DESC"]],
        limit,
        offset,
    });
    res.json(restaurants);
});

// 2. 任意のレストランの詳細を取得するエンドポイント
app.get("/restaurants/:restaurantId", async (req, res) => {
    const restaurantId = +req.params.restaurantId;      // プレースホルダ/resutaurants/:restaurantIdから，パラメータrestaurantIdを取り出す
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant){                                   // レストランが見つからなければ404
        res.status(404).send("Not found");
        return;
    }
    res.json(restaurant)                                // レストランが見つかればjsonで返す
})

// 3. 任意のレストランに対するレビューを取得するエンドポイント
// このエンドポイントは，上記2つの組み合わせで実装できる
app.get("/restaurants/:restaurantId/reviews", async(req, res) => {
    const restaurantId = +req.params.restaurantId;
    const limit = +req.query.limit || 5;
    const offset = +req.query.offset || 0;
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant){
        res.status(404).send("Not found");
        return;
    }

    // restaurantIdが一致するreviewをすべて取り出したい
    const reviews = await Review.findAndCountAll({
        include: { model: User },
        where: { restaurantId },
        limit,
        offset,
    });
    res.json(reviews);
});


// ===== サーバの起動 =====

// ポート番号の指定
const port = process.env.PORT || 5000; // ローカル開発では5000番でよいが，HerokuでAPIサーバとして公開する際には「環境変数」で渡されるため，その際はそちらを優先する
// サーバの起動
app.listen(port, () => {               // listenの引数は(port, handler)で，handlerはサーバが起動した際に実行される関数
    console.log(`Listening on port ${port}`);
});


/* 仮データはもう使わない
// ===== エンドポイントの実装 =====
// 1. レストランの一覧を取得するエンドポイント
app.get("/restaurants", async (req, res) => {   // reqパスに対するGETリクエストを，resハンドラーの関数で処理する
    // クエリ文字列；/restaurants?limit=3&offset=5みたいなやつ（省略可能）
    const limit = +req.query.limit || 5;   // 取得件数を保持する変数；reqで指定がなければデフォルトで5件
    const offset = +req.query.offset || 0; // オフセットを保持する変数；reqで指定がなければ0件目（頭）から取得していく
    // 「+」は「単項プラス演算子」と呼ばれ，数値に型変換してくれる
    
    const restaurants = data.restaurants;  // レコードを取り出す

    res.json({
        rows: restaurants.slice(offset, offset + limit), // レコードから，配列のsliceメゾッドを用いてoffset件目～offset+limit件目までをjsonで，レスポンス（返す）
        count: data.restaurants.length,
    });
});

// 2. 任意のレストランの詳細を取得するエンドポイント
app.get("/restaurants/:restaurantId", async (req, res) => {
    const restaurantId = +req.params.restaurantId;      // プレースホルダ/resutaurants/:restaurantIdから，パラメータrestaurantIdを取り出す
    const restaurant = data.restaurants.find(           // 仮データ内のrestaurantsから，restaurantIdに一致するようなrestaurantオブジェクトを探す
        (restaurant) => restaurant.id === restaurantId
    );
    if (!restaurant){                                   // レストランが見つからなければ404
        res.status(404).send("Not found");
        return;
    }
    res.json(restaurant)                                // レストランが見つかればjsonで返す
})

// 3. 任意のレストランに対するレビューを取得するエンドポイント
// このエンドポイントは，上記2つの組み合わせで実装できる
app.get("/restaurants/:restaurantId/reviews", async(req, res) => {
    const restaurantId = +req.params.restaurantId;
    const limit = +req.query.limit || 5;
    const offset = +req.query.offset || 0;
    const restaurant = data.restaurants.find(
        (restaurant) => restaurant.id === restaurantId
    );
    if (!restaurant){
        res.status(404).send("Not found");
        return;
    }

    // restaurantIdが一致するreviewをすべて取り出したい
    const reviews = data.reviews.filter(                // findは配列から一致した「最初の値」のみを返すが，filterは一致した値を「すべて」返す
        (review) => review.restaurantId === restaurantId
    );
    res.json({
        count: reviews.length,
        rows: reviews.slice(offset, offset + limit),
    });
    // この状態のjsonは，各レコードがid, title, commentなど多くの情報を持ったまま
    // 表示する際にさらに成形する
});
*/