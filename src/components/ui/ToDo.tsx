interface ToDoProps {
    text: string,
}

export default function ToDo({text}: ToDoProps) {
    return (
        <div style={{fontSize: 18, color: "#00ffff"}}>
            // TODO: {text}
        </div>
    );
}