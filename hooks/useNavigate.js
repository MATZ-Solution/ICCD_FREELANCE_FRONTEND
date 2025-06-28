// useNavigateTo.js
import { useNavigate } from "react-router-dom";

export default function useNavigateTo() {
  const navigate = useNavigate();
  return (pathName) => navigate(pathName);
}
