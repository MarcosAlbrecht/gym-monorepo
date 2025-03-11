import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { StorageKeys } from "./app/_utils/storageKeys";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(StorageKeys.TOKEN)?.value; // 🔥 Obtendo token do cookie
  console.log(`entrou no middleware`, token);
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isProtectedPage = req.nextUrl.pathname.startsWith("/avaliacoes");

  // 🔹 Se o usuário tentar acessar a página de login já autenticado, redireciona para /avaliacoes
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/avaliacoes", req.url));
  }

  // 🔹 Se o usuário tentar acessar páginas protegidas sem token, redireciona para /login
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// 🔥 Define quais rotas serão interceptadas
export const config = {
  matcher: ["/login", "/avaliacoes"], // Intercepta apenas essas páginas
};
