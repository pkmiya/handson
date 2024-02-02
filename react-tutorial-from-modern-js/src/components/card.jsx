import { EditButton } from "./editButton";
const style = {
    width: "300px",
    height: "200px",
    margin: "8px",
    boderRadius: "8px",
    backgroundColor: "#e9dbd0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};

export const Card = () => {
    return (
        <div style = {style}>
            <p>山田太郎</p>
            <EditButton />
        </div>
    );
};