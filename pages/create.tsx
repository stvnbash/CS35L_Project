// @ts-nocheck

import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import ClubPage from 'components/ClubPage';
import ClubJoin from 'components/ClubJoin';
import CreateClub from "@/components/CreateClub";
import { UserContext } from "@/lib/context";
import { useContext } from "react";
import ErrorPage from 'next/error'

export default function Page({ }) {
    const context = useContext(UserContext);
    if (context.email) {

        return (
          <CreateClub />
        )
      } else {
        return (<ErrorPage statusCode={404} />)
      }
}
