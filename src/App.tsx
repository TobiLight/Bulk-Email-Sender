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
  return (
    <>
      <NavBar />
      <Form />
    </>
  );
}

export default App;
