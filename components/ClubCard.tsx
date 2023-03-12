export default function Component({name, description}: {name: string, description: string}) {
    return (
        <div className="p-4 rounded-2xl bg-sky-200 overflow-hidden">
            <h3 className="text-lg font-bold">{name}</h3>
            <p>{description}</p>
        </div>
    )
}
