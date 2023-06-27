import Link from "next/link"

import { getItem, getStories } from "@/lib/hackerNews"
import { displayRelativeTime, getUrlHostname } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

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
                        {getItem(story).then((data) => (
                            <div>
                                <div className="flex items-center">
                                    <span className="mr-2 text-slate-400">
                                        {stories.indexOf(story) + 1}.
                                    </span>
                                    <div className="mr-2 flex">
                                        <Icons.chevronUp />
                                        <Badge>{data.score}</Badge>
                                    </div>
                                    <a href={data.url}>
                                        <h2 className="text-lg font-bold leading-tight tracking-tighter md:text-xl">
                                            {data.title}
                                        </h2>
                                    </a>
                                    <span className="ml-2 text-slate-400">
                                        ({getUrlHostname(data.url)})
                                    </span>
                                    <div className="ml-2">
                                        <span>by </span>
                                        <Link href={`/user/${data.by}`}>
                                            <Badge>{data.by}</Badge>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <Link href={`/discussion/${data.id}`}>
                                        <span className="text-slate-900 dark:text-slate-400">
                                            {data.descendants} comments
                                        </span>
                                    </Link>
                                    <span className="ml-5">
                                        {displayRelativeTime(data.time)}
                                    </span>
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
