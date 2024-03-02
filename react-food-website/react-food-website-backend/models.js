// データベースとプログラムの関係を定義したもの

import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const url = // heroku用に環境変数を与えておく
    process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/review_app";
    // postgress://[ユーザ名]:[パスワード]@[ホスト名]:[ポート番号]/[データベース名]
export const sequelize = new Sequelize(url); // URLに示されたデータベースに接続

// ===== テーブルの定義 =====
// 1. usersテーブル
export const User = sequelize.define(        // 第1引数: テーブル名, 第2引数: 列の情報, 第3引数: オプション 
    "user",
    {
        sub: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { underscored: true } // 外部キーの命名規則をcamelCaseからsnake_caseにする
);

// 2. restaurantsテーブル
export const Restaurant = sequelize.define(
    "restaurant", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        map: {
            type: DataTypes.TEXT,
        },
    },
    { underscored: true }
);

export const Review = sequelize.define(
    "review", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
            },
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Restaurant,
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { underscored: true }
);


// ===== テーブル間の関係定義 =====
Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);

User.hasMany(Review);
Review.belongsTo(User);