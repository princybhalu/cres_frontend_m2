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
import ResourceDetails from "../pages/Resource/ResourceDetails";
import WorkPermitDetails from "../pages/WorkPermit/WorkPermitDetails";
import Register from "../pages/Register";

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
  { path: '/project/:projectId/resource/:progressId', component: ResourceDetails, protected: true, layout: true },
  { path: '/project/:projectId/workpermit/:progressId', component: WorkPermitDetails, protected: true, layout: true },

  { path: '/register/:token', component: Register , protected: false, layout: false },
  { path: '*', component: NotFound, protected: false, layout: false },
];
