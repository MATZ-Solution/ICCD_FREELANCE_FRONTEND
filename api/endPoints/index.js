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
    getProjectPropsalByClient: '/project/getProjectPropsalByClient',
    editProject : '/project/editProject'
  },
  job: {
    getAllJob: "/job/getAllJob",
    getJobById: "/job/getJobById",
    addJob: "/job/addJob",
    getJobsByClient: '/job/getJobsByClient',
    editJob: '/job/editJob',
  },
  gigs: {
    getGigs: "/gigs/getGigs",
    getGigsById: "/gigs/getGigsById",
    addGigs: "/gigs/addGigs",
    getSingleGigs: "/gigs/getSingleGigs",
    getGigsByUserId: "/gigs/getGigsByUser",
    editGigs: "/gigs/editGigs",
    getGigsFiles: '/gigs/getGigsFiles',
    editGigsFiles: '/gigs/editGigsFiles'
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
  },
  messages: {
    addMessageByUser: '/messages/addMessageByUser',
    getAllMessageByUser: '/messages/getAllMessageByUser',
    getMessageByUserWithRecipitant: '/messages/getMessageByUserWithRecipitant',
  },
  notifications: {
    getNofication: '/notifications/getNotification'
  }
};

export default API_ROUTE;
