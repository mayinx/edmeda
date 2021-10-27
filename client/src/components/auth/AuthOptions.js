import useAuthActions from "./useAuthActions";

export default function AuthOptions() {
  const { userLoggedIn, register, login, logout } = useAuthActions();

  return (
    <nav className="auth-options">
      {userLoggedIn() ? (
        <button className="btn green" onClick={logout}>
          Logout
        </button>
      ) : (
        <>
          <button className="btn green" onClick={register}>
            Sign Up
          </button>
          <button className="btn green" onClick={login}>
            Login
          </button>
        </>
      )}
    </nav>
  );
}
