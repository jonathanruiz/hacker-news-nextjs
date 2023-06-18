import { getStory } from "@/utils/hackernews"

const DiscussionPage = async ({ params }: any) => {
    const story = await getStory(params.id).then((data) => data)

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <p>{story.title}</p>
            </div>
        </section>
    )
}

export default DiscussionPage
