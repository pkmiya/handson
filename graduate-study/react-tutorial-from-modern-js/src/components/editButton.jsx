import { useContext } from "react"
import { AdminFlagContext } from "./providers/adminFlagProvider";

const style = {
    width: "100px",
    padding: "6px",
    borderRadius: "8px"
};

export const EditButton = () => {
    // contextからisAdminを取得し，それをもとにボタンのプロパティを設定
    // 引数からpropsが消えてくれた！
    // その代わりにuseContextを使う（グローバル変数みたいに扱う）
    const {isAdmin} = useContext(AdminFlagContext);
    // providerにはvalue = {{isAdmin, setIsAdmin}}としたので，1つめのisAdminのみを取得できるしている

    return (
        <button style = {style} disabled = {!isAdmin}>
            編集
        </button>
    );
};