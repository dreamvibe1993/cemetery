export const ORIGIN = process.env.NODE_ENV === 'development' ? "http://localhost:8888" : window.location.origin;

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
  }
};
