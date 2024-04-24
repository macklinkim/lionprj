import UserRegisterForm from "@components/UserRegisterForm";
// import { authOptions } from "@api/auth/[...nextauth]/route";

export default async function Register() {
	const session = await getServerSession(authOptions);
	if (session) redirect("/dashboard");

	return <UserRegisterForm />;
}
