import handler from "./libs/handler-lib";
import dynamoDB from "./libs/dynamodb-lib";

export const main = handler(async (event, ctx) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  await dynamoDB.delete(params);

  return { status: true };
});
