import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const convertUnixToDate = (unix: number) => {
    let date = new Date(unix * 1000)
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

export const displayRelativeTime = (timestamp: number): string => {
    const currentTime = Math.floor(Date.now() / 1000) // Convert current time to seconds
    const timeDifference = currentTime - timestamp

    if (timeDifference < 60) {
        return `${timeDifference} seconds ago`
    } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60)
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
    } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600)
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
    } else {
        const days = Math.floor(timeDifference / 86400)
        return `${days} ${days === 1 ? "day" : "days"} ago`
    }
}
