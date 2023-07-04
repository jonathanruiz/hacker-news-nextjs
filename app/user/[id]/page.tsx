import Link from "next/link"

import { getItem, getUser } from "@/lib/hackerNews"
import { displayRelativeTime } from "@/lib/utils"
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
                    <span>Created {displayRelativeTime(user.created)}</span>
                </CardFooter>
            </Card>
            <Tabs defaultValue="submissions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="submissions">
                    {user.submitted.map((submission: any) =>
                        getItem(submission).then((data) =>
                            data.type === "story" ? (
                                <Card className="my-4">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            <a href={data.url}>{data.title}</a>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardFooter className="flex space-x-4 text-sm text-muted-foreground">
                                        <div className="flex">
                                            <Icons.chevronUp />
                                            <Badge>{data.score}</Badge>
                                        </div>
                                        <span>
                                            {displayRelativeTime(data.time)}
                                        </span>
                                        <Link
                                            className="ml-5 flex items-center"
                                            href={`/discussion/${data.id}`}
                                        >
                                            <Icons.messageSquare />
                                            <span className="ml-2 text-slate-900 dark:text-slate-400 ">
                                                {data.descendants}
                                            </span>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ) : null
                        )
                    )}
                </TabsContent>
                <TabsContent value="comments">
                    {user.submitted.map((submission: any) =>
                        getItem(submission).then((data) =>
                            data.type === "comment" ? (
                                <Card className="my-4">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            {data.by}
                                        </CardTitle>
                                        <CardDescription>
                                            {displayRelativeTime(data.time)}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex space-x-4 text-sm text-muted-foreground">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: `${data.text}`,
                                            }}
                                        />
                                    </CardFooter>
                                </Card>
                            ) : null
                        )
                    )}
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default UserPage
