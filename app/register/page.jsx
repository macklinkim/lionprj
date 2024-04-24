import UserRegisterForm from "@components/UserRegisterForm";
import { getServerSession } from "next-auth";
// import { authOptions } from "@api/auth/[...nextauth]/route";

export default async function Register() {
	const session = await getServerSession();
	if (session) redirect("/dashboard");

	return <UserRegisterForm />;
}
