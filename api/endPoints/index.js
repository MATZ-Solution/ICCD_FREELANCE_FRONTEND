const API_ROUTE = {
    user: {
        login: 'signIn',
        signUp: 'signUp',
        sendOtp: 'sendOtp',
        submitOtp: 'submitOtp',
        checkapi: 'checkapi'
    },
    project: {
        getProject: '/project/getProject',
        getProjectById: '/project/getProjectById',
        addProject: '/project/addProject'
    },
    job: {
        getJob: '/job/getJob',
        getJobById: '/job/getJobById',
        addJob: '/job/addJob'
    }

}

export default API_ROUTE