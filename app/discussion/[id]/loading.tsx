import { Skeleton } from "@/components/ui/skeleton"
import { ItemSkeleton } from "@/components/item-skeleton"

const Loading = () => {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col gap-2">
                <ItemSkeleton />
                <div>
                    <Skeleton className="my-2 h-4 w-20" />
                    {
                        // Get a random width between for the skeleton
                        Array.from(Array(30).keys()).map((_, index) => (
                            <Skeleton
                                key={index}
                                className={`w-${Math.floor(
                                    Math.random() * (20 - 5) + 5
                                )} my-2 h-4`}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Loading
