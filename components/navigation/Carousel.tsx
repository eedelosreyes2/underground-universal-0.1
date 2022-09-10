const Carousel = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="w-full flex flex-col rounded-md px-3 py-8 mb-10 
        bg-component-light dark:bg-component-dark"
      >
        {/* Top container */}
        <div className="flex mb-3">
          <div className="border rounded-full w-24 h-24"></div>
          <div className="flex flex-col justify-start items-start ml-5">
            <div className="flex items-center">
              <h1>Zaction Bronson</h1>
              <div className="border rounded-xl ml-3">V</div>
            </div>
            <div className="flex">
              <div className="pr-2 mb-2">I</div>Martinez, Ca
            </div>
            <div className="w-full flex">
              {/* Tags */}
              <div className="border border-primary rounded-full px-3 mr-2">
                Rapper
              </div>
              <div className="border border-secondary rounded-full px-3 mr-2">
                Hip-hop
              </div>
            </div>
          </div>
        </div>

        <div className="w-full text-left">
          A sentence or two on who I am and who I am looking to collab with.
          This will take up the space that the embedded player would, but now I
          moved that.{' '}
        </div>
      </div>
      <div>Control</div>
    </div>
  );
};

export default Carousel;
