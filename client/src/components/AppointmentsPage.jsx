import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown } from 'lucide-react';
import {
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Loader2
} from "lucide-react";

const STATUS_COLORS = {
  pending: "bg-yellow-200 text-yellow-700",
  confirmed: "bg-blue-200 text-blue-700",
  "in-progress": "bg-purple-200 text-purple-700",
  completed: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/finances/allbookings`,
        { withCredentials: true }
      );
      setAppointments(response?.data?.data?.appointments);
      setEmergencies(response?.data?.data?.emergencies);
    } catch (error) {
      console.error("Error fetching all bookings:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const viewDetail = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const renderCard = (item) => {
    const isExpanded = expandedId === item._id;

    return (
      <div
        key={item._id}
        className={`border shadow-sm rounded-lg p-4 bg-white relative duration-300 ease-in-out transition-all ${
          isExpanded ? 'h-full overflow-hidden' : 'h-28 md:h-20 overflow-hidden'
        }`}
      >
        <button
          onClick={() => viewDetail(item._id)}
          className="cursor-pointer absolute right-5 bottom-2 md:bottom-0"
        >
          <ChevronDown className={` transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4">
          <div className="flex-1">
            <h2 className="font-bold text-md md:text-lg">
              Client: <span className="capitalize font-medium">{item.name}</span>
            </h2>
            <p className="font-medium text-sm md:text-base">
              Service Category: <span className="capitalize text-gray-700">{item.serviceCategory}</span>
            </p>
          </div>

          {item.assignedMechanic && (
            <div className="flex flex-col md:flex-row items-start md:items-center  lg:gap-4">
              <h2 className="text-sm md:text-base">Assigned Mechanic: {item.assignedMechanic.name}</h2>
              <a href={`tel:${item.assignedMechanic.phone}`} className="text-sm md:text-base text-blue-700">
               Mechanic Contact : {item.assignedMechanic.phone}
              </a>
            </div>
          )}

          <span
            className={`text-xs md:text-sm px-3 py-1 rounded-full font-medium ${
              STATUS_COLORS[item.status]
            }`}
          >
            {item.status.toUpperCase()}
          </span>
        </div>

        <div className="mt-3 text-sm md:text-base text-gray-700 space-y-1">
          <p><strong>Phone:</strong> {item.phone}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Bike Model:</strong> {item.bikeModel}</p>
          <p><strong>Date:</strong> {item.updatedAt?.slice(0, 10)}</p>
          <p><strong>Time:</strong> {item.updatedAt?.slice(11, 16)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Bookings</h1>

      {/* Refresh Button */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <button
          onClick={() => fetchAppointments()}
          className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center gap-2"
        >
          Refresh
          {loading && <Loader2 className="animate-spin mx-auto" size={20} />}
        </button>
        <p className=" ">Total Booking  <span className=" text-purple-900">{emergencies.length + appointments.length}</span></p>
      </div>

      {/* Emergency Cards */}
      <div className="grid grid-cols-1  gap-4">
        {emergencies.length === 0 && !loading && (
          <p className="text-gray-600 col-span-full">No emergencies found.</p>
        )}
        {emergencies?.map(renderCard)}
      </div>

      {/* Appointments Cards */}
      <div className="grid grid-cols-1  gap-4 mt-6">
        {appointments.length === 0 && !loading && (
          <p className="text-gray-600 col-span-full">No appointments found.</p>
        )}
        {appointments?.map(renderCard)}
      </div>
    </div>
  );
};

export default AppointmentsPage;
