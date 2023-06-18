import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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

const getUser = async (user: string) => {
    const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/user/${user}.json`
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
                            <div>
                                <div className="flex items-center">
                                    <a href={data.url}>
                                        <p className="text-lg font-bold leading-tight tracking-tighter md:text-xl">
                                            {data.title}
                                        </p>
                                    </a>
                                    <a href="#" className="ml-2">
                                        <span className="font-slate-100">
                                            by <Badge>{data.by}</Badge>
                                        </span>
                                    </a>
                                </div>
                                <div>
                                    <a href={`/discussion/${data.id}`}>
                                        <span className="font-slate-100">
                                            {data.descendants} comments
                                        </span>
                                    </a>
                                </div>
                                <Separator className="my-4 h-1" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default IndexPage
