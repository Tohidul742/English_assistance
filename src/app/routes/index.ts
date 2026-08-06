import { Router } from 'express';

const router: Router = Router();

router.get('/', (req, res) => {
  return res.json({
    message: 'Welcome to the backend API!',
  });
});

export default router;
