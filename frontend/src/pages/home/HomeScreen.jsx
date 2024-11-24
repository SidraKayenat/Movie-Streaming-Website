import { useAuthStore } from "../../store/authUser";

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <>
      HomeScreen
      <button onClick={logout}>logout</button>
    </>
  );
};

export default HomeScreen;
