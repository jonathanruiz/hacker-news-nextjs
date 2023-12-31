import { getStories } from "@/lib/hackerNews"
import { StoryItem } from "@/components/story-item"

const IndexPage = async () => {
    const stories = await getStories()
    stories.length = 20 // limit stories to 20

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col gap-2">
                <h1 className="font-extrabold leading-tight tracking-tighter sm:text-xl md:text-2xl lg:text-3xl">
                    Hacker News Clone with Next.js 13
                </h1>
                <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
                    {stories.map((story: any) => (
                        <StoryItem
                            key={story.id}
                            story={story}
                            stories={stories}
                        />
                    ))}
                </section>
            </div>
        </section>
    )
}

export default IndexPage
