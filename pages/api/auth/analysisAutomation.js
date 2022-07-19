// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import endpointHandler from "../../../utils/endPointHandler";
import isAuthenticatedMiddleware from "../../../utils/isAuthenticatedMiddleware";
import React, { useState } from "react";

async function GET(req, res) {
  //let user = req.user;

  let rss_url = "https://blog.tiomarkets.com/feed/";
  let api_endpoint = "https://api.rss2json.com/v1/api.json?rss_url=";

  let url = `https://api.hubapi.com/contacts/v1/lists/${process.env.HUBSPOT_DMC_LIST_ID}/contacts/all?property=email&count=100&hapikey=${process.env.HUBSPOT_API_KEY}`;
  let url_uk = `https://api.hubapi.com/contacts/v1/lists/${process.env.HUBSPOT_DMC_LIST_ID}/contacts/all?property=email&count=100&hapikey=${process.env.HUBSPOT_API_KEY}`;

  let contactsList = [];
  let offset = "";
  let hasMore = true;

  // while (hasMore) {
  //   let result = await getContacts("", url, offset, contactsList);
  //   contactsList.push(...result.emaiList);
  //   hasMore = result.hasMore;
  //   offset = result.offset;
  //   console.log("has more contacts");
  // }

  //let resultAsync = await getContactsAsync("", url);

  console.log("after the hell");

  //get Posts
  try {
    const response = await axios.get(
      api_endpoint + rss_url + `&api_key=${process.env.RSS2JSON_API_KEY}`
    );

    if (response["status"] === 200) {
      const todaysDate = new Date();
      let exampleDate = new Date("2022-07-12 08:32:40");

      const posts = response.data["items"];

      //get only posts with analysis category and todays date
      let todaysAnalysisPosts = posts
        .filter(
          (post) =>
            new Date(post.pubDate).toLocaleDateString() ===
              exampleDate.toLocaleDateString() && //TODO replace exampleDate to todays date
            post.categories[0] === "Analysis"
        )
        .map((post) => ({
          id: post.guid.split("?p=")[1],
          title: post.title,
          pubDate: post.pubDate,
          link: post.link,
          author: post.author,
          thumbnail: post.thumbnail,
          description: post.description,
          content: post.content,
          category: post.categories,
        }));

      console.log(todaysAnalysisPosts);

      res.status(200).json(todaysAnalysisPosts);
      return;
    }
    res.status(400).json("bad request");
  } catch (error) {
    console.log("error from articles endpoint", error);
    res.status(404).json("something went wrong");
  }
}
//#################### sychronous approach ##################
const getContacts = async (method = "get", url, offset) => {
  if (offset) {
    let offsetParam = `&vidOffset=${offset}`;
    url = url.concat(offsetParam);
  }

  try {
    const resp = await axios.get(url);
    const contactsArray = resp.data.contacts.map(
      (contact) =>
        contact["identity-profiles"][0].identities.filter(
          (con) => con.type === "EMAIL"
        )[0].value
    );
    let hasMore = resp.data["has-more"];
    let vidOffset = resp.data["vid-offset"];

    return { emaiList: contactsArray, hasMore: hasMore, offset: vidOffset };
  } catch (error) {
    console.log("error from get Contacts", error);
  }
};

//#################### async approach ##################
const getContactsAsync = (method = "get", url, emailList = []) => {
  return axios
    .get(url)
    .then(function (res) {
      // handle success
      const contactsArray = res.data.contacts.map(
        (contact) =>
          contact["identity-profiles"][0].identities.filter(
            (con) => con.type === "EMAIL"
          )[0].value
      );

      let hasMore = res.data["has-more"];
      let vidOffset = res.data["vid-offset"];
      emailList.push(...contactsArray);

      if (hasMore) {
        url = url.split("&vidOffset=")[0]; //remove &vidOffset from url
        let offsetParam = `&vidOffset=${vidOffset}`;
        url = url.concat(offsetParam);
        console.log("this is the new url", url);
        getContactsAsync("", url, emailList);
        console.log("hasMore");
        return;
      }

      return { emaiList: emailList };
    })
    .catch(function (error) {
      // handle error
      console.log("error from get Contacts Async", error);
    });
};

export default endpointHandler(isAuthenticatedMiddleware, { GET });
