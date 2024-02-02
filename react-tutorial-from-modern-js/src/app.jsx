import { useContext } from "react";
import { AdminFlagContext } from "./components/providers/adminFlagProvider.jsx";
import { Card } from "./components/card.jsx";

export const App = () => {
    // Admin flag
    const { isAdmin, setIsAdmin } = useContext(AdminFlagContext);
    // Adminフラグと，span切り替えのためにsetIsAdminを使う
    // useStateを使うのはadminFlagProviderだけになった！
    // 他に参照したいときは，useContextを使うようにする

    // Toggle (when button pushed)
    const onClickSwitch = () => {
        setIsAdmin(!isAdmin);
    }

    return (
        <div>
            {isAdmin ? <span>管理者です</span> : <span>管理者以外です</span>}
            <button onClick = {onClickSwitch}>切り替え</button>
            <Card isAdmin = {isAdmin} />
        </div>
    );
};