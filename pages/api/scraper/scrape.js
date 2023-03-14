const puppeteer = require("puppeteer");

import { db } from "../../../lib/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  limit
} from "firebase/firestore";

/* relevant metatag information
 *
 * ./studentorgs/
 * ul[class=buttons] > li > a: contains li > a href for club types
 *
 * ./studentorgs/CLUBTYPE/
 * a[class=card]: contains href for individual clubs
 *
 * ./sutdentorgs/CLUBTYPE/CLUB
 * main: contains club information
 * h1: contains title
 * p[class=org-description]: contains club description
 */
const homeURL = "https://community.ucla.edu/studentorgs/";

// returns an array of all club types (urls)
async function getClubTypes(page) {
  // array of club types
  return await page.evaluate(() => {
    // query select by ul[class=buttons]
    const clubTypes = document.querySelectorAll("ul[class=buttons] > li > a");

    return Array.from(clubTypes).map((id) => {
      return id.href;
    });
  });
}

// returns a list of club urls for a specified club type (url)
async function getClubURL(page) {
  // array of club url
  return await page.evaluate(() => {
    // evaluate page by a[class=card]
    const clubURLs = document.querySelectorAll("a[class=card]");

    return Array.from(clubURLs).map((id) => {
      return id.href;
    });
  });
}

// returns info for a specified club (object { name, description })
async function getClubInfo(page) {
  // information about the club in the form { name, description }
  return await page.evaluate(() => {
    // evaluate page by main
    const club = document.querySelector("main");
    // club name
    const name = club.querySelector("h1").innerText;
    //club description
    const description = club.querySelector("p[class=org-description").innerText;

    return { name, description };
  });
}

export async function scrape() {
  // all clubs
  const clubs = [];
  // array of all club urls of all club types
  const allClubURLs = [];

  const browser = await puppeteer.launch({ headless: true });
  const page = await (await browser).newPage();
  await page.goto(homeURL);

  // array of club types
  const clubTypes = getClubTypes(page);

  // gets all club urls for each club type * expensive *
  for (let i = 0; i < clubTypes.length; i++) {
    await page.goto(clubTypes[i])
    // extend list using unpacking operator
    allClubURLs.push(...getClubURL(page));
  }

  // get all club information
  for (let i = 0; i < allClubURLs.length; i++) {
    await page.goto(allClubURLs[i]);
    // populate clubs array with club information
    clubs.push(getClubInfo(page));
  }

  (await browser).close();

  writeToDB(clubs);

  return true;
}

async function writeToDB(clubs) {
  for (let i = 0; i < 5; i++) {
    addClubToDB(clubs[i]);
  }
}

async function addClubToDB(club) {
  const clubQuery = query(collection(db, "clubs"), where("name", "==", `${club.name}`), limit(1));
  const allClubs = clubQuery.doc ? clubQuery.doc.data() : undefined;

    if (!allClubs) {
      addDoc(
        collection(db, "clubs"),
        {
          name: club.name,
          description: club.description,
          instagram: "",
          website: "",
          moderators: ["wjkim2311@g.ucla.edu", "talhabadin@g.ucla.edu", "stevenbash@g.ucla.edu"],
        },
        { merge: true }
      );
      console.log("added club %s to database", club.name);
    } else {
      console.log("club: %s already exists!", club.name);
    }
}
