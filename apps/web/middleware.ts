import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // 🔥 Obtendo token do cookie
  console.log(`entrou no middleware`, token);
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  // const isProtectedPage = req.nextUrl.pathname.startsWith("/avaliacoes");

  // // 🔹 Se o usuário tentar acessar a página de login já autenticado, redireciona para /avaliacoes
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/avaliacoes", req.url));
  }

  return NextResponse.next();
}

// 🔥 Define quais rotas serão interceptadas
export const config = {
  matcher: ["/login"], // Intercepta apenas essas páginas
};
