import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";                         // -- api para fazer requisição

export async function middleware(req: NextRequest){

  const { pathname } = req.nextUrl                            // -- devolve a rota

  if(pathname.startsWith("/_next") || pathname === "/"){      // -- se ele começa com : startsWith("_next") OU se começa com "/" eu deixo renderizar
    return NextResponse.next();                               // -- deixo renderizar
  }

  const token = getCookieServer();                           // -- trazendo os cookie
  // console.log("Aqui esta o toooooken " + token);

  if(pathname.startsWith("/dashboard")){                     // -- se entrar no dashboard sem token é redirecionado para a home
    if(!token){
      return NextResponse.redirect(new URL("/", req.url));
    }

    const isValid = await validateToken(token);
    console.log('Token Valid:', isValid);

    if(!isValid){
      return NextResponse.redirect(new URL("/", req.url));   // -- se nao valido o login, redirecionada
    }
    
  }

  return NextResponse.next();             // -- se tudo for valido deixo renderizar a URL
}

async function validateToken(token: string){    
  
  if(!token) return false;

  try{
    await api.get("/me", {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    return true;           // -- se deu certo a requisição - se token for valido

  }catch(err){
    return false;
  }

}
