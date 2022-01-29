import axios from "axios";
import { database } from "../App";
import { ref, onValue } from "firebase/database";

// const analytics = getAnalytics(app);

export const loadUsers = () => {
  const starCountRef = ref(database, "users");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
  });
};
