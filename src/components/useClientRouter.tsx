import { useRouter } from 'next/router';

const useClientRouter = () => {
  const router = useRouter();
  return router;
};

export default useClientRouter;