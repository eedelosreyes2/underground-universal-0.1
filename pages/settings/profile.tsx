import { gql, useMutation, useQuery } from '@apollo/client';
import { getSession, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MultiSelect from '../../components/form/MultiSelect';
import TextArea from '../../components/form/TextArea';
import TextField from '../../components/form/TextField';
import Layout from '../../components/Layout';

// TODO: Add trackSig, and badge to query
const GET_ARTIST = gql`
  query ($email: String!) {
    getArtistByEmail(email: $email) {
      id
      name
      email
      username
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
    $username: String
    $location: String
    $bio: String
  ) {
    updateArtist(
      id: $id
      name: $name
      username: $username
      location: $location
      bio: $bio
    ) {
      email
      name
      username
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
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    email: '',
    username: '',
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
    username,
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
      username,
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
    return username && name && location;
  };

  const renderPageHeader = () => {
    if (isProfileComplete()) {
      return (
        <div className="flex justify-between h-10 w-full mb-10 max-w-sm">
          <div
            onClick={() => router.push('/' + username)}
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
    const roleOptions = [
      { value: 'Rapper', name: 'Rapper', id: 0 },
      { value: 'Singer', name: 'Singer', id: 1 },
      { value: 'Producer', name: 'Producer', id: 2 },
      { value: 'DJ', name: 'DJ', id: 3 },
    ];
    const genreOptions = [
      { value: 'Hip hop', name: 'Hip hop', id: 0 },
      { value: 'Alternative', name: 'Alternative', id: 1 },
      { value: 'Boom Bap', name: 'Boom Bap', id: 2 },
      { value: 'East Coast', name: 'East Coast', id: 3 },
      { value: 'Hardcore', name: 'Hardcore', id: 4 },
      { value: 'Lofi', name: 'Lofi', id: 5 },
      { value: 'Old School', name: 'Old School', id: 6 },
      { value: 'Pop', name: 'Pop', id: 7 },
      { value: 'R&B', name: 'R&B', id: 8 },
      { value: 'Southern', name: 'Southern', id: 9 },
      { value: 'Trap', name: 'Trap', id: 10 },
      { value: 'Underground', name: 'Underground', id: 11 },
      { value: 'Midwest', name: 'Midwest', id: 12 },
      { value: 'West Coast', name: 'West Coast', id: 13 },
      { value: 'Instrumental', name: 'Instrumental', id: 14 },
    ];

    console.log(errors);

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
            name="Username"
            palceholder="Username"
            required={true}
            currentLength={watch().Username?.length}
            minLength={2}
            maxLength={15}
          />
          <TextField
            register={register}
            errors={errors}
            name="Name"
            palceholder="Name"
            required={true}
            currentLength={watch().Name?.length}
            minLength={2}
            maxLength={50}
          />
          <TextField
            register={register}
            errors={errors}
            name="Location"
            palceholder="Location"
            required={true}
            currentLength={watch().Location?.length}
            minLength={2}
            maxLength={50}
          />
          <MultiSelect
            control={control}
            register={register}
            errors={errors}
            name="Role"
            placeholder="Role"
            required={true}
            currentLength={watch().Name?.length}
            maxLength={3}
            options={roleOptions}
            setValue={setValue}
          />
          <MultiSelect
            control={control}
            register={register}
            errors={errors}
            required={true}
            name="Genres"
            placeholder="Genres"
            currentLength={watch().Name?.length}
            maxLength={6}
            options={genreOptions}
            setValue={setValue}
          />
          <TextArea
            register={register}
            errors={errors}
            name="Bio"
            palceholder="Bio (a sentence or two on who you are and who you are looking to collab with)"
            currentLength={watch().Bio?.length}
            minLength={0}
            maxLength={280}
          />

          {/* TODO: Make slidedown and hide streamings by default */}
          <TextField
            register={register}
            errors={errors}
            name="Spotify"
            palceholder="Spotify"
            required={false}
            currentLength={watch().Spotify?.length}
            minLength={2}
            maxLength={50}
          />
          <TextField
            register={register}
            errors={errors}
            name="AppleMusic"
            palceholder="Apple Music"
            required={false}
            currentLength={watch().AppleMusic?.length}
            minLength={2}
            maxLength={50}
          />
          <TextField
            register={register}
            errors={errors}
            name="Soundcloud"
            palceholder="Soundcloud"
            required={false}
            currentLength={watch().Soundcloud?.length}
            minLength={2}
            maxLength={50}
          />
          <TextField
            register={register}
            errors={errors}
            name="Youtube"
            palceholder="Youtube"
            required={false}
            currentLength={watch().Youtube?.length}
            minLength={2}
            maxLength={50}
          />
          <TextField
            register={register}
            errors={errors}
            name="Bandcamp"
            palceholder="Bandcamp"
            required={false}
            currentLength={watch().Bandcamp?.length}
            minLength={2}
            maxLength={50}
          />

          <input type="submit" className="my-10 text-button" />
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
