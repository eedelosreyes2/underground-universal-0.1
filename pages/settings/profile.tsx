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
      roles
      genres
      experience
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
    $experience: String
    $roles: [String]
    $genres: [String]
    $bio: String
  ) {
    updateArtist(
      id: $id
      name: $name
      username: $username
      location: $location
      experience: $experience
      roles: $roles
      genres: $genres
      bio: $bio
    ) {
      email
      name
      username
      location
      bio
      roles
      genres
      experience
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
    roles: [],
    genres: [],
    experience: '',
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
    roles,
    genres,
    experience,
    streamings,
  } = profile;

  // TODO: Fix polling ?
  const { data, loading, error, startPolling, stopPolling } = useQuery(
    GET_ARTIST,
    { variables: { email: user?.email } }
  );
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
      roles,
      genres,
      experience,
      streamings,
    },
  });

  useEffect(() => {
    if (data && !profile.email) {
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
    const experienceOptions = [
      { value: 'ROOKIE', name: 'Rookie (<yr)', id: 0 },
      { value: 'PLAYER', name: 'Player (1-4 yrs)', id: 1 },
      { value: 'PRO', name: 'Pro (5-9 yrs)', id: 2 },
      { value: 'VETERAN', name: 'Veteran (10+ yrs)', id: 3 },
    ];
    const roleOptions = [
      { value: 'RAPPER', name: 'Rapper', id: 0 },
      { value: 'SINGER', name: 'Singer', id: 1 },
      { value: 'PRODUCER', name: 'Producer', id: 2 },
      { value: 'DJ', name: 'DJ', id: 3 },
    ];
    const genreOptions = [
      { value: 'HIPHOP', name: 'Hip hop', id: 0 },
      { value: 'ALTERNATIVE', name: 'Alternative', id: 1 },
      { value: 'BOOMBAP', name: 'Boom Bap', id: 2 },
      { value: 'EASTCOAST', name: 'East Coast', id: 3 },
      { value: 'HARDCORE', name: 'Hardcore', id: 4 },
      { value: 'LOFI', name: 'Lofi', id: 5 },
      { value: 'OLDSCHOOL', name: 'Old School', id: 6 },
      { value: 'POP', name: 'Pop', id: 7 },
      { value: 'RNB', name: 'R&B', id: 8 },
      { value: 'SOUTHERN', name: 'Southern', id: 9 },
      { value: 'TRAP', name: 'Trap', id: 10 },
      { value: 'UNDERGROUND', name: 'Underground', id: 11 },
      { value: 'MIDWEST', name: 'Midwest', id: 12 },
      { value: 'WESTCOAST', name: 'West Coast', id: 13 },
      { value: 'INSTRUMENTAL', name: 'Instrumental', id: 14 },
    ];

    const handleFormSubmit = (data: any) => {
      // TODO: Send toast message - profile saved
      const parsedRoles = data.Roles.map((role: any) => role.value);
      const parsedGenres = data.Genres.map((genre: any) => genre.value);
      const parsedExperience = data.Experience[0].value;

      const variables = {
        id,
        name: data.Name || name,
        username: data.Username || username,
        location: data.Location || location,
        bio: data.Bio || bio,
        imgSrc, // TODO
        trackSig, // TODO
        badge, // TODO
        roles: parsedRoles || roles,
        genres: parsedGenres || genres,
        experience: parsedExperience || experience,
        streamings, // TODO: finish
      };

      updateArtist({ variables });
    };

    return (
      <div className="w-full max-w-sm flex justify-center mt-10">
        <form
          onSubmit={handleSubmit((data) => handleFormSubmit(data))}
          className="w-full"
        >
          <TextField
            register={register}
            errors={errors}
            name="Username"
            initialValue={username}
            palceholder="Username"
            required={true}
            currentLength={watch().Username?.length}
            minLength={2}
            maxLength={15}
            setValue={setValue}
          />
          <TextField
            register={register}
            errors={errors}
            name="Name"
            initialValue={name}
            palceholder="Name"
            required={true}
            currentLength={watch().Name?.length}
            minLength={2}
            maxLength={50}
            setValue={setValue}
          />
          <TextField
            register={register}
            errors={errors}
            name="Location"
            initialValue={location}
            palceholder="Location"
            required={true}
            currentLength={watch().Location?.length}
            minLength={2}
            maxLength={50}
            setValue={setValue}
          />
          <MultiSelect
            control={control}
            register={register}
            errors={errors}
            name="Experience"
            initialValue={[experience]}
            placeholder="Experience"
            required={true}
            currentLength={watch().Experience?.length}
            maxLength={1}
            options={experienceOptions}
            setValue={setValue}
          />
          <MultiSelect
            control={control}
            register={register}
            errors={errors}
            name="Roles"
            initialValue={roles}
            placeholder="Roles"
            required={true}
            currentLength={watch().Roles?.length}
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
            initialValue={genres}
            placeholder="Genres"
            currentLength={watch().Genres?.length}
            maxLength={6}
            options={genreOptions}
            setValue={setValue}
          />
          <TextArea
            register={register}
            errors={errors}
            name="Bio"
            initialValue={bio}
            palceholder="Bio (a sentence or two on who you are and who you are looking to collab with)"
            currentLength={watch().Bio?.length}
            minLength={0}
            maxLength={280}
            setValue={setValue}
          />

          {/* TODO: Make slidedown and hide streamings by default */}
          {/* TODO: Streamings validation */}
          <TextField
            register={register}
            errors={errors}
            name="Spotify"
            palceholder="Spotify"
            required={false}
            currentLength={watch().Spotify?.length}
            minLength={2}
            maxLength={50}
            setValue={setValue}
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
            setValue={setValue}
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
            setValue={setValue}
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
            setValue={setValue}
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
            setValue={setValue}
          />

          <input type="submit" className="my-10 mb-24 text-button" />
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
