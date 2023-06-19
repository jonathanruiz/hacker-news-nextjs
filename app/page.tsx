import Link from "next/link"
import { getStories, getStory } from "@/utils/hackerNews"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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
                                    <Link href="#" className="ml-2">
                                        <span>
                                            by <Badge>{data.by}</Badge>
                                        </span>
                                    </Link>
                                </div>
                                <div>
                                    <Link href={`/discussion/${data.id}`}>
                                        <span className="text-slate-900 dark:text-slate-400">
                                            {data.descendants} comments
                                        </span>
                                    </Link>
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
