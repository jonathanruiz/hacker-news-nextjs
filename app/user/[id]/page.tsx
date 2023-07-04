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

    // Get user's submissions and comments. Check if they are stories or comments.
    // If they are stories, display them in a card with the title, score, and link to the discussion.
    // If they are comments, display them in a card with the comment text and link to the discussion.
    // If they are neither, don't display them.
    const submitted = await Promise.all(
        user.submitted.map((submission: any) => getItem(submission))
    )

    const submissions = submitted.filter(
        (submission: any) => submission.type === "story"
    )

    const comments = submitted.filter(
        (comment: any) => comment.type === "comment"
    )

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
                    {submissions
                        ? submissions.map((story: any) => (
                              <Card
                                  key={story.id}
                                  className="my-4 flex items-center"
                              >
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
                          ))
                        : "No submissions yet."}
                </TabsContent>
                <TabsContent value="comments">
                    {comments
                        ? comments.map((comment: any) => (
                              <Card key={comment.id} className="my-4">
                                  <CardHeader>
                                      <CardDescription className="flex gap-4">
                                          <div>
                                              {displayRelativeTime(
                                                  comment.time
                                              )}
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
                          ))
                        : "No comments yet."}
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default UserPage
