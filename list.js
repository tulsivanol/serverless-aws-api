import handler from "./libs/handler-lib";
import dynamoDB from "./libs/dynamodb-lib";

export const main = handler(async (event, ctx) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    },
  };

  const result = await dynamoDB.query(params);

  return result.Items;
});
