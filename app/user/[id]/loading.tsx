import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <Card className="w-1/2">
                <CardHeader>
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="w-128 h-4" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardFooter className="flex space-x-4 text-sm text-muted-foreground">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-24" />
                </CardFooter>
            </Card>
        </section>
    )
}

export default Loading
