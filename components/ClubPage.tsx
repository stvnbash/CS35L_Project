export default function Component({name, description}: {name: string, description: string}) {
    return (
        <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p>{description}</p>
        </div>
    )
}
