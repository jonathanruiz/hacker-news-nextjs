import Link from "next/link"
import { getStory } from "@/utils/hackerNews"

import { Badge } from "@/components/ui/badge"

const DiscussionPage = async ({ params }: any) => {
    const story = await getStory(params.id).then((data) => data)

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <div className="flex items-center">
                    <a href={story.url}>
                        <h2 className="text-lg font-bold leading-tight tracking-tighter md:text-xl">
                            {story.title}
                        </h2>
                    </a>
                    <div className="ml-2">
                        <span>by </span>
                        <Link href="#">
                            <Badge>{story.by}</Badge>
                        </Link>
                    </div>
                </div>
                <div>
                    <Link href={`/discussion/${story.id}`}>
                        <span className="text-slate-900 dark:text-slate-400">
                            {story.descendants} comments
                        </span>
                    </Link>
                </div>
            </div>
            <div>
                {story.kids.map((kid: any) => (
                    <div key={kid}>
                        {getStory(kid).then((data) => (
                            <div>
                                <div className="flex items-center">
                                    <div>
                                        <Link href="#">
                                            <Badge>{data.by}</Badge>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: data.text,
                                        }}
                                        className="text-slate-900 dark:text-slate-400"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default DiscussionPage
