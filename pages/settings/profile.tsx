import Layout from '../../components/Layout';
import Profile from '../../components/settings/Profile';

const editProfile = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="page-inner-container">
          <Profile />
        </div>
      </div>
    </Layout>
  );
};

export default editProfile;
