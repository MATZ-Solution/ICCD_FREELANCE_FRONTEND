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
    getProjectByClient: "/project/getProjectByClient",
    addProject: "/project/addProject",
    getProjectById: "/project/getProjectById",
    submitProposals:"/project/submitProposals",
    getProjectPropsalByClient: '/project/getProjectPropsalByClient'
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
  client : {
    getClientDashboardData: '/client/getClientDashboardData',
    clientEditProfile: '/client/clientEditProfile'
  },
  order: {
    getOrderByFreelancer: '/order/getAllOrderByFreelancer',
    getAllOrderByClient: '/order/getAllOrderByClient'
  }
};

export default API_ROUTE;
