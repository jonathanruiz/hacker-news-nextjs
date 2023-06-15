import { get } from "http"

const getStories = async () => {
    const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
    )
    const data = await res.json()
    return data
}

const getStory = async (id: number) => {
    const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    )
    const data = await res.json()
    return data
}

const IndexPage = async () => {
    const stories = await getStories()
    stories.length = 20 // limit stories to 20

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    Hacker News Clone with Next.js 13
                </h1>
                {stories.map((story: any) => (
                    <div key={story}>
                        {getStory(story).then((data) => (
                            <div className="flex flex-col gap-2">
                                <a
                                    href={data.url}
                                    className="text-xl font-bold leading-tight tracking-tighter md:text-2xl"
                                >
                                    {data.title}
                                </a>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default IndexPage
