const URL = process.env.STRAPI_URL || "http://127.0.0.1:1337"

type ContactMutation = {
    id?: string
    first?: string
    last?: string
    avatar?: string
    twitter?: string
    notes?: string
    favorite?: boolean
}

export type ContactRecord = ContactMutation & {
    id: string
    createdAt: string
}

export async function getContacts() {
    try {
        const res = await fetch(`${URL}/api/contacts`)
        const contacts = await res.json()
        return contacts.data
    } catch (err) {
        console.error(err)
        throw new Response("Oh no! Something went wrong!", {
            status: 500,
        })
    }
}

export async function getContactById(id: string) {
    try {
        const res = await fetch(`${URL}/api/contacts/${id}`)
        const contact = await res.json()
        return contact.data
    } catch (err) {
        console.error(err)
        throw new Response("Oh no! Something went wrong!", {
            status: 500,
        })
    }
}

export async function createContact(data: ContactMutation) {
    try {
        const response = await fetch(URL + "/api/contacts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { ...data } }),
        })
        const res = await response.json()
        return res
    } catch (error) {
        throw new Error("Oh no! Something went wrong!")
    }
}

export async function updateContact(id: string, updates: ContactMutation) {
    try {
        const response = await fetch(URL + "/api/contacts/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { ...updates } }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error("Oh no! Something went wrong!")
    }
}

export async function deleteContact(id: string) {
    try {
        const response = await fetch(URL + "/api/contacts/" + id, {
            method: "DELETE",
        })
        const data = await response.json()
        console.log("DELETE data:", data)
        return data
    } catch (error) {
        throw new Error("Oh no! Something went wrong!")
    }
}
