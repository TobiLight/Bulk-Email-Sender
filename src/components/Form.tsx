import React, { useState, VFC } from "react";
import FormButton from "./common/form/FormButton"
import { Email } from "../App";

type Error = string
type Success = string
interface IFormProps {
    email: Email,
    setEmail: React.Dispatch<React.SetStateAction<Email>>
}


const Form: VFC<IFormProps> = ({ email, setEmail }): JSX.Element => {
    const [error, setError] = useState<Error>("")
    const [success, setSuccess] = useState<Success>("")
    const [input, setInput] = useState<Email>({
        recipients: [],
        subject: "",
        body: ""
    })
    const [recipients, setRecipients] = useState("")
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        setInput({ ...input, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleTextInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput({ ...input, body: event.currentTarget.value })
    }


    const handleclick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if (!input.recipients || !input.subject || !input.body) {
            setError("You need to fill in all the fields boss!")
            return
        }
        setEmail({ ...email, recipients: input.recipients, subject: input.subject, body: input.body })
        setInput({ recipients: "" || [], subject: "", body: "" })
        setSuccess("Your message has been sent! 👍")
    }

    return (
        <div className="mx-auto w-2/4 mt-8">
            <p className="text-lg text-red-600 font-bold">{error}</p>
            <form>
                <div className="mb-4">
                    <label htmlFor="recipients" className="flex items-center font-semibold">Send To</label>
                    <input
                        type="text"
                        name="recipients"
                        value={input.recipients}
                        className="w-full p-3 border border-gray-300 focus:outline-none rounded"
                        placeholder="john@example.com"
                        onChange={handleChange}
                        required
                    />

                    <pre className="text-xs font-bold text-right">(You can paste up to 50 emails at once using a "," to seperate them 😉)</pre>
                </div>

                <div className="mb-4">
                    <label htmlFor="email-subject" className="flex items-center font-semibold">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={input.subject}
                        className="w-full p-3 border border-gray-300 focus:outline-none rounded"
                        placeholder="john@example.com"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email-subject" className="flex items-center font-semibold">Your message</label>
                    <textarea name="body" id="" cols={30} rows={10} onChange={handleTextInputChange}
                        className="w-full p-3 border border-gray-300 focus:outline-none rounded" placeholder="Hello world" value={input.body}
                    ></textarea>
                </div>
                <FormButton handleClick={handleclick} class="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-sm w-full" />
            </form>
            <p className="text-green-600 font-semibold text-md">{success}</p>
        </div>
    )
}

export default Form