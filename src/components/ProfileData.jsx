import React from "react";

import { Card } from "@nextui-org/react";

/**
 * Renders information about the user obtained from Microsoft Graph
 */
export const ProfileData = (props) => {
  return (
    <div id="profile-div">
      <div>
        <Card
          maxW={"320px"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <h1 fontSize={"2xl"} fontFamily={"body"}>
            {props.graphData.givenName} {props.graphData.surname}
          </h1>
          <p fontWeight={600} color={"gray.500"}>
            {props.graphData.mail}
          </p>
          <p fontWeight={600} color={"gray.500"} mb={4}>
            {props.graphData.mobilePhone}
          </p>
          <p textAlign={"center"} px={3}>
            {props.graphData.jobTitle}
          </p>
          <p textAlign={"center"} px={3}>
            {props.graphData.officeLocation}
          </p>
        </Card>
      </div>
    </div>
  );
};
