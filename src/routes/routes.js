import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import AddProject from "../pages/Project/add";
import UserList from "../pages/Project/[projectId]/members";
import ProjectOverview from '../pages/Project/[projectId]';
import ProgressList from "../pages/Project/[projectId]/progress";
import ResourceList from "../pages/Project/[projectId]/Resource";
import WorkPermitList from "../pages/Project/[projectId]/WorkPermit";
import ProgressDetails from "../pages/Progress/ProgressDetails";

// import AddUser from './pages/User/add';
// import AddMember from './pages/members/addMember';
// import MembersList from './pages/members/membersList';
// import NormalUserDashBoard from './pages/normalUserDashBoard';
// import AddProgess from './pages/progress/AddProgess';
// import ViewProgress from './pages/progress/AddProgess copy';
// import ProgessList from './pages/progress/ProgessList';
// import TaskList from './pages/task/TaskList';
// import AddTask from './pages/task/addTask';

export const routes = [
  { path: '/login', component: Login, protected: false, layout: false },

  { path: '/', component: Dashboard, protected: true, layout: true },
  { path: '/project/add', component: AddProject, protected: true, layout: true },
  { path: '/project/:projectId', component: ProjectOverview, protected: true, layout: true },
  { path: '/project/:projectId/members', component: UserList, protected: true, layout: true },
  { path: '/project/:projectId/progress', component: ProgressList, protected: true, layout: true },
  { path: '/project/:projectId/resource', component: ResourceList, protected: true, layout: true },
  { path: '/project/:projectId/workpermit', component: WorkPermitList, protected: true, layout: true },

  { path: '/project/:projectId/progress/:progressId', component: ProgressDetails, protected: true, layout: true },

  { path: '*', component: NotFound, protected: false, layout: false },
];
