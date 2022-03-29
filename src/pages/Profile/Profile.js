import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { getUser } from "../../api/user";
import { Preloader } from "../../components/App/Preloader";
import { showError } from "../../services/errors/showError";
import { EditableProfile } from "./Editable";
import { NonEditableProfile } from "./NonEditable";

export const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [isEditable, setEditable] = React.useState(null);
  const [userToShow, setUserToShow] = React.useState(null);
  const [redirect, setRedirect] = React.useState(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (user?.id === id) {
      setEditable(true);
      return;
    }
    if (id) {
      getUser(id)
        .then((res) => {
          setUserToShow(res.data.user);
          setEditable(false);
        })
        .catch((e) => {
          showError(e.response.data);
          setRedirect("/");
        });
    } else {
      setEditable(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirect) return <Navigate to={redirect} />;
  if (isEditable === null) return <Preloader />;
  if (isEditable === true) return <EditableProfile />;
  if (isEditable === false) return <NonEditableProfile user={userToShow} />;
};
