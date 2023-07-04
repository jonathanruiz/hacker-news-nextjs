import { ItemSkeleton } from "@/components/story-item"

const Loading = () => {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col gap-2">
                <h1 className="font-extrabold leading-tight tracking-tighter sm:text-xl md:text-2xl lg:text-3xl">
                    Hacker News Clone with Next.js 13
                </h1>
                <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
                    {Array.from(Array(10).keys()).map((_, index) => (
                        <ItemSkeleton key={index} />
                    ))}
                </section>
            </div>
        </section>
    )
}

export default Loading
