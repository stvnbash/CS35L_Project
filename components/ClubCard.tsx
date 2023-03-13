import Link from 'next/link'

export default function Component({ name, description, clubid }: { name: string, description: string, clubid: string }) {
    return (
        <Link href={`/club/${clubid}`} className="p-4 rounded-2xl bg-sky-200 overflow-hidden">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="line-clamp-4">{description}</p>
        </Link>
    )
}
