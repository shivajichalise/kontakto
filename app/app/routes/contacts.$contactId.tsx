import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import { getContactById } from "../data.server"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "~/components/ui/button"

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.contactId, "Missing contact id param")
    const contactId = params.contactId
    const contact = await getContactById(contactId)
    if (!contact) throw new Response("Not Found", { status: 404 })
    return json(contact)
}

export default function Contact() {
    const contact = useLoaderData<typeof loader>()

    return (
        <div className="flex w-full gap-10">
            <div>
                <Avatar className="mb-4 h-64 w-64 rounded-md">
                    <AvatarImage src={contact.attributes.avatar} />
                    <AvatarFallback>DA</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col items-start gap-5">
                <div className="flex flex-col gap-2">
                    <h1 className="text-5xl font-semibold">
                        {contact.attributes.name}
                    </h1>
                    <a
                        href={`https://instagram.com/${contact.attributes.instagram}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-400"
                    >
                        @{contact.attributes.instagram}
                    </a>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="flex items-center gap-2 text-xl text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4"
                        >
                            <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                            <path
                                fill-rule="evenodd"
                                d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
                                clip-rule="evenodd"
                            />
                        </svg>

                        {`: ${contact.attributes.mobile}`}
                    </p>
                    <p className="flex items-center gap-2 text-xl text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                clip-rule="evenodd"
                            />
                        </svg>

                        {`: ${contact.attributes.phone}`}
                    </p>
                    <p className="flex items-center gap-2 text-xl text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4"
                        >
                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg>
                        <a
                            href={`mailto:${contact.attributes.email}`}
                        >{`: ${contact.attributes.email}`}</a>
                    </p>
                </div>
                <div className="flex gap-2">
                    <Form action="edit">
                        <Button type="submit" variant="outline">
                            Edit
                        </Button>
                    </Form>
                    <Form
                        action="destroy"
                        method="POST"
                        onSubmit={(event) => {
                            const response = confirm(
                                "Please confirm you want to delete this record."
                            )
                            if (!response) {
                                event.preventDefault()
                            }
                        }}
                    >
                        <Button type="submit" variant="destructive">
                            Delete
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
