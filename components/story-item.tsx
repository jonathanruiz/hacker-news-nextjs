import Link from "next/link"

import { getItem } from "@/lib/hackerNews"
import { displayRelativeTime, getUrlHostname } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

import { Separator } from "./ui/separator"

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
                        <div className="text-2xl">
                            <a href={data.url}>
                                <h2 className="m-0 inline-block text-lg font-bold sm:text-lg md:text-xl">
                                    {data.title}
                                </h2>
                            </a>
                        </div>
                        <div>
                            <span>
                                by{" "}
                                <Link href={`/user/${data.by}`}>
                                    <Badge>{data.by}</Badge>
                                </Link>
                            </span>
                            <span className="ml-5">
                                {displayRelativeTime(data.time)}
                            </span>
                            {data.url ? (
                                <a href={data.url}>
                                    <span className="ml-5 inline-block text-slate-400">
                                        ({getUrlHostname(data.url)})
                                    </span>
                                </a>
                            ) : null}
                            <Link
                                className="ml-5"
                                href={`/discussion/${data.id}`}
                            >
                                <span className="text-slate-900 dark:text-slate-400">
                                    {data.descendants} comments
                                </span>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
