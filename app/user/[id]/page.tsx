import { getUser } from "@/utils/hackerNews"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const UserPage = async ({ params }: any) => {
    const user = await getUser(params.id).then((data) => data)

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{user.id}</CardTitle>
                    <CardDescription>{user.about}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Badge>{user.karma}</Badge>
                    <span>Created {user.created}</span>
                </CardFooter>
            </Card>
        </section>
    )
}

export default UserPage
