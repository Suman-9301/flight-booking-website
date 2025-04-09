// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import flightNames from '../data/flightName';

// function LandingPages(){
//   const[apiData,setApiData] = useState([]);
//   const[deptID,setDeptID] = useState("");
//   const[arrivalID,setarrivalID] = useState("");
//   const[deptDate,setDeptDate] = useState("");
//   const[returnDate,setReturnDate] = useState("");
//   const[fclass,setfclass] = useState("");

//   function handleForm(event){
//     event.preventDefault()

//     let flightDetails = {
//       deptID : deptID,
//       arrivalID : arrivalID,
//       deptDate : deptDate,
//       returnDate : returnDate,
//       fclass : fclass
//     }

//     fetch("/search",{
//       method:'post',
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body: JSON.stringify(flightDetails)
//     })
//     .then(response =>response.json())
//     .then(data=> setApiData(data))
  
//     console.log("Clicked");
//     console.log(apiData); 
   
//   }

//     return (
//       <>
//       <div class="flightForm">
//         <form onSubmit={handleForm}>
//           <div class="addFlex">
//             <div class="deptID">
//               <label>From</label>
//               <select id="deptID" onChange={e => setDeptID(e.target.value)}>
//               <option value="">Select Departure Airport</option>
//               {flightNames.map((flightName) => (
//                 <option value={flightName.code}>{flightName.name} - {flightName.code}</option>
//               ))}
//               </select>
//             </div>
//             <div>
//               <label>To</label>
//               <select id="arrivalID" onChange={e => setarrivalID(e.target.value)}>
//               <option value="">Select Arrival Airport</option>
//               {flightNames.map((flightName) => (
//                 <option value={flightName.code}>{flightName.name} - {flightName.code}</option>
//               ))}
//               </select>
//             </div>
//             <div>
//               <label>Departure</label>
//               <input type="date" id="deptDate" name="deptDate" onChange={e => setDeptDate(e.target.value)}/>
//             </div>
//             <div>
//               <label>Return</label>
//               <input type="date" id="returnDate" name="returnDate" onChange={e => setReturnDate(e.target.value)}/>
//             </div>
//             <div>
//               <label >Class</label>
//               <select id="fclass" name="fclass" onChange={e => setfclass(e.target.value)}>
//                 <option value="1">Economy</option>
//                 <option value="2">Premium economy</option>
//                 <option value="3">Business</option>
//                 <option value="4">First</option>
//               </select>
//             </div>
//             <button type="submit" id="search" >Search</button>
//           </div>
//         </form> 
//       </div>
//       <div class="flightDisplay">
//         {apiData.map((item) => (
//           <div class="flightdetails">
//             <label>{item.flights[0].airline}</label>
//             <div >
//               <img src={item.flights[0].airline_logo} id ="flogo"></img>
//               <div>
//                 <h2>{item.flights[0].departure_airport.id}</h2>
//                 <h3>{item.flights[0].departure_airport.time}</h3>
//               </div>
//               <div >
//                 <label>{item.total_duration}</label>
//                 <br></br>
//                 <span>----o----</span>
//               </div>
//               <div>
//                 <h2>{item.flights[0].arrival_airport.id}</h2>
//                 <h3>{item.flights[0].arrival_airport.time}</h3>
//               </div>
//               <div>
//                 <h1>₹{item.price}</h1>
//               </div>
//               <button id="book" >BOOK</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       </>
//     );
//   }


// export default LandingPages;


import React, { useState } from 'react';
import flightNames from '../data/flightName';


function LandingPages({addBooking}) {
  const [apiData, setApiData] = useState([]);
  const [deptID, setDeptID] = useState("");
  const [arrivalID, setArrivalID] = useState("");
  const [deptDate, setDeptDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [fclass, setFclass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleForm(event) {
    event.preventDefault();

    let flightDetails = {
      deptID,
      arrivalID,
      deptDate,
      returnDate,
      fclass,
    };

    setIsLoading(true); // Start loading

    fetch("/search", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flightDetails),
    })
      .then(response => response.json())
      .then(data => {
        setApiData(data);
        setIsLoading(false); // Stop loading
      })
      .catch(() => {
        setIsLoading(false); // Stop loading in case of error
      });
  }

  return (
    <div className="text-textDark min-h-screen">
      <div className="skybooker-description text-center py-16 bg-gradient-to-r text-blue-950">
        <h2 className="text-5xl font-bold mb-4">Welcome to <span className="text-orange-600">SkyBooker</span></h2>
        <p className="text-xl mb-8 ">Your ultimate flight booking companion. Compare flights, find the best deals, and book your next adventure with ease.</p>
        <p className="text-2xl font-semibold italic text-slate-800">"Your Journey Starts Here – Book Your Sky, Book Your Dreams."</p>
      </div>

      {/* Flight Search Form */}
      <div className="flightForm container mx-auto px-4 py-8">
        <form onSubmit={handleForm} className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-wrap space-x-4 items-center">
            {/* Departure Airport */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-2">From</label>
              <select id="deptID" onChange={e => setDeptID(e.target.value)} className="w-full p-2 border rounded">
                <option value="">Select Departure Airport</option>
                {flightNames.map((flightName) => (
                  <option value={flightName.code} key={flightName.code}>{flightName.name} - {flightName.code}</option>
                ))}
              </select>
            </div>

            {/* Arrival Airport */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-2">To</label>
              <select id="arrivalID" onChange={e => setArrivalID(e.target.value)} className="w-full p-2 border rounded">
                <option value="">Select Arrival Airport</option>
                {flightNames.map((flightName) => (
                  <option value={flightName.code} key={flightName.code}>{flightName.name} - {flightName.code}</option>
                ))}
              </select>
            </div>

            {/* Departure Date */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-2">Departure</label>
              <input type="date" id="deptDate" name="deptDate" onChange={e => setDeptDate(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            {/* Return Date */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-2">Return</label>
              <input type="date" id="returnDate" name="returnDate" onChange={e => setReturnDate(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            {/* Class Selection */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium mb-2">Class</label>
              <select id="fclass" name="fclass" onChange={e => setFclass(e.target.value)} className="w-full p-2 border rounded">
                <option value="1">Economy</option>
                <option value="2">Premium Economy</option>
                <option value="3">Business</option>
                <option value="4">First</option>
              </select>
            </div>

            {/* Search Button */}
            <button type="submit" id="search" className="mt-4 bg-primary text-white py-2 px-6 rounded-lg hover:bg-accent transition duration-300">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Flight Results */}
      <div className="flightDisplay container mx-auto px-4 py-8">
        {!isLoading && apiData.length > 0 ? (
          <div>
            {apiData.map((item, index) => (
              <div 
                key={index} 
                className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center md:space-x-32 space-y-4 md:space-y-0"
              >
                {/* Airline Logo and Airline Name */}
                <div className="flex items-center space-x-4">
                  <img src={item.flights[0].airline_logo} alt="Airline Logo" className="w-12 h-12" />
                  <h2 className="text-lg font-bold text-center md:text-left">{item.flights[0].airline}</h2>
                </div>

                {/* Departure and Arrival Details */}
                <div className="flex-1 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-8">
                  {/* Departure Info */}
                  <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-medium">{item.flights[0].departure_airport.id}</h3>
                    <p className="text-sm">{item.flights[0].departure_airport.time}</p>
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col items-center">
                    <span className="font-medium">{item.total_duration}</span>
                  </div>

                  {/* Arrival Info */}
                  <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-medium">{item.flights[0].arrival_airport.id}</h3>
                    <p className="text-sm">{item.flights[0].arrival_airport.time}</p>
                  </div>
                </div>

                {/* Price and Book Button */}
                <div className="text-center md:text-right">
                  <h1 className="text-xl font-bold text-accent">₹{item.price}</h1>
                  <button
                    onClick={() => addBooking(item)}
                    className="bg-orange-600 text-textLight py-2 px-6 rounded-full hover:bg-orange-700 transition duration-300 mt-4"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <p className="text-center text-xl font-medium text-white">
              No flights available for the selected criteria.
            </p>
          )
        )}
      </div>

    </div>
  );
}

export default LandingPages;
