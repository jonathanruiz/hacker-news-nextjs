import { getUser } from "@/utils/hackerNews"

import { Badge } from "@/components/ui/badge"

const UserPage = async ({ params }: any) => {
    const item = await getUser(params.id).then((data) => data)

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold leading-tight tracking-tighter">
                        {item.id}
                    </h2>
                </div>
                <div>
                    <span>Created: {item.created}</span>
                </div>
                <div>
                    <span>Karma: </span>
                    <Badge>{item.karma}</Badge>
                </div>
                <div>
                    <span>{item.about}</span>
                </div>
            </div>
        </section>
    )
}

export default UserPage
