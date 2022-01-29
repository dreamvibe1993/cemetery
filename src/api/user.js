import { database } from "../App";
import { ref, onValue } from "firebase/database";
import store from "../redux/store";
import { setUsers } from "../redux/user/userReducer";

// const analytics = getAnalytics(app);

export const loadUsers = () => {
  const starCountRef = ref(database, "users");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    store.dispatch(setUsers(data));
  });
};
