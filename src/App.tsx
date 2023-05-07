import CodeDisplay from "./components/CodeDispaly";
import MessagesDisplay from "./components/MessagesDisplay";
import { useState } from "react";


function App() {
  interface ChatData {
    role: string,
    content: string,
  }
  const[value, setValue] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);

  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
        }),
      };
      const response = await fetch("http://localhost:8001/completions", options);
      const data = await response.json();
      console.log(data);
      const userMessage = {
        role: "user",
        content: value
      }
      setChat(oldChat => [...oldChat, data, userMessage])
    } catch (error) {
      console.error(error);
    }
  };

    const filteredUserMessages = chat.filter(message => message.role === "user")
    const latestQuery = chat.filter(message => message.role === "assistant").pop()

    const clearChat = () => {
      setValue("")
      setChat([])
    }

  return (
    <div className="app">
      <MessagesDisplay userMessages = {filteredUserMessages} />
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      <CodeDisplay text={latestQuery?.content || " "}  />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>
          Get Query!
        </button>
        <button id="clear-chat" onClick = {clearChat}>Clear Chat</button>
      </div>
    </div>
  );
}

export default App;
