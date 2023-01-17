import { gql, useMutation, useQuery } from "@apollo/client";
import { getSession, useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "../../components/form/MultiSelect";
import TextArea from "../../components/form/TextArea";
import TextField from "../../components/form/TextField";

const ArtistsQuery = gql`
  query {
    artists {
      id
      name
      email
      username
      location
      bio
      imgSrc
      trackId
      badgeId
      roles
      genres
      experience
      streamings
      createdAt
      udpatedAt
      dob
      status
    }
  }
`;

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
    $streamings: [String]
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
      streamings: $streamings
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
        destination: "/api/auth/login",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    location: "",
    bio: "",
    imgSrc: "",
    trackSig: {},
    badge: {},
    roles: [],
    genres: [],
    experience: "",
    streamings: [],
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

  const { data } = useQuery(GET_ARTIST, { variables: { email: user?.email } });
  const { data: allArtists, loading, error } = useQuery(ArtistsQuery);
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
  const artists = allArtists?.artists?.map((artist: any) => {
    if (user?.email !== artist.email) {
      return artist?.username?.toLowerCase();
    }
  });

  useEffect(() => {
    if (data?.getArtistByEmail && !profile.email) {
      setProfile(data.getArtistByEmail);
    }
  }, [profile.email, data]);

  // Username validation
  useEffect(() => {
    if (watch().Username) {
      if (artists?.includes(watch().Username.toLowerCase())) {
        setError("Username", {
          type: "custom",
          message: "Username already taken",
        });
      } else {
        clearErrors("Username");
      }
    }
  }, [watch().Username]);

  const isProfileComplete = () => {
    return username && name && location;
  };

  const renderPageHeader = () => {
    if (isProfileComplete()) {
      return (
        <div className="flex justify-between w-full mb-5">
          <div
            onClick={() => router.push("/" + username)}
            className="flex items-center gap-2 text-button"
          >
            Back to profile
          </div>
        </div>
      );
    }
  };

  const renderForm = () => {
    const experienceOptions = [
      { value: "ROOKIE", name: "Rookie (<yr)", id: 0 },
      { value: "PLAYER", name: "Player (1-4 yrs)", id: 1 },
      { value: "PRO", name: "Pro (5-9 yrs)", id: 2 },
      { value: "VETERAN", name: "Veteran (10+ yrs)", id: 3 },
    ];
    const roleOptions = [
      { value: "RAPPER", name: "Rapper", id: 0 },
      { value: "SINGER", name: "Singer", id: 1 },
      { value: "PRODUCER", name: "Producer", id: 2 },
      { value: "DJ", name: "DJ", id: 3 },
      { value: "ENGINEER", name: "Engineer", id: 4 },
    ];
    const genreOptions = [
      { value: "HIPHOP", name: "Hip hop", id: 0 },
      { value: "ALTERNATIVE", name: "Alternative", id: 1 },
      { value: "BOOMBAP", name: "Boom Bap", id: 2 },
      { value: "EASTCOAST", name: "East Coast", id: 3 },
      { value: "HARDCORE", name: "Hardcore", id: 4 },
      { value: "INSTRUMENTAL", name: "Instrumental", id: 14 },
      { value: "LOFI", name: "Lofi", id: 5 },
      { value: "MIDWEST", name: "Midwest", id: 12 },
      { value: "OLDSCHOOL", name: "Old School", id: 6 },
      { value: "POP", name: "Pop", id: 7 },
      { value: "RNB", name: "R&B", id: 8 },
      { value: "SOUTHERN", name: "Southern", id: 9 },
      { value: "TRAP", name: "Trap", id: 10 },
      { value: "UNDERGROUND", name: "Underground", id: 11 },
      { value: "WESTCOAST", name: "West Coast", id: 13 },
    ];

    let spotify, appleMusic, soundcloud, youtube, bandcamp;
    streamings.map((platform: string) => {
      if (platform.includes("spotify")) {
        spotify = platform;
      }
      if (platform.includes("apple")) {
        appleMusic = platform;
      }
      if (platform.includes("soundcloud")) {
        soundcloud = platform;
      }
      if (platform.includes("youtube")) {
        youtube = platform;
      }
      if (platform.includes("bandcamp")) {
        bandcamp = platform;
      }
    });

    const handleFormSubmit = (data: any) => {
      // TODO: Send toast message - profile saved
      const parsedRoles = data.Roles.map((role: any) => role.value);
      const parsedGenres = data.Genres.map((genre: any) => genre.value);
      const parsedExperience = data.Experience[0].value;

      const {
        Spotify,
        AppleMusic,
        Soundcloud,
        Youtube,
        Bandcamp,
      }: {
        Spotify: never;
        AppleMusic: never;
        Soundcloud: never;
        Youtube: never;
        Bandcamp: never;
      } = data;
      const parsedStreamings: never[] = [];
      if (Spotify) parsedStreamings.push(Spotify);
      if (AppleMusic) parsedStreamings.push(AppleMusic);
      if (Soundcloud) parsedStreamings.push(Soundcloud);
      if (Youtube) parsedStreamings.push(Youtube);
      if (Bandcamp) parsedStreamings.push(Bandcamp);

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
        streamings: parsedStreamings.length ? parsedStreamings : streamings,
      };

      updateArtist({ variables });
      router.reload();
    };

    // TODO: Add profile pic + sigSong to form
    return (
      <div className="w-full max-w-sm flex justify-center my-10">
        <form
          onSubmit={handleSubmit((data) => handleFormSubmit(data))}
          className="w-full"
        >
          <div className="w-full flex flex-col items-center pb-10">
            <div className="relative rounded-full w-60 h-60">
              <Image
                priority
                src={imgSrc || "/default_artist_img.jpg"}
                layout="fill"
                alt="Profile"
                className="rounded-full"
              />
            </div>
            <label htmlFor="image" className="text-button text-secondary pt-2">
              Upload image
            </label>
            <h3 className="pt-10">Song Title Here</h3>
            <div className="text-button text-secondary">Select track</div>
          </div>

          {/* TODO: Validate if name is taken */}
          <TextField
            register={register}
            errors={errors}
            name="Username"
            initialvalue={username}
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
            initialvalue={name}
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
            initialvalue={location}
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
            name="Roles"
            initialvalue={roles}
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
            initialvalue={genres}
            placeholder="Genres"
            currentLength={watch().Genres?.length}
            maxLength={6}
            options={genreOptions}
            setValue={setValue}
          />
          <MultiSelect
            control={control}
            register={register}
            errors={errors}
            name="Experience"
            initialvalue={[experience]}
            placeholder="Experience"
            required={true}
            currentLength={watch().Experience?.length}
            maxLength={1}
            options={experienceOptions}
            setValue={setValue}
          />
          <TextArea
            register={register}
            errors={errors}
            name="Bio"
            initialvalue={bio}
            palceholder="Bio (a sentence or two on who you are and who you are looking to collab with)"
            currentLength={watch().Bio?.length}
            minLength={0}
            maxLength={280}
            setValue={setValue}
          />

          {/* TODO: Streamings validation */}
          <TextField
            register={register}
            errors={errors}
            name="Spotify"
            initialvalue={spotify}
            palceholder="Spotify"
            required={false}
            currentLength={watch().Spotify?.length}
            minLength={2}
            maxLength={100}
            setValue={setValue}
          />
          <TextField
            register={register}
            errors={errors}
            name="AppleMusic"
            initialvalue={appleMusic}
            palceholder="Apple Music"
            required={false}
            currentLength={watch().AppleMusic?.length}
            minLength={2}
            maxLength={100}
            setValue={setValue}
          />
          <TextField
            register={register}
            errors={errors}
            name="Soundcloud"
            initialvalue={soundcloud}
            palceholder="Soundcloud"
            required={false}
            currentLength={watch().Soundcloud?.length}
            minLength={2}
            maxLength={100}
            setValue={setValue}
          />
          <TextField
            register={register}
            errors={errors}
            name="Youtube"
            initialvalue={youtube}
            palceholder="Youtube"
            required={false}
            currentLength={watch().Youtube?.length}
            minLength={2}
            maxLength={100}
            setValue={setValue}
          />
          <TextField
            register={register}
            errors={errors}
            name="Bandcamp"
            initialvalue={bandcamp}
            palceholder="Bandcamp"
            required={false}
            currentLength={watch().Bandcamp?.length}
            minLength={2}
            maxLength={100}
            setValue={setValue}
          />

          {/* TODO: Only show on form dif */}
          <input type="submit" className="my-10 mb-24 cta-button" />
        </form>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {renderPageHeader()}
      {renderForm()}
    </div>
  );
};

export default Profile;
