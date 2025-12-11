import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const PaymentSuccess = () => {
  const axiosPublic = useAxios();
  const location = useLocation();
  const navigate = useNavigate();

  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    let called = false;

    async function verify() {
      if (called) return;
      called = true;

      const res = await axiosPublic.get(
        `/verify-session?session_id=${sessionId}`
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your Payment request has been Successful.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/package-update");
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed!",
          text: "Your Payment request failed or is pending.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }

    verify();
  }, [navigate, sessionId, axiosPublic]);

  return <LoadingSpinner />;
};

export default PaymentSuccess;
