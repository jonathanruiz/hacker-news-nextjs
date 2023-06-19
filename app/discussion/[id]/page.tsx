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
                        <p className="text-lg font-bold leading-tight tracking-tighter md:text-xl">
                            {story.title}
                        </p>
                    </a>
                    <Link href="#" className="ml-2">
                        <span>
                            by <Badge>{story.by}</Badge>
                        </span>
                    </Link>
                </div>
                <div>
                    <Link href={`/discussion/${story.id}`}>
                        <span className="text-slate-900 dark:text-slate-400">
                            {story.descendants} comments
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default DiscussionPage
