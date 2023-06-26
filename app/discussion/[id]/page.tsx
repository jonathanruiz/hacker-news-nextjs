import Link from "next/link"

import { getItem } from "@/lib/hackerNews"
import { Badge } from "@/components/ui/badge"
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
                        <span className="text-base md:text-sm">
                            {data.text}
                        </span>
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
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <div className="flex items-center">
                    <div className="mr-2 flex">
                        <Icons.chevronUp />
                        <Badge>{item.score}</Badge>
                    </div>
                    <a href={item.url}>
                        <h2 className="text-2xl font-bold leading-tight tracking-tighter">
                            {item.title}
                        </h2>
                    </a>
                    <div className="ml-2">
                        <span>by </span>
                        <Link href={`/user/${item.by}`}>
                            <Badge>{item.by}</Badge>
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl">Comments ({item.descendants})</h3>
                    {displayAllComments(item.kids)}
                </div>
            </div>
        </section>
    )
}

export default DiscussionPage
