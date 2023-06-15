export default function IndexPage() {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    Hacker News Clone with Next.js 13
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                    This is a Hacker News clone built with Next.js 13, Tailwind
                    CSS, and TypeScript. It uses the Hacker News API to fetch
                    the latest stories, and it uses SWR to cache the results.
                </p>
            </div>
        </section>
    )
}
