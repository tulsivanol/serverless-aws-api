import * as uuid from "uuid";
import hanlder from "./libs/handler-lib";
import dynamoDB from "./libs/dynamodb-lib";

export const main = hanlder(async (event, ctx) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      userId: "123",
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  await dynamoDB.put(params);
  return params.Item;
});
