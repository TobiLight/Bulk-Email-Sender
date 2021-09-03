import { useState } from "react";
import NavBar from "./components/common/NavBar";
import Form from "./components/Form";

export type Recipients = string
export type Subject = string
export type Body = string
export interface Email {
  recipients: Recipients,
  subject: Subject,
  body: Body
}

function App() {
  const [email, setEmail] = useState<Email>({
    recipients: "",
    subject: "",
    body: ""
  })


  return (
    <>
      <NavBar />
      <Form />
    </>
  );
}

export default App;
