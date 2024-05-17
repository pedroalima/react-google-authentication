import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

// interface UserType {
//   access_token: string,
// }

// interface ProfileType {
//   name: string;
//   picture: string;
// }

function App() {
  const [ user, setUser ] = useState(null);
  // const [ profile, setProfile ] = useState<ProfileType | null>(null);

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => {
  //     console.log("Login successful:", codeResponse);
  //     setUser(codeResponse);
  //   },
  //   onError: (error) => console.log("Login Failed:", error)
  // });

  // useEffect(() => {
  //   if (user) {
  //     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //       headers: {
  //         Authorization: `Bearer ${user.access_token}`,
  //         Accept: "application/json"
  //       }
  //     })
  //       .then((res) => {
  //         setProfile(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [ user ]
  // );

  return (
    <main className="bg-zinc-800 w-full h-screen text-white flex justify-center items-center">
      {/* <div>
        <button onClick={() => login}>Login</button>
      </div> */}

      <GoogleLogin
        onSuccess={(credentialResponse : CredentialResponse)  => {
          if (credentialResponse.credential) {
            setUser(jwtDecode(credentialResponse.credential));
          }
          console.log(user);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </main>
  );
}

export default App;

