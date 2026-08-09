import RegisterForm from "../components/register/RegisterForm";
import PageHeader from "../components/common/header/PageHeader.jsx";
function Register() {
  return (
    <>
      <PageHeader title="Inscription" />
      <main className="mx-auto w-full max-w-md px-6 py-12">
        <RegisterForm />
      </main>
    </>
  );
}

export default Register;
