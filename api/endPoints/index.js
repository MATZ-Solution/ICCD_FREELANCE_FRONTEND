const API_ROUTE = {
  user: {
    login: "signIn",
    signUp: "signUp",
    sendOtp: "sendOtp",
    submitOtp: "submitOtp",
    checkapi: "checkapi",
  },
  project: {
    getAllProject: "/project/getAllProject",
    getProjectByUser: "/project/getProjectByUser",
    addProject: "/project/addProject",
    getProjectById: "/project/getProjectById",
    submitProposals:"/project/submitProposals"
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
    getSingleGigs: "/gigs/getSingleGigs",
    getGigsByUserId: "/gigs/getGigsByUser"
  },
  freelancer: {
    checkIsFreelancer: '/freelancer/checkIsFreelancer',
    getFreelancerProfile: '/freelancer/getFreelancerProfile',
    addProfile: '/freelancer/addProfile',
    editProfile: '/freelancer/editProfile'
  },
  order: {
    getOrderByFreelancer: '/order/getAllOrderByFreelancer',
    getAllOrderByClient: '/order/getAllOrderByClient'
  }
};

export default API_ROUTE;
