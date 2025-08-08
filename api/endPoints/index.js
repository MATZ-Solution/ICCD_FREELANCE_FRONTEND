const API_ROUTE = {
  user: {
    login: "signIn",
    signUp: "signUp",
    sendOtp: "sendOtp",
    submitOtp: "submitOtp",
    checkapi: "checkapi",
    changePasword: "changePasword"
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
    applyjob: "/job/applyJob",
    getJobPropsalByClient: "/job/getJobPropsalByClient"
  },
  gigs: {
    getGigs: "/gigs/getGigs",
    getGigsById: "/gigs/getGigsById",
    addGigs: "/gigs/addGigs",
    getSingleGigs: "/gigs/getSingleGigs",
    getGigsByUserId: "/gigs/getGigsByUser",
    getGigsPackages: "/gigs/getPackages",
    editGigs: "/gigs/editGigs",
    getGigsFiles: '/gigs/getGigsFiles',
    editGigsFiles: '/gigs/editGigsFiles'
  },
  freelancer: {
    checkIsFreelancer: '/freelancer/checkIsFreelancer',
    getFreelancerProfile: '/freelancer/getFreelancerProfile',
    addProfile: '/freelancer/addProfile',
    editProfile: '/freelancer/editProfile',
    getFreelancerDashboardData : '/freelancer/getFreelancerDashboardData'
  },
  client : {
    getClientDashboardData: '/client/getClientDashboardData',
    clientEditProfile: '/client/clientEditProfile'
  },
  order: {
    getAllOrderByFreelancer: '/order/getAllOrderByFreelancer',
    getSingleOrderByFreelancer: '/order/getSingleOrderByFreelancer',
    getAllOrderByClient: '/order/getAllOrderByClient'
  },
  stripeorder: {
  getOrderByFreelancer: '/stripe/getAllOrderByFreelancer',   
  getOrderAllOrder: '/stripe/getAllOrder',
  getSingleOrderByFreelancer: '/stripe/getSingleOrderByFreelancer',

  },
  messages: {
    addMessageByUser: '/messages/addMessageByUser',
    getAllMessageByUser: '/messages/getAllMessageByUser',
    getMessageByUserWithRecipitant: '/messages/getMessageByUserWithRecipitant',
  },
  notifications: {
    getNofication: '/notifications/getNotification',
    unread_count: '/notifications/unread-count',
    mark_read: '/notifications/mark-read'
  }
};

export default API_ROUTE;
