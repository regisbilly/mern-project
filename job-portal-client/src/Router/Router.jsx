import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJobs from "../Pages/UpdateJobs";
import JobDetails from "../Pages/JobDetails";
import Login from "../Pages/Login";  // ✅ Fixed Import
import SignUp from "../Pages/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/post-job", element: <CreateJob /> },
            { path: "/my-job", element: <MyJobs /> },
            { path: "/salary", element: <SalaryPage /> },
            { 
                path: "/editjob/:id", 
                element: <UpdateJobs />,
                loader: ({ params }) => fetch(`/api/job/${params.id}`) // Provide a real API endpoint
            },
            { path: "/job/:id", element: <JobDetails /> },
        ]
    },
    { path: "/login", element: <Login /> },
    { path: "/sign-up", element: <SignUp /> },
]);

export default router;
