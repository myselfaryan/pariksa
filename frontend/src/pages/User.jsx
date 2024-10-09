import Navbar from "../components/Navbar/Navbar";
import useAuth from "@/hooks/useAuth";

export default function User() {
  const {userData, handleLogOut} = useAuth();

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="w-full h-full bg-body-bg">
        <div className="flex flex-col items-start gap-3 mt-32 ml-20 w-96 h-48 bg-white rounded-md px-10 py-10">
          <div className="flex gap-6">
            <div>
              <p>Username: </p>
              <p>Email:</p>
              <p>Role:</p>
            </div>
            <div>
              <p>{userData?.username}</p>
              <p>{userData?.email}</p>
              <p>{userData?.Role}</p>
            </div>
          </div>
          <button className="my-3" onClick={handleLogOut}>
            Log-Out
          </button>
        </div>
      </main>
    </div>
  );
}
