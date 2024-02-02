import { createContext, useState } from "react";

// Contextの器を作成
export const AdminFlagContext = createContext({});

export const AdminFlagProvider = (props) => {
    const { children } = props;

    // AdminかどうかのフラグisAdminが変数なので，初期値はfalse
    // 第2引数であるsetIsAdminの処理は，app.jsxで記述されている
    const [isAdmin, setIsAdmin] = useState(false);

    // AdminFlagContextの中にProviderがあるので，それをchildrenで囲む
    // valueの中に，グローバルに扱いたい実際の値を設定
    return (
        <AdminFlagContext.Provider value = {{isAdmin, setIsAdmin}}>
            {children}
        </AdminFlagContext.Provider>
    ); // valueに「useState」の返り値を設定する
       // これにより，グローバルに管理者フラグの参照・更新が行える
};