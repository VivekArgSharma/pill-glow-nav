// src/pages/Profile.tsx
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { loading, profile, session, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!session || !profile) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-20">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center border border-gray-200">
          <h1 className="text-3xl font-bold mb-4">Sign in to DevConnect</h1>
          <p className="text-gray-600 mb-6">
            Login with your Google account to create posts and see your profile.
          </p>
          <Button onClick={signInWithGoogle} className="px-6 py-3 text-lg">
            Continue with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-20">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center border border-gray-200">
        <img
          src={
            profile.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile.full_name || "User"
            )}&background=0D8ABC&color=fff&size=256`
          }
          alt={profile.full_name || "User avatar"}
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary/20"
        />

        <h1 className="text-2xl font-bold mb-2">
          {profile.full_name || "DevConnect User"}
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          {/* Email is inside session.user */}
          {session.user?.email}
        </p>

        <div className="text-gray-700 mb-6">
          <p className="text-sm">
            This is your profile page. In the future you can see all your
            projects and blogs here.
          </p>
        </div>

        <Button variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
