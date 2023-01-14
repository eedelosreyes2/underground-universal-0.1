const Modal = ({ children }: any) => {
  return (
    <div
      className="absolute m-auto left-0 right-0 top-[80px] flex flex-col 
        z-50 dark:bg-nav-dark bg-nav-light shadow-2xl border-primary border-2
        rounded-lg min-h-[100px] w-[80%] max-w-xl"
    >
      <div
        className="bg-primary rounded-t-sm h-[5px] w-full
        flex flex-col"
      ></div>
      <div
        className="h-full flex-grow p-5 px-10 text-center
        flex flex-col gap-5 justify-between items-center"
      >
        {children}
        {/* <div>
          hey this is contenthey this is contenthey this is contenthey this is
          contenthey this is contenthey this is contenthey this is contenthey
          this is contenthey this is contenthey this is content
        </div>
        <div>This is the button container</div> */}
      </div>
    </div>
  );
};

export default Modal;
