import handler from "./libs/handler-lib";
import dynamoDB from "./libs/dynamodb-lib";

export const main = handler(async (event, ctx) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
    UpdateExpression: "SET content = :content ,attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDB.update(params);
  return { status: true };
});
