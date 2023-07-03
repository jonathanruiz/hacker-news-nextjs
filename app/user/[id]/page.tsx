import { getItem, getUser } from "@/lib/hackerNews"
import { convertUnixToDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"

const UserPage = async ({ params }: any) => {
    const user = await getUser(params.id).then((data) => data)

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle className="text-2xl">{user.id}</CardTitle>
                    <CardDescription>
                        {user.about ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${user.about}`,
                                }}
                            />
                        ) : null}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex">
                        <Icons.chevronUp />
                        <Badge>{user.karma}</Badge>
                    </div>
                    <span>Created {convertUnixToDate(user.created)}</span>
                </CardFooter>
            </Card>
            <Tabs defaultValue="submissions" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="submissions">
                    {user.submitted.map((submission: any) =>
                        getItem(submission).then((data) =>
                            data.type === "story" ? (
                                <div>{data.title}</div>
                            ) : null
                        )
                    )}
                </TabsContent>
                <TabsContent value="comments">
                    {user.submitted.map((submission: any) =>
                        getItem(submission).then((data) =>
                            data.type === "comment" ? (
                                <div>{data.text}</div>
                            ) : null
                        )
                    )}
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default UserPage
