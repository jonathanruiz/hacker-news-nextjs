import Link from "next/link"

import { getItem } from "@/lib/hackerNews"
import { displayRelativeTime, getUrlHostname } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

const StoryItem = ({ story, stories }: any) => {
    return (
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
                            {
                                // Check if there is a url. If so, make it a link. If not,
                                // just display the title with a link to the discussion.
                                data.url ? (
                                    <a href={data.url}>
                                        <h2 className="m-0 inline-block text-lg font-bold sm:text-lg md:text-xl">
                                            {data.title}
                                        </h2>
                                        <span className="ml-2 inline-block text-slate-400">
                                            ({getUrlHostname(data.url)})
                                        </span>
                                    </a>
                                ) : (
                                    <Link href={`/discussion/${data.id}`}>
                                        <h2 className="m-0 inline-block text-lg font-bold sm:text-lg md:text-xl">
                                            {data.title}
                                        </h2>
                                    </Link>
                                )
                            }
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
    )
}

export default StoryItem
