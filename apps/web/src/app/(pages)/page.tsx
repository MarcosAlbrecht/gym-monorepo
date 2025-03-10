import { redirect } from "next/navigation";

export default function Home() {
  //verificar se user possui token salvo
  //efetuar login caso possua, caso nao tiver, direciona para pagina de login
  redirect("/login");
  return <div>page</div>;
}
