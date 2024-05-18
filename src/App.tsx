import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";

// interface UserType {
//   access_token: string,
// }

interface ProfileType {
  name: string;
  picture: string;
}

function App() {
  const [ user, setUser ] = useState<TokenResponse | undefined>(undefined);
  const [ profile, setProfile ] = useState<ProfileType | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Login successful:", codeResponse);
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error)
  });

  useEffect(() => {
    console.log(user);
    // console.log(accessToken);
    
    if (user) {
      try {
        const res = axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json"
          }
        }
        );
        console.log(res);
        // setProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [ user ]
  );

  return (
    <main className="bg-zinc-800 w-full h-screen text-white flex justify-center items-center">
      <div>
        <button onClick={() => login()}>Login</button>
      </div>

      <div>
        {/* {user && (
          <h3>Olá {user.name}</h3>
        )} */}

        {/* <GoogleLogin
          onSuccess={(credentialResponse : CredentialResponse)  => {
            setAccessToken(credentialResponse);

            let credentialResponseDecoded;

            if (credentialResponse.credential) {
              credentialResponseDecoded = jwtDecode(credentialResponse.credential);
            }
            setUser(credentialResponseDecoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        /> */}
      </div>
    </main>
  );
}

export default App;

