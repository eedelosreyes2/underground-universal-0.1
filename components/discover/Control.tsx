import { IconContext } from 'react-icons';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Props {
  leftHandler: any;
  ctaHandler: any;
  rightHandler: any;
  label: String;
}

const Control = ({ leftHandler, ctaHandler, rightHandler, label }: Props) => {
  return (
    <div className="flex items-center">
      <div
        onClick={leftHandler}
        className="rounded-full cursor-pointer p-3 transition-all"
      >
        <IconContext.Provider value={{ size: '1.25em', color: 'red' }}>
          <FaArrowLeft />
        </IconContext.Provider>
      </div>
      <div
        onClick={ctaHandler}
        className="max-w-sm rounded-full cursor-pointer font-bold text-white 
              bg-primary px-5 py-3 mx-12 transition-all hover:scale-110"
      >
        {label}
      </div>
      <div
        onClick={rightHandler}
        className="rounded-full cursor-pointer p-3 transition-all"
      >
        <IconContext.Provider value={{ size: '1.25em', color: 'red' }}>
          <FaArrowRight />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Control;
