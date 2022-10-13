import { useRouter } from 'next/router';

const Settings = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/api/auth/logout')}
      className="text-button"
    >
      Logout
    </div>
  );
};

export default Settings;
