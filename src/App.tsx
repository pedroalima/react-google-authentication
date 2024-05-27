import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";

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
      setCookie(null, "auth_token", codeResponse.access_token);
      setUser(codeResponse);
    },
  });

  const logout = () => {
    destroyCookie(null, "auth_token");
  };

  useEffect(() => {
    const { "auth_token": token } = parseCookies();
    console.log("User: ", user);
    console.log("Profile: ", profile);
    console.log("token: ", token);
    
    if (user) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json"
        }
      }
      ).then(res => {
        console.log(res.data);
        setProfile(res.data);
      })
        .catch(error => {
          console.error(error);
        });
    } else if (token) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
      ).then(res => {
        console.log(res.data);
        setProfile(res.data);
      })
        .catch(error => {
          console.error(error);
        });
    }  
  }, [ user ]);

  return (
    <main className="bg-zinc-800 w-full h-screen text-white flex justify-center items-center">
      <div className="flex flex-col items-center gap-10">
        {profile ? (
          <>
            <h3 className="text-2xl">Olá <strong>{profile.name}</strong></h3>
            <img src={profile.picture} className="rounded-full" alt="Imagem de perfil" />
            <button 
              className="px-6 py-2 bg-red-500 hover:bg-red-600 transition-all text-white font-semibold text-lg rounded-full" 
              onClick={() => logout()}
            >Sair</button>
          </>
        ) : (
          <>
            <h3 className="text-2xl">Faça login com auxílio do <strong>React Oauth Google</strong></h3>
            <div className="rounded-full w-[96px] h-[96px] bg-gray-500/30">
              <IoPersonCircle className="w-full h-full" />
            </div>
            <button 
              className="px-6 py-2 bg-white hover:bg-gray-200 transition-all text-black font-semibold text-lg rounded-full" 
              onClick={() => login()}
            >Entrar com Google</button>
          </>
        )}
      </div>
    </main>
  );
}

export default App;

