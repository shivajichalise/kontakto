import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Form, redirect, useLoaderData, useNavigate } from "@remix-run/react"
import invariant from "tiny-invariant"
import { getContactById, updateContact } from "../data.server"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.contactId, "Missing contact id param")
    const contactId = params.contactId
    const contact = await getContactById(contactId)
    if (!contact) throw new Response("Not Found", { status: 404 })
    return json(contact)
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param")
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    await updateContact(params.contactId, updates)
    return redirect(`/contacts/${params.contactId}`)
}
export default function EditContact() {
    const contact = useLoaderData<typeof loader>()
    const navigate = useNavigate()

    return (
        <Form method="POST">
            <div className="mt-10 flex h-[calc(100vh-5rem)] w-full flex-col items-center justify-start">
                <div className="flex w-9/12 flex-col gap-4">
                    <div className="flex items-center justify-around gap-2">
                        <Input
                            type="text"
                            name="name"
                            placeholder="Full name"
                            defaultValue={contact.attributes.name}
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            defaultValue={contact.attributes.email}
                        />
                    </div>
                    <div className="flex items-center justify-around gap-2">
                        <Input
                            type="text"
                            name="mobile"
                            placeholder="Mobile no."
                            defaultValue={contact.attributes.mobile}
                        />
                        <Input
                            type="text"
                            name="phone"
                            placeholder="Phone no."
                            defaultValue={contact.attributes.phone}
                        />
                    </div>
                    <div className="flex items-center justify-around gap-2">
                        <Input
                            type="text"
                            name="avatar"
                            placeholder="Avatar url"
                            defaultValue={contact.attributes.avatar}
                        />
                        <Input
                            type="text"
                            name="instagram"
                            placeholder="Instagram"
                            defaultValue={contact.attributes.instagram}
                        />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <Button type="submit">Save</Button>
                        <Button
                            type="button"
                            onClick={() => navigate(-1)}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    )
}
