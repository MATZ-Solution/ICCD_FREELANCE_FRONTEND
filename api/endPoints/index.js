const API_ROUTE = {
  user: {
    login: "signIn",
    signUp: "signUp",
    sendOtp: "sendOtp",
    submitOtp: "submitOtp",
    checkapi: "checkapi",
  },
  project: {
    getProject: "/project/getProject",
    getProjectById: "/project/getProjectById",
    addProject: "/project/addProject",
  },
  job: {
    getJob: "/job/getJob",
    getJobById: "/job/getJobById",
    addJob: "/job/addJob",
  },
  gigs: {
    getGigs: "/gigs/getGigs",
    getGigsById: "/gigs/getGigsById",
    addGigs: "/gigs/addGigs",
  },
};

export default API_ROUTE;
