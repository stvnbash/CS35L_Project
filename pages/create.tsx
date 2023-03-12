// @ts-nocheck

import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import ClubPage from 'components/ClubPage';
import ClubJoin from 'components/ClubJoin';
import CreateClub from "@/components/CreateClub";

export default function Page({}) {
    return (
        <CreateClub />
    )

}
