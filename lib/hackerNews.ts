export const getStories = async () => {
    const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json",
        { cache: "no-store" }
    )
    const data = await res.json()
    return data
}

export const getItem = async (id: number) => {
    const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        { cache: "no-store" }
    )
    const data = await res.json()
    return data
}

export const getUser = async (user: string) => {
    const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/user/${user}.json`,
        { cache: "no-store" }
    )
    const data = await res.json()
    return data
}
