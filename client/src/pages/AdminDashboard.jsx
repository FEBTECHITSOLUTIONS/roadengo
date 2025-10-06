import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');
  const [stats, setStats] = useState({
    appointments: 0,
    emergencies: 0,
    inquiries: 0,
    pending: 0,
    urgent: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchAppointments();
    fetchEmergencies();
    fetchInquiries();
    fetchStats();
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://roadengo.parrotconsult.com/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchEmergencies = async () => {
    try {
      const response = await fetch('http://roadengo.parrotconsult.com/api/emergency');
      const data = await response.json();
      setEmergencies(data);
    } catch (error) {
      console.error('Error fetching emergencies:', error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const response = await fetch('http://roadengo.parrotconsult.com/api/inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://roadengo.parrotconsult.com/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      await fetch(`http://roadengo.parrotconsult.com/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchAppointments();
      fetchStats();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      await fetch(`http://roadengo.parrotconsult.com/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchInquiries();
      fetchStats();
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🏍️ RoadEngo Admin</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View Website
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Appointments</h3>
            <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Emergency Requests</h3>
            <p className="text-3xl font-bold text-red-600">{emergencies.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Cart Inquiries</h3>
            <p className="text-3xl font-bold text-green-600">{inquiries.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Pending Appointments</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {appointments.filter(apt => apt.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Urgent Cases</h3>
            <p className="text-3xl font-bold text-orange-600">
              {emergencies.filter(em => em.urgencyLevel === 'high').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === 'appointments' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Appointments ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab('emergencies')}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === 'emergencies' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Emergencies ({emergencies.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-6 py-3 rounded-lg font-semibold ${
                activeTab === 'inquiries' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cart Inquiries ({inquiries.length})
            </button>
          </nav>
        </div>

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-semibold text-gray-900">{appointment.name}</div>
                          <div className="text-sm text-gray-600">{appointment.phone}</div>
                          <div className="text-sm text-gray-500">{appointment.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{appointment.serviceType}</div>
                          <div className="text-sm text-gray-600">{appointment.bikeModel}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{appointment.address}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(appointment.serviceDate)}
                          </div>
                          <div className="text-sm text-gray-600">{appointment.serviceTime}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          appointment.status === 'in-progress' ? 'bg-purple-100 text-purple-800' :
                          appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={appointment.status}
                          onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {appointments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No appointments found
              </div>
            )}
          </div>
        )}

        {/* Emergencies Tab */}
        {activeTab === 'emergencies' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issue Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {emergencies.map((emergency) => (
                    <tr key={emergency._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-semibold text-gray-900">{emergency.name}</div>
                          <div className="text-sm text-gray-600">{emergency.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{emergency.bikeModel}</div>
                          <div className="text-sm text-gray-600 max-w-xs truncate">{emergency.issueDescription}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{emergency.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          emergency.urgencyLevel === 'high' ? 'bg-red-100 text-red-800' :
                          emergency.urgencyLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {emergency.urgencyLevel.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(emergency.requestTime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {emergencies.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No emergency requests found
              </div>
            )}
          </div>
        )}

        {/* Cart Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cart Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-semibold text-gray-900">{inquiry.name}</div>
                          <div className="text-sm text-gray-600">{inquiry.phone}</div>
                          <div className="text-sm text-gray-500">{inquiry.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {inquiry.itemCount} items
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            {inquiry.cartItems && inquiry.cartItems.slice(0, 3).map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="truncate mr-2">{item.name}</span>
                                <span>x{item.quantity}</span>
                              </div>
                            ))}
                            {inquiry.cartItems && inquiry.cartItems.length > 3 && (
                              <div className="text-gray-500">
                                +{inquiry.cartItems.length - 3} more items...
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-green-600">
                          ₹{inquiry.totalAmount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                          inquiry.status === 'quoted' ? 'bg-purple-100 text-purple-800' :
                          inquiry.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(inquiry.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <select
                            value={inquiry.status}
                            onChange={(e) => updateInquiryStatus(inquiry._id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => {
                              const details = `
Customer: ${inquiry.name}
Phone: ${inquiry.phone}
Email: ${inquiry.email}
Address: ${inquiry.address}
${inquiry.message ? 'Message: ' + inquiry.message : ''}

Cart Items:
${inquiry.cartItems.map(item => `- ${item.name} (${item.brand}) x${item.quantity} = ${item.price}`).join('\n')}

Total: ₹${inquiry.totalAmount}
                              `.trim();
                              alert(details);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {inquiries.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No cart inquiries found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
