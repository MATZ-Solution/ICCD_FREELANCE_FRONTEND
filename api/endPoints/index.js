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
    getAllJob: "/job/getAllJob",
    getJobById: "/job/getJobById",
    addJob: "/job/addJob",
    getJobsByClient: '/job/getJobsByClient',
    editJob: '/job/editJob/',
  },
  gigs: {
    getGigs: "/gigs/getGigs",
    getGigsById: "/gigs/getGigsById",
    addGigs: "/gigs/addGigs",
    getSingleGigs: "/gigs/getSingleGigs",
    getGigsByUserId: "/gigs/getGigsByUser",
    editGigs: "/gigs/editGigs"
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
