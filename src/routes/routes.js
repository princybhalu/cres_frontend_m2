// import AddDirectProgess from './pages/AddDirectProgess';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import AddProject from "../pages/Project/add";
import UserList from "../pages/Project/[projectId]/members";
// import GetProjectOverview from './pages/Project/getProjectOverview';
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

  // { path: '/noramalUser', component: NormalUserDashBoard, protected: true, layout: true },
  { path: '/', component: Dashboard, protected: true, layout: true },
  { path: '/project/add', component: AddProject, protected: true, layout: true },
  // { path: '/project/:projectId', component: GetProjectOverview, protected: true, layout: true },
  { path: '/project/:projectId/members', component: UserList, protected: true, layout: true },
  { path: '/project/members', component: UserList, protected: true, layout: true },

  // { path: '/project/:projectId/members/add', component: AddMember, protected: true, layout: true },

  // { path: '/project/:projectId/progress', component: ProgessList, protected: true, layout: true },
  // { path: '/project/:projectId/progress/add', component: AddProgess, protected: true, layout: true },
  // { path: '/project/:projectId/view/:id', component: ViewProgress, protected: true, layout: true },

  // { path: '/addProgress/', component: AddDirectProgess, protected: true, layout: true },

  // { path: '/project/:projectId/task', component: TaskList, protected: true, layout: true },
  // { path: '/project/:projectId/task/add', component: AddTask, protected: true, layout: true },

  // { path: '/users', component: AddUser, protected: true, layout: true },
  // { path: '/user/add', component: AddUser, protected: true, layout: true },

  { path: '*', component: NotFound, protected: false, layout: false },
];
