export const ORIGIN = process.env.REACT_APP_ENVIRONMENT === 'develop' ? "http://localhost:8888" : "";

export const routes = {
  root: "/",
  tomb: {
    origin: "/tomb",
  },
  auth: {
    origin: "/auth",
  },
  profile: {
    origin: "/profile"
  },
  myProfile: {
    origin: "/my-profile"
  },
  passwordChange: {
    origin: "/passwordChange"
  },
  about: {
    origin: "/about"
  }
};
