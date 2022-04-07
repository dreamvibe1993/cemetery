export const ORIGIN = process.env.NODE_ENV === 'development' ? "http://192.168.0.103:8888" : window.location.origin;

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
