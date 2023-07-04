import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Loading = () => {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        <Skeleton className="h-4 w-16" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="w-128 h-4" />
                        <Skeleton className="h-4 w-64" />
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex space-x-4 text-sm text-muted-foreground">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-24" />
                </CardFooter>
            </Card>
            <Tabs defaultValue="submissions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="submissions">
                    {Array.from(Array(10).keys()).map((_, index) => (
                        <Card className="my-4 flex items-center">
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
                    ))}
                </TabsContent>
                <TabsContent value="comments"></TabsContent>
            </Tabs>
        </section>
    )
}

export default Loading
