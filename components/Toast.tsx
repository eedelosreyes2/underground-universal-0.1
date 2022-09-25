const Toast = (page: string) => {
  return (
    <div
      className="rounded-lg border border-primary border-l-primary border-l-4
        py-2 px-5 text-primary absolute top-0 sm:left-[192px] top-5 max-w-xs
        dark:bg-nav-dark bg-nav-light"
    >
      The {page} is for members only!
    </div>
  );
};

export default Toast;
