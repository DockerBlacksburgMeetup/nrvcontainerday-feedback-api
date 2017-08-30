import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("db/db.json");
const db = low(adapter);

db.defaults({ feedback: [] }).write();

const saveFeedback = (userId, feedback) => {
  console.log(`Storing feedback for user ${userId}`);

  const { sessionId, ...rest } = feedback;
  if (db.get("feedback").find({ userId, sessionId }).size().value() === 0) {
    db.get("feedback")
        .push({ userId, ...feedback })
        .write();
  }
  else {
    db.get("feedback")
        .find({ userId, sessionId })
        .assign(rest)
        .write();
  }
};

const getFeedback = () => {
  return db.get("feedback")
      .value();
};

export default {
  saveFeedback,
  getFeedback
};
