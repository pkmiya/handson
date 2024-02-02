import ReactDOM from "react-dom";
import { App } from "./app.jsx";
import { AdminFlagProvider } from "./components/providers/adminFlagProvider.jsx";

ReactDOM.render(
    <AdminFlagProvider>
        <App />
    </AdminFlagProvider>,
    document.getElementById("root")
);
// 参照できるようにしたい範囲の基準となるコンポーネントを囲む
// 今回はアプリ全体で参照できるように，Appコンポーネントを囲む