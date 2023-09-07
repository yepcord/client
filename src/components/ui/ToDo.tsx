interface ToDoProps {
    text: string,
}

export default function ToDo({text}: ToDoProps) {
    return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <div style={{fontSize: 18, color: "#00ffff"}}>
            // TODO: {text}
        </div>
    );
}