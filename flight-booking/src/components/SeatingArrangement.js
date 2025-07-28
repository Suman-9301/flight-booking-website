
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom"; // For redirect

const SeatLayout = ({flightId}) => {
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if(!userId){
      navigate('/login');
      return;
    }
    axios
      .get(`/seats/${flightId}`)
      .then((res) => {
        setSeats(res.data);
      })
      .catch((err) => console.error("Error fetching seats:",err));
  }, [flightId,navigate]);

  if (!userId) {
    navigate("/login");
    return;
  }

  const toggleSeat = (seatId) => {
    const seat = seats.find((s) => s.seatId === seatId);
    if (seat.status === "booked") return;

    setSelected((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const getColor = (seatId, status) => {
    if (status === "booked") return "bg-red-500";
    if (selected.includes(seatId)) return "bg-green-500";
    return "bg-gray-400";
  };

  const handleBookSeats = () => {
    if (selected.length === 0) return;

    axios
      .post(`/seats/book`, {
        seatIds: selected,
        flightId : flightId,
        userId: userId, 
      })
      .then(() => {
        alert("Seats booked successfully!");
        navigate("/payment");
      })
      .catch((err) => console.error(err));
  };

  const grouped = {};
  seats.forEach((s) => {
    const col = s.seatId.slice(-1);
    if (!grouped[col]) grouped[col] = [];
    grouped[col].push(s);
  });

  Object.keys(grouped).forEach((col) => {
    grouped[col].sort((a, b) => {
      const aNum = parseInt(a.seatId);
      const bNum = parseInt(b.seatId);
      return aNum - bNum;
    });
  });

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold mb-6">Flight: {flightId}</h2>

      {/* <div className="bg-gray-200 items-center gap-4 my-6 mx-4 px-2 lg:w-full lg:h-auto h-full w-auto rounded-full flex md:flex-col lg:flex-row sm:flex-row justify-center shadow-md"> */}
      <div className="bg-gray-200 items-center gap-4 my-6 mx-4 flex flex-col rounded-full lg:flex-row lg:rounded-full justify-center shadow-md">
        {/* Layout content same as before */}
        <div className="w-72 mt-3 lg:mt-0 lg:ml-3 h-64 lg:w-72 lg:h-64 bg-gray-300 flex flex-col justify-center text-lg text-center lg:rounded-tr-none lg:rounded-l-full rounded-t-full ">
        {/* <div className="w-52 h-64 bg-gray-300 flex flex-col justify-center text-lg rounded-l-full text-center"> */}
          <div className="lg:-rotate-90">Pilot Area</div>
        </div>

        <div className="flex flex-row lg:flex-col gap-52 items-start">
          <div className="w-12 h-10 bg-gray-300 text-center">Exit</div>
          <div className="w-12 h-10 bg-gray-300 text-center">Exit</div>
        </div>
        <div className="flex flex-row lg:flex-col gap-6 items-center">
          {["A", "B", "C", "D"].map((col) => (
            <div key={col} className="flex flex-col lg:flex-row gap-2 justify-center">
              {grouped[col]?.map((s) => (
                <div
                  key={s.seatId}
                  onClick={() => toggleSeat(s.seatId)}
                  className={`w-8 h-8 text-xs font-bold shadow-lg text-white rounded-md flex items-center justify-center cursor-pointer ${getColor(
                    s.seatId,
                    s.status
                  )}`}
                >
                  {s.seatId}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-row lg:flex-col gap-52 items-start">
          <div className="w-12 h-10 bg-gray-300 text-center">Exit</div>
          <div className="w-12 h-10 bg-gray-300 text-center">Exit</div>
        </div>
        <div className="w-72 mb-5 lg:mb-0 lg:mr-3 h-64 lg:w-72 lg:h-64 bg-gray-300 flex flex-col justify-center text-lg text-center lg:rounded-bl-none lg:rounded-r-full rounded-b-full ">
          <div className="lg:rotate-90">Kitchen & Restroom Area</div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleBookSeats}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Book Selected Seats
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;


