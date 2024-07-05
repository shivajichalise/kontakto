import type { ActionFunctionArgs } from "@remix-run/node"
import { Form, redirect, useNavigate } from "@remix-run/react"
import { createContact } from "../data.server"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    await createContact(data)
    return redirect(`/`)
}
export default function CreateContact() {
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
                        />
                        <Input type="email" name="email" placeholder="Email" />
                    </div>
                    <div className="flex items-center justify-around gap-2">
                        <Input
                            type="text"
                            name="mobile"
                            placeholder="Mobile no."
                        />
                        <Input
                            type="text"
                            name="phone"
                            placeholder="Phone no."
                        />
                    </div>
                    <div className="flex items-center justify-around gap-2">
                        <Input
                            type="text"
                            name="avatar"
                            placeholder="Avatar url"
                        />
                        <Input
                            type="text"
                            name="instagram"
                            placeholder="Instagram"
                        />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <Button type="submit">Create</Button>
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
