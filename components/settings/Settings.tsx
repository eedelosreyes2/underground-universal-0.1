import { useRouter } from 'next/router';

const Settings = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 justify-start w-full">
      <div className="text-button">
        <a
          href="https://www.undergrounduniversal.com/"
          target="_blank"
          rel="noreferrer"
        >
          About Us
        </a>
      </div>
      <div className="text-button mb-10">
        <a
          href="https://linktr.ee/undergrounduniversal/"
          target="_blank"
          rel="noreferrer"
        >
          Follow our Socials
        </a>
      </div>
      <div className="text-button">
        <a
          href="https://www.undergrounduniversal.com/"
          target="_blank"
          rel="noreferrer"
        >
          Provide Feedback
        </a>
      </div>
      <div className="text-button mb-10">
        <a
          href="https://discord.com/invite/KNUG3yTsT8/"
          target="_blank"
          rel="noreferrer"
        >
          Contact us Discord
        </a>
      </div>
      <div
        onClick={() => {
          if (confirm('Logout of Underground Universal?')) {
            router.push('/api/auth/logout');
          }
        }}
        className="text-button"
      >
        Logout
      </div>
    </div>
  );
};

export default Settings;
