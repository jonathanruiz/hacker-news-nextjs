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
                <h1 className="font-extrabold leading-tight tracking-tighter sm:text-xl md:text-2xl lg:text-3xl">
                    Hacker News Clone with Next.js 13
                </h1>
                {stories.map((story: any) => (
                    <div key={story} className="w-full">
                        {getItem(story).then((data) => (
                            <div>
                                <div className="flex items-center">
                                    <span className="mr-2 text-slate-400">
                                        {stories.indexOf(story) + 1}.
                                    </span>
                                    <span className="mr-2 flex">
                                        <Icons.chevronUp />
                                        <Badge>{data.score}</Badge>
                                    </span>
                                    <div>
                                        <a href={data.url}>
                                            <h2 className="m-0 inline-block text-lg font-bold sm:text-lg md:text-xl">
                                                {data.title}
                                            </h2>
                                            <span className="ml-2 inline-block text-slate-400">
                                                ({getUrlHostname(data.url)})
                                            </span>
                                        </a>
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
                                    <span className="ml-2">
                                        by{" "}
                                        <Link href={`/user/${data.by}`}>
                                            <Badge>{data.by}</Badge>
                                        </Link>
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
