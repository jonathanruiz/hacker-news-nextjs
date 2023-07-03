import Link from "next/link"

import { getItem } from "@/lib/hackerNews"
import { displayRelativeTime, getUrlHostname } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

// Depth was added as a parameter to displayAllComments to keep track of the depth of the comment.
// It is currently not doing something important, but I left it available in case you want to use it.
const displayAllComments = (kids: any[], depth: number = 0) => {
    return kids.map((kid: any) => (
        <div key={kid} className={`ml-5`}>
            {getItem(kid).then((data) => (
                <div>
                    <div className="flex items-center">
                        <div>
                            <Link href={`/user/${data.by}`}>
                                <Badge>{data.by}</Badge>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: `${data.text}`,
                            }}
                        />
                    </div>
                    {data.kids && displayAllComments(data.kids, depth + 1)}
                </div>
            ))}
        </div>
    ))
}

const DiscussionPage = async ({ params }: any) => {
    const item = await getItem(params.id).then((data) => data)

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col gap-2">
                <Card className="flex">
                    <CardHeader>
                        <CardTitle className="grid justify-items-center">
                            <Icons.chevronUp />
                            <span>{item.score}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {item.url ? (
                                <a href={item.url}>
                                    <span className="inline-block text-slate-400">
                                        {getUrlHostname(item.url)}
                                    </span>
                                </a>
                            ) : null}
                        </div>
                        <div className="text-2xl">
                            <a href={item.url}>
                                <h2 className="m-0 inline-block text-lg font-bold sm:text-lg md:text-xl">
                                    {item.title}
                                </h2>
                            </a>
                        </div>
                        <div className="flex">
                            <span>
                                by{" "}
                                <Link href={`/user/${item.by}`}>
                                    <Badge>{item.by}</Badge>
                                </Link>
                            </span>
                            <span className="ml-5">
                                {displayRelativeTime(item.time)}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <div>
                    <h3 className="text-xl">Comments ({item.descendants})</h3>
                    {displayAllComments(item.kids)}
                </div>
            </div>
        </section>
    )
}

export default DiscussionPage
