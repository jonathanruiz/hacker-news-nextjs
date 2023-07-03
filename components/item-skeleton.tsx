import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const ItemSkeleton = () => {
    return (
        <div className="w-full">
            <Card className="flex">
                <CardHeader>
                    <CardTitle className="grid justify-items-center">
                        <Skeleton className="h-12 w-12" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="my-2 h-4 w-20" />
                    <Skeleton className="my-2 h-4 w-40" />
                    <Skeleton className="my-2 h-4 w-64" />
                </CardContent>
            </Card>
        </div>
    )
}
