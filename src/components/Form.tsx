import React, { useState, VFC } from "react";
import { Email } from "../App";
import axios from 'axios'


type Error = string
type Success = string
// interface IFormProps {
//     email: Email,
//     setEmail: React.Dispatch<React.SetStateAction<Email>>
// }
interface ButtonProps {
    btnText: string
    btnClass: string
}


const Form: VFC = (): JSX.Element => {
    const [error, setError] = useState<Error>("")
    const [success, setSuccess] = useState<Success>("")
    const [btnProps, setBtnProps] = useState<ButtonProps>({
        btnText: "Send email", btnClass: "mb-3 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-sm w-full"
    })
    const [input, setInput] = useState<Email>({
        recipients: "",
        subject: "",
        body: ""
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        if (event.currentTarget.name === 'recipients') {
            setInput({ ...input, recipients: event.currentTarget.value })
        }
        if (event.currentTarget.name === 'subject') {
            setInput({ ...input, subject: event.currentTarget.value })
        }
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
        setBtnProps({ ...btnProps, btnText: "Sending...⌛", btnClass: "mb-3 bg-purple-400 opacity-50 cursor-not-allowed text-white p-2 rounded-sm w-full" })
        axios.post("http://localhost:1017/send", input).then(data => setSuccess(data.data.message)).catch(err => setError(err.response.data.message))
        setInput({ recipients: "", subject: "", body: "" })
        setBtnProps({
            ...btnProps,
            btnText: "Send email", btnClass: "mb-3 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-sm w-full"
        })
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
                <button onClick={handleclick} className={btnProps.btnClass}>{btnProps.btnText}</button>
            </form>
            <p className="text-green-600 font-semibold text-md">{success}</p>
        </div>
    )
}

export default Form