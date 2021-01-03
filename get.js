import handler from "./libs/handler-lib";
import dynamoDB from "./libs/dynamodb-lib";

export const main = handler(async (event, ctx) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: "123",
      noteId: event.pathParameters.id,
    },
  };

  const result = await dynamoDB.get(params);
  if (!result.Item) {
    throw new Error("Item not found");
  }

  return result.Item;
});
