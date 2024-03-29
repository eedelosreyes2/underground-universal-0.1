import { useRouter } from "next/router";

const Settings = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 justify-start w-full">
      {/* <h2 className="pb-5 w-full">How it works</h2>
      <p className="mb-16">
        This is temporary text: When you Collab with someone, we will send you
        both an email agreement...
      </p> */}

      {/* <h2 className="pb-5 w-full">Support</h2> */}
      <div className="text-button">
        <a
          href="https://underground-universal-website.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Underground Universal Landing Page
        </a>
      </div>
      <div className="text-button">
        <a
          href="https://www.elijahdelosreyes.com/"
          target="_blank"
          rel="noreferrer"
        >
          Elijah's Website
        </a>
      </div>
      {/* <div className="text-button">
        <a
          href="https://discord.com/invite/KNUG3yTsT8/"
          target="_blank"
          rel="noreferrer"
        >
          Contact us on Discord
        </a>
      </div> */}
      {/* <div className="text-button">
        <a
          href="https://linktr.ee/undergrounduniversal/"
          target="_blank"
          rel="noreferrer"
        >
          Follow our Socials
        </a>
      </div> */}
      {/* <div className="text-button">
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
          href="https://www.undergrounduniversal.com/"
          target="_blank"
          rel="noreferrer"
        >
          Suggest a Studio
        </a>
      </div> */}
      <div className="pt-20 text-lg">
        The artists displayed on this web app are ai generated for demo
        purposes.
      </div>
    </div>
  );
};

export default Settings;
