import { useUser } from "@auth0/nextjs-auth0";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";
import { BiMoon } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { gql } from "apollo-server-micro";
import { useQuery } from "@apollo/client";

const GET_ARTIST = gql`
  query ($email: String!) {
    getArtistByEmail(email: $email) {
      id
      email
      name
      username
      imgSrc
    }
  }
`;

const TopNav = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ARTIST, {
    variables: { email: user?.email },
    pollInterval: 1000,
  });

  const handleProfileClick = () => {
    if (data?.getArtistByEmail.username) {
      router.push("/" + data.getArtistByEmail.username);
    } else {
      // TODO: Send toast message - You need to complete your profile to continue
      router.push("/settings/profile");
    }
  };

  return (
    <div
      className="z-10 fixed right-0 left-0 flex justify-between items-center py-3 px-5 
      md:justify-end md:py-7 md:px-12 bg-fill-light dark:bg-fill-dark"
    >
      <div
        onClick={() => router.push("/discover")}
        className="cursor-pointer md:hidden"
      >
        {theme === "dark" ? (
          <Image src="/logo.png" width={142} height={42} alt="Logo" />
        ) : (
          <Image src="/logo_light.png" width={142} height={42} alt="Logo" />
        )}
      </div>
      <div className="flex gap-6 h-fit">
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center cursor-pointer"
        >
          <BiMoon />
        </div>

        {user && (
          <div
            onClick={() => {
              if (confirm("Logout of Underground Universal?")) {
                router.push("/api/auth/logout");
              }
            }}
            className={"flex items-center cursor-pointer"}
          >
            <MdLogout />
          </div>
        )}

        {/* TODO: Get profile picture from userProfile */}
        {user ? (
          <div
            onClick={handleProfileClick}
            className="h-8 cursor-pointer rounded-full overflow-hidden"
          >
            <Image
              priority
              src={user.picture || "/default_artist_img.jpg"}
              width={32}
              height={32}
              alt="Profile"
            />
          </div>
        ) : (
          <div
            onClick={() => router.push("/api/auth/login")}
            className="cta-button"
          >
            Log in
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
