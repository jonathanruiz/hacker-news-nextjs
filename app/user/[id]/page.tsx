import Link from "next/link"

import { getItem, getUser } from "@/lib/hackerNews"
import { displayRelativeTime } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"

const UserPage = async ({ params }: any) => {
    const user = await getUser(params.id)
    user.submitted.length = 100 // prevent too long of a list

    const [submissions, comments] = await Promise.all([
        // Get the user's submissions and add them to a Card
        Promise.all(
            user.submitted.map(async (id: any) => {
                const story = await getItem(id)

                if (story.deleted == true) return null
                else if (story.type === "story") {
                    return (
                        <Card key={story.id} className="my-4 flex items-center">
                            <CardHeader>
                                <CardTitle className="grid justify-items-center">
                                    <Icons.chevronUp />
                                    <span>{story.score}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl">
                                    <a href={story.url}>
                                        <h2 className="m-0 inline-block text-lg font-bold sm:text-lg md:text-xl">
                                            {story.title}
                                        </h2>
                                    </a>
                                </div>
                                <div className="flex">
                                    <span>
                                        {displayRelativeTime(story.time)}
                                    </span>
                                    <Link
                                        className="ml-5 flex items-center"
                                        href={`/discussion/${story.id}`}
                                    >
                                        <Icons.messageSquare />
                                        <span className="ml-2 text-slate-900 dark:text-slate-400 ">
                                            {story.descendants}
                                        </span>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }
            })
        ),
        // Get the user's comments
        Promise.all(
            user.submitted.map(async (id: any) => {
                const comment = await getItem(id)

                if (comment.deleted == true) return null
                else if (comment.type === "comment") {
                    return (
                        <Card key={comment.id} className="my-4">
                            <CardHeader>
                                <CardDescription className="flex gap-4">
                                    <div>
                                        {displayRelativeTime(comment.time)}
                                    </div>
                                    <div>({comment.id})</div>
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex space-x-4 text-sm">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: `${comment.text}`,
                                    }}
                                />
                            </CardFooter>
                        </Card>
                    )
                }
            })
        ),
    ])

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
                    {submissions.length === 0 ? "No submissions" : submissions}
                </TabsContent>
                <TabsContent value="comments">
                    {comments.length === 0 ? "No comments" : comments}
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default UserPage
