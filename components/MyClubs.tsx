import { auth, firestore } from '../lib/firebase';
import { doc, setDoc, getDoc, collection } from "firebase/firestore"; 
import { async } from '@firebase/util';

// export const firestore = firebase.firestore();
// export const auth = firebase.auth();

export default function Component() {

    // Add a new document "test" in collection "clubs"
    const dbRef = collection(firestore, "clubs");
    const data = {
        name: "Ottawa",
        description: "Canada",
    }
    setDoc(doc(firestore, "clubs", "test"), data)
    .then(() => {
        console.log("Document has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
    // end

    // query from firebase
    const docRef = doc(firestore, "users", "Kpo0MLwJnx9PQgBe3vd0");
    getDoc(docRef)
    .then((docSnap)=>{
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            console.log(docSnap.data().clubs)
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
    })

  
    return (
        <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
            <h2 className="text-2xl">My Clubs</h2>
            {/* some map function to iterate over clubs for logged in user */}
            <div className=" w-full p-4">
                <p>Immerse yourself in UCLA!  Clubs you join will appear here!</p>
            </div>
        </div>
    )
}
