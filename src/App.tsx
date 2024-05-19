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
    console.log(profile);
    
    if (user) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json"
        }
      }
      ).then(res => {
        setProfile(res.data);
      })
        .catch(error => {
          console.error(error);
        });
    }
  }, [ user ]
  );

  return (
    <main className="bg-zinc-800 w-full h-screen text-white flex justify-center items-center">
      <div className="flex flex-col items-center gap-10">
        {profile ? (
          <>
            <h3>Olá <strong>{profile.name}</strong></h3>
            <img src={profile.picture} className="rounded-full" alt="Imagem de perfil" />
          </>
        ) : (
          <>
            <h3>Faça login com auxilio do React Oauth Google</h3>
            <div className="rounded-full w-[96px] h-[96px] bg-gray-500/30"></div>
          </>
        )
        }
        <button className="px-6 py-2 bg-white hover:bg-gray-200 transition-all text-black font-semibold text-lg rounded-full" onClick={() => login()}>Entrar com Google</button>
      </div>

      <div>


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

