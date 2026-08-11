import { Router } from 'express';
import path from 'node:path';
import { AuthRoutes } from '../../modules/auth/auth.routes.js';

const router: Router = Router();

// Static home route (optional)
router.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Define all module routes here
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  // Add other module routes here...
];

// Mount all module routes
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
