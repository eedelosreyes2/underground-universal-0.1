import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaArrowLeft } from 'react-icons/fa';
import Input from '../../components/Input';
import Layout from '../../components/Layout';

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: any;
  res: any;
}) => {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

const profile = () => {
  const [name, setName] = useState('asd');

  useEffect(() => {
    console.log(name);
  }, [name]);

  const renderPageHeader = () => {
    return (
      <div className="flex justify-between w-full mb-10">
        <div
          // TODO: Change dor name reroute
          onClick={() => router.push('/profile')}
          className="flex items-center gap-2 text-button"
        >
          <IconContext.Provider value={{ size: '1.25em', color: 'red' }}>
            <FaArrowLeft />
          </IconContext.Provider>
          Back to profile
        </div>
        {/* TODO: Show on form diff */}
        <div className="cta-button">Save</div>
      </div>
    );
  };

  const renderEditInfo = () => {
    return (
      <>
        <div className="w-24 h-24 relative border border-primary rounded-full sm:w-60 sm:h-60">
          <Image
            src={'/imgSrc!'}
            layout="fill"
            alt="Profile"
            className="rounded-full"
          />
        </div>
        <h3 className="pt-3">Song Title Here</h3>
        <div className="text-button text-secondary">Change track</div>
      </>
    );
  };

  const renderForm = () => {
    return (
      <div className="w-full flex justify-center mt-10">
        <Input name="Name" length={10} value={name} setValue={setName} />
      </div>
    );
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-inner-container">
          {renderPageHeader()}

          <div className="flex flex-col items-center">
            {renderEditInfo()}
            {renderForm()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
