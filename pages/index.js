import styled from "styled-components";
import agent from "../utils/agent";
import { getCookies } from "cookies-next";
import parse from "html-react-parser";

const Container = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 1em;
`;

export default function Home({ response }) {
  const regex = /(<([^>]+)>)/gi; //regular expression to remove al html tags
  return <Container>This is the index page</Container>;
}

//add jwt token in the cookie and pass it in the server
export async function getServerSideProps({ req, res }) {
  const cookies = getCookies({ req, res });

  let jwt = cookies.jwt;
  let rfToken = cookies.rfToken;

  //check if the cookies are not defined
  if (!jwt || !rfToken) {
    return {
      redirect: {
        permanent: false,
        destination: `/login`,
      },
    };
  }
  console.log("HEllo?", jwt, rfToken);
  let result = await agent.getUser(jwt, rfToken).catch((err) => {
    return { data: "errors" };
  });
  return {
    props: { response: result.data },
  };
}
