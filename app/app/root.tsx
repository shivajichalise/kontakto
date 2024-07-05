import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    Link,
    useLoaderData,
} from "@remix-run/react"
import "./tailwind.css"

import { json } from "@remix-run/node"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Input } from "./components/ui/input"
import { getContacts } from "~/data.server"
import { Button } from "./components/ui/button"

export async function loader() {
    const contacts = await getContacts()
    return json({ contacts })
}

export function Layout({ children }: { children: React.ReactNode }) {
    const { contacts } = useLoaderData<typeof loader>()

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <nav className="fixed z-50 flex h-12 w-full items-center justify-center bg-gray-50 shadow">
                    <h1>Kontakto</h1>
                </nav>

                <aside
                    id="default-sidebar"
                    className="fixed left-0 top-12 h-full w-72"
                    aria-label="Sidebar"
                >
                    <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
                        <div className="flex gap-1">
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="mb-4 bg-gray-100"
                            />
                            <Button asChild>
                                <Link to="contacts/create">New</Link>
                            </Button>
                        </div>
                        {contacts.length ? (
                            <ul className="space-y-2 font-medium">
                                {contacts.map((contact: any) => (
                                    <li key={contact.id}>
                                        <Link
                                            to={`contacts/${contact.id}`}
                                            className="group flex items-center rounded-lg p-1 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            <Avatar>
                                                <AvatarImage
                                                    src={
                                                        contact.attributes
                                                            .avatar
                                                    }
                                                />
                                                <AvatarFallback>
                                                    DA
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="ms-3">
                                                {contact.attributes.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>
                                <i>No contacts</i>
                            </p>
                        )}
                    </div>
                </aside>

                <div className="px-4 pb-4 pt-16 sm:ml-72">
                    <Outlet />
                </div>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {}
