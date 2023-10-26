import { IconContext } from "react-icons";
import { MdPeopleAlt, MdHelp } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import ActiveLink from "./ActiveLink";

const BottomNav = () => {
  return (
    <div
      className="fixed bottom-0 right-0 left-0 
      flex justify-evenly align-middle
      bg-nav-light dark:bg-nav-dark md:hidden py-2"
    >
      <ActiveLink href="/discover">
        <div className="p-3 scale-125">
          <IconContext.Provider value={{}}>
            <FaLocationArrow />
          </IconContext.Provider>
        </div>
      </ActiveLink>

      {/* <ActiveLink href="/studios">
        <div className="p-3">
          <IconContext.Provider value={{ size: "1.75em" }}>
            <RiHeadphoneFill />
          </IconContext.Provider>
        </div>
      </ActiveLink> */}

      {/* <ActiveLink href="/library">
        <div className="p-3">
          <IconContext.Provider value={{ size: '1.75em' }}>
            <MdLibraryMusic />
          </IconContext.Provider>
        </div>
      </ActiveLink> */}

      <ActiveLink href="/collabs">
        <div className="p-3 scale-150">
          <IconContext.Provider value={{}}>
            <MdPeopleAlt />
          </IconContext.Provider>
        </div>
      </ActiveLink>

      <ActiveLink href="/settings">
        <div className="p-3 scale-150">
          <IconContext.Provider value={{}}>
            <MdHelp />
          </IconContext.Provider>
        </div>
      </ActiveLink>
    </div>
  );
};

export default BottomNav;
