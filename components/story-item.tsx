import Link from "next/link"

import { getItem } from "@/lib/hackerNews"
import { displayRelativeTime, getUrlHostname } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export const StoryItem = ({ story, stories }: any) => {
    return (
        <div key={story} className="w-full">
            {getItem(story).then((data) => (
                <Card className="flex">
                    <CardHeader>
                        <CardTitle className="grid justify-items-center">
                            <Icons.chevronUp />
                            <span>{data.score}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {data.url ? (
                                <a href={data.url}>
                                    {/* Display ranking number of story */}
                                    <span className="text-slate-900 dark:text-slate-400">
                                        {stories.indexOf(story) + 1}.
                                    </span>
                                    <span className="ml-5 inline-block text-slate-400">
                                        {getUrlHostname(data.url)}
                                    </span>
                                </a>
                            ) : null}
                        </div>
                        <div className="text-2xl">
                            <a href={data.url}>
                                <h2 className="m-0 inline-block text-lg font-bold sm:text-lg md:text-xl">
                                    {data.title}
                                </h2>
                            </a>
                        </div>
                        <div className="flex">
                            <span>
                                by{" "}
                                <Link href={`/user/${data.by}`}>
                                    <Badge>{data.by}</Badge>
                                </Link>
                            </span>
                            <span className="ml-5">
                                {displayRelativeTime(data.time)}
                            </span>
                            <Link
                                className="ml-5 flex items-center"
                                href={`/discussion/${data.id}`}
                            >
                                <Icons.messageSquare />
                                <span className="ml-2 text-slate-900 dark:text-slate-400 ">
                                    {data.descendants}
                                </span>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
