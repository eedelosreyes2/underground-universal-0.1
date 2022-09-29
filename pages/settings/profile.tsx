import { gql, useMutation, useQuery } from '@apollo/client';
import { getSession, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../../components/TextField';
import Layout from '../../components/Layout';

// TODO: Add trackSig, and badge to query
const GET_ARTIST = gql`
  query ($email: String!) {
    getArtistByEmail(email: $email) {
      id
      name
      email
      handle
      location
      bio
      imgSrc
      role
      genres
      level
      streamings
    }
  }
`;

const UPDATE_ARTIST = gql`
  mutation (
    $id: String!
    $name: String
    $handle: String
    $location: String
    $bio: String
  ) {
    updateArtist(
      id: $id
      name: $name
      handle: $handle
      location: $location
      bio: $bio
    ) {
      email
      name
      handle
      location
      bio
      role
      genres
      level
      streamings
    }
  }
`;

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

const editProfile = () => {
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    email: '',
    handle: '',
    location: '',
    bio: '',
    imgSrc: '',
    trackSig: {},
    badge: {},
    role: '',
    genres: [],
    level: '',
    streamings: '',
  });
  const {
    id,
    name,
    email,
    handle,
    location,
    bio,
    imgSrc,
    trackSig,
    badge,
    role,
    genres,
    level,
    streamings,
  } = profile;

  const { data, loading, error } = useQuery(GET_ARTIST, {
    variables: { email: user?.email },
    pollInterval: 500,
  });
  const [updateArtist] = useMutation(UPDATE_ARTIST, {
    variables: {
      id,
      name,
      handle,
      location,
      bio,
      imgSrc,
      trackSig,
      badge,
      role,
      genres,
      level,
      streamings,
    },
  });

  useEffect(() => {
    if (data) {
      setProfile(data.getArtistByEmail);
    }
  }, [data]);

  const isProfileComplete = () => {
    return handle && name && location;
  };

  const renderPageHeader = () => {
    if (isProfileComplete()) {
      return (
        <div className="flex justify-between h-10 w-full mb-10 max-w-sm">
          <div
            onClick={() => router.push('/' + handle)}
            className="flex items-center gap-2 text-button"
          >
            Back to profile
          </div>
          {/* TODO: Show on form diff */}
          <div className="cta-button">Save</div>
        </div>
      );
    }
  };

  const renderEditInfo = () => {
    return (
      <>
        <div className="w-24 h-24 relative border border-secondary rounded-full sm:w-60 sm:h-60">
          <Image
            src={imgSrc || user?.picture || '/default_artist_img.jpg'}
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
      <div className="w-full max-w-sm flex justify-center mt-10">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          className="w-full"
        >
          <TextField
            register={register}
            errors={errors}
            name="Name"
            currentLength={watch().Name?.length}
            minLength={2}
            maxLength={50}
          />
          <TextField
            register={register}
            errors={errors}
            name="Location"
            currentLength={watch().Location?.length}
            minLength={2}
            maxLength={50}
          />

          <input type="submit" />
        </form>
      </div>
    );
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-inner-container">
          <div className="flex flex-col items-center">
            {renderPageHeader()}
            {renderEditInfo()}
            {renderForm()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default editProfile;
