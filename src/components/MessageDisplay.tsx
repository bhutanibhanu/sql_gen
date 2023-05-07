interface UserMessage {
    role : string,
    content: string
}

interface MessageDisplayProps {
    message : UserMessage
}

function MessageDisplay({ message} : MessageDisplayProps ) {
    return (
      <div className="message-display">
        <p id="icon">⊙</p>
        <p>{message.content}</p>
      </div>
    );
  }
  
  export default MessageDisplay;