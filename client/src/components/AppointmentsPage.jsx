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

  // ✅ Helper function to format date & time
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/finances/allbookings`,
        { withCredentials: true }
      );
      
      setAppointments(response?. data?.data?. appointments || []);
      setEmergencies(response?.data?.data?.emergencies || []);
      
      console.log('✅ Completed Appointments:', response?. data?.data?.appointments?. length || 0);
      console.log('✅ Completed Emergencies:', response?.data?.data?. emergencies?.length || 0);
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

  // ✅ Render card with color coding based on service type
  const renderCard = (item, isEmergency = false) => {
    const isExpanded = expandedId === item._id;

    // ✅ Background color based on service type
    const cardBgColor = isEmergency 
      ? 'bg-red-50 border-red-200 hover:bg-red-100' 
      : 'bg-blue-50 border-blue-200 hover:bg-blue-100';

    return (
      <div
        key={item._id}
        className={`border-2 shadow-sm rounded-lg p-4 relative duration-300 ease-in-out transition-all ${cardBgColor} ${
          isExpanded ? 'h-full overflow-hidden' : 'h-28 md:h-20 overflow-hidden'
        }`}
      >
        <button
          onClick={() => viewDetail(item._id)}
          className="cursor-pointer absolute right-5 bottom-2 md:bottom-0"
        >
          <ChevronDown className={` transition-transform duration-300 ${isExpanded ?  'rotate-180' : ''}`} />
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4">
          <div className="flex-1">
            <h2 className="font-bold text-md md:text-lg">
              Client: <span className="capitalize font-medium">{item.name}</span>
            </h2>
            <p className="font-medium text-sm md:text-base flex items-center gap-2">
              Service Category: 
              <span className={`capitalize font-semibold ${isEmergency ? 'text-red-700' : 'text-blue-700'}`}>
                {isEmergency ? '🚨 Emergency' : '📅 Doorstep'}
              </span>
            </p>
          </div>

          {item.assignedMechanic && (
            <div className="flex flex-col md:flex-row items-start md:items-center lg:gap-4">
              <h2 className="text-sm md:text-base">Assigned Mechanic:  {item.assignedMechanic. name}</h2>
              <a href={`tel:${item.assignedMechanic.phone}`} className="text-sm md:text-base text-blue-700 hover:underline">
               Mechanic Contact: {item.assignedMechanic.phone}
              </a>
            </div>
          )}

          <span className="text-xs md:text-sm px-3 py-1 rounded-full font-medium bg-green-200 text-green-700">
            COMPLETED
          </span>
        </div>

        {/* ✅ Expanded Details */}
        <div className="mt-3 text-sm md:text-base text-gray-700 space-y-1">
          <p><strong>Phone:</strong> {item.phone}</p>
          <p><strong>Location:</strong> {item.location || item.address}</p>
          <p><strong>Bike Model:</strong> {item.bikeModel}</p>
          
          {/* Issue Description (for emergencies only) */}
          {isEmergency && item.issueDescription && (
            <div className="mt-2 p-2 bg-red-100 rounded border border-red-300">
              <p className="text-xs font-semibold text-red-700">🚨 Emergency Issue: </p>
              <p className="text-sm text-red-900">{item.issueDescription}</p>
            </div>
          )}
          
          {/* Service Type (for appointments only) */}
          {!isEmergency && item.serviceType && (
            <div className="mt-2">
              <p className="text-xs text-gray-500">Service Type:</p>
              <p className="text-sm font-medium text-blue-800">{item.serviceType}</p>
            </div>
          )}
          
          {/* ✅ Booking Time Display */}
          <div className="mt-3 p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border-l-4 border-blue-500">
            <p className="text-xs font-semibold text-blue-700 flex items-center gap-1">
              <span>⏰</span> Booking Time: 
            </p>
            <p className="text-base font-bold text-blue-900 mt-1">
              {formatDateTime(item. createdAt)}
            </p>
          </div>
          
          {/* ✅ Completed Time Display */}
          {item.completedAt ?  (
            <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
              <p className="text-xs font-semibold text-green-700 flex items-center gap-1">
                <span>✅</span> Completed Time: 
              </p>
              <p className="text-base font-bold text-green-900 mt-1">
                {formatDateTime(item.completedAt)}
              </p>
            </div>
          ) : (
            <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
              <p className="text-xs text-red-600">⚠️ Status is completed but completedAt is missing</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ✅ Combine and sort all bookings by completedAt (latest first)
  const getAllBookings = () => {
    const emergencyBookings = emergencies.map(e => ({ ...e, isEmergency: true }));
    const appointmentBookings = appointments.map(a => ({ ...a, isEmergency: false }));
    
    const combined = [...emergencyBookings, ... appointmentBookings];
    
    // Sort by completedAt (latest first), then by createdAt
    return combined.sort((a, b) => {
      if (a.completedAt && b.completedAt) {
        return new Date(b.completedAt) - new Date(a.completedAt);
      }
      if (a.completedAt && !b.completedAt) return -1;
      if (!a.completedAt && b.completedAt) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const allBookings = getAllBookings();

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Completed Bookings</h1>

      {/* Refresh Button & Stats */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <button
          onClick={() => fetchAppointments()}
          className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center gap-2 hover:bg-gray-900 transition-colors"
        >
          Refresh
          {loading && <Loader2 className="animate-spin mx-auto" size={20} />}
        </button>
        <p className="text-base">
          Total Completed:  <span className="text-purple-900 font-bold">{allBookings.length}</span>
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-200 rounded"></span>
            Emergencies: <span className="font-semibold text-red-600">{emergencies?. length}</span>
          </span>
          | 
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-200 rounded"></span>
            Appointments: <span className="font-semibold text-blue-600">{appointments?.length}</span>
          </span>
        </p>
      </div>

      {/* ✅ Combined List - Sorted by Completed Time */}
      <div className="grid grid-cols-1 gap-4">
        {allBookings.map(booking => renderCard(booking, booking.isEmergency))}

        {/* Empty State */}
        {allBookings.length === 0 && ! loading && (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Completed Bookings</h3>
            <p className="text-gray-600">Completed bookings will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;