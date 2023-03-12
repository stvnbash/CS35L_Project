import { UserContext } from "@/lib/context"
import { join } from "path";
import { useContext } from "react";

export default function Component({clubName})
{
    const { name, email, uid, joinedClubs } = useContext(UserContext);

    function handleButtonClick()
    {
        console.log(name);
        console.log(email);
        console.log(uid);
        console.log(joinedClubs);
    }
    return(
        <button onClick={handleButtonClick}>Join</button>
    )
}