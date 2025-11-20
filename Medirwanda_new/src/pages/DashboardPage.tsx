import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useAuthStore } from '@store/auth.store';
import { authService } from '@services/auth.service';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  Users, Calendar, Pill, TrendingUp, Activity, Bell, Search,
  Menu, X, Home, User, Settings, LogOut, Plus, Filter,
  Clock, CheckCircle, AlertCircle, BarChart3, PieChart as PieChartIcon,
  CalendarDays, FileText, Phone, MapPin, Star
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [patientProfile, setPatientProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const recentActivities = [
    { id: 1, type: 'consultation', message: 'Dr. Niyonsenga completed consultation with Patient ID: 12345', time: '2 minutes ago', status: 'completed' },
    { id: 2, type: 'prescription', message: 'Prescription filled for Malaria medication', time: '15 minutes ago', status: 'completed' },
    { id: 3, type: 'appointment', message: 'New appointment scheduled for tomorrow at 10:00 AM', time: '1 hour ago', status: 'scheduled' },
    { id: 4, type: 'alert', message: 'Low stock alert: Paracetamol 500mg', time: '2 hours ago', status: 'warning' },
    { id: 5, type: 'payment', message: 'Insurance claim approved for RWF 15,000', time: '3 hours ago', status: 'completed' },
  ];

  const [liveActivities, setLiveActivities] = useState(recentActivities);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.id) {
          const [userProfileResponse, patientProfileResponse] = await Promise.all([
            authService.getUserProfile(user.id),
            user.role === 'PATIENT' ? authService.getPatientProfile(user.id) : Promise.resolve(null)
          ]);

          setUserProfile(userProfileResponse.data);
          if (patientProfileResponse) {
            setPatientProfile(patientProfileResponse.data);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Simulate real-time activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivities = [
        {
          id: Date.now(),
          type: 'consultation',
          message: `Dr. ${['Niyonsenga', 'Uwimana', 'Mukamana', 'Kagame'][Math.floor(Math.random() * 4)]} started consultation with Patient ID: ${Math.floor(Math.random() * 10000)}`,
          time: 'Just now',
          status: 'completed'
        },
        ...liveActivities.slice(0, 4)
      ];
      setLiveActivities(newActivities);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [liveActivities]);

  // Mock data for charts and analytics
  const consultationData = [
    { month: 'Jan', consultations: 45, completed: 42, cancelled: 3 },
    { month: 'Feb', consultations: 52, completed: 48, cancelled: 4 },
    { month: 'Mar', consultations: 48, completed: 45, cancelled: 3 },
    { month: 'Apr', consultations: 61, completed: 58, cancelled: 3 },
    { month: 'May', consultations: 55, completed: 52, cancelled: 3 },
    { month: 'Jun', consultations: 67, completed: 63, cancelled: 4 },
  ];

  const patientStats = [
    { name: 'Active Patients', value: 1247, color: '#3B82F6' },
    { name: 'New This Month', value: 89, color: '#10B981' },
    { name: 'Consultations Today', value: 23, color: '#F59E0B' },
    { name: 'Pending Reviews', value: 12, color: '#EF4444' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, consultations: 45 },
    { month: 'Feb', revenue: 52000, consultations: 52 },
    { month: 'Mar', revenue: 48000, consultations: 48 },
    { month: 'Apr', revenue: 61000, consultations: 61 },
    { month: 'May', revenue: 55000, consultations: 55 },
    { month: 'Jun', revenue: 67000, consultations: 67 },
  ];

  const specialtyData = [
    { name: 'General Medicine', value: 35, color: '#3B82F6' },
    { name: 'Pediatrics', value: 25, color: '#10B981' },
    { name: 'Cardiology', value: 15, color: '#F59E0B' },
    { name: 'Dermatology', value: 10, color: '#EF4444' },
    { name: 'Orthopedics', value: 15, color: '#8B5CF6' },
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'consultations', label: 'Consultations', icon: Calendar },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const getRoleBasedActions = () => {
    const role = user?.role || 'PATIENT';

    switch (role) {
      case 'PATIENT':
        return [
          { title: "Book Appointment", description: "Schedule a consultation", icon: Calendar, color: "text-blue-600 border-blue-200" },
          { title: "View Records", description: "Access medical history", icon: FileText, color: "text-green-600 border-green-200" },
          { title: "Refill Prescription", description: "Request medication refill", icon: Pill, color: "text-purple-600 border-purple-200" },
          { title: "Emergency", description: "24/7 emergency contact", icon: Phone, color: "text-red-600 border-red-200" },
        ];
      case 'DOCTOR':
        return [
          { title: "New Consultation", description: "Start patient consultation", icon: Users, color: "text-blue-600 border-blue-200" },
          { title: "Review Cases", description: "Check pending reviews", icon: FileText, color: "text-green-600 border-green-200" },
          { title: "Prescribe", description: "Write prescriptions", icon: Pill, color: "text-purple-600 border-purple-200" },
          { title: "Schedule", description: "Manage availability", icon: Calendar, color: "text-orange-600 border-orange-200" },
        ];
      case 'PHARMACIST':
        return [
          { title: "Dispense", description: "Fill prescriptions", icon: Pill, color: "text-blue-600 border-blue-200" },
          { title: "Inventory", description: "Check stock levels", icon: TrendingUp, color: "text-green-600 border-green-200" },
          { title: "Verify", description: "Verify prescriptions", icon: CheckCircle, color: "text-purple-600 border-purple-200" },
          { title: "Reports", description: "Generate reports", icon: FileText, color: "text-orange-600 border-orange-200" },
        ];
      case 'SUPER_ADMIN':
      case 'MOH_ADMIN':
        return [
          { title: "User Management", description: "Manage system users", icon: Users, color: "text-blue-600 border-blue-200" },
          { title: "System Health", description: "Monitor platform status", icon: Activity, color: "text-green-600 border-green-200" },
          { title: "Reports", description: "Generate analytics", icon: BarChart3, color: "text-purple-600 border-purple-200" },
          { title: "Settings", description: "Configure system", icon: Settings, color: "text-orange-600 border-orange-200" },
        ];
      default:
        return [
          { title: "Schedule Consultation", description: "Book an appointment", icon: Calendar, color: "text-blue-600 border-blue-200" },
          { title: "View History", description: "Check medical records", icon: FileText, color: "text-green-600 border-green-200" },
          { title: "Contact Support", description: "Get help", icon: Phone, color: "text-purple-600 border-purple-200" },
          { title: "Settings", description: "Manage account", icon: Settings, color: "text-orange-600 border-orange-200" },
        ];
    }
  };

  const renderOverview = () => {
    const getRoleBasedStats = () => {
      const role = user?.role || 'PATIENT';

      switch (role) {
        case 'PATIENT':
          return [
            { title: "My Appointments", value: "3", change: 0, icon: Calendar, color: "bg-blue-500" },
            { title: "Active Prescriptions", value: "2", change: 0, icon: Pill, color: "bg-green-500" },
            { title: "Medical Records", value: "12", change: 25, icon: FileText, color: "bg-purple-500" },
            { title: "Health Score", value: "85%", change: 5, icon: Activity, color: "bg-orange-500" },
          ];
        case 'DOCTOR':
          return [
            { title: "Today's Patients", value: "23", change: 8.2, icon: Users, color: "bg-blue-500" },
            { title: "Consultations", value: "156", change: 12.5, icon: Calendar, color: "bg-green-500" },
            { title: "Pending Reviews", value: "8", change: -15, icon: FileText, color: "bg-purple-500" },
            { title: "Patient Satisfaction", value: "4.8", change: 2.1, icon: Star, color: "bg-orange-500" },
          ];
        case 'PHARMACIST':
          return [
            { title: "Prescriptions Today", value: "45", change: 10.5, icon: Pill, color: "bg-blue-500" },
            { title: "Inventory Alerts", value: "3", change: -25, icon: AlertCircle, color: "bg-red-500" },
            { title: "Revenue Today", value: "RWF 23K", change: 8.7, icon: TrendingUp, color: "bg-green-500" },
            { title: "Customer Satisfaction", value: "4.6", change: 1.8, icon: Star, color: "bg-purple-500" },
          ];
        case 'SUPER_ADMIN':
        case 'MOH_ADMIN':
          return [
            { title: "Total Patients", value: "1,247", change: 12.5, icon: Users, color: "bg-blue-500" },
            { title: "Active Doctors", value: "45", change: 5.2, icon: Calendar, color: "bg-green-500" },
            { title: "System Revenue", value: "RWF 67K", change: 15.3, icon: TrendingUp, color: "bg-purple-500" },
            { title: "Platform Health", value: "98.5%", change: 0.5, icon: Activity, color: "bg-orange-500" },
          ];
        default:
          return [
            { title: "Total Patients", value: "1,247", change: 12.5, icon: Users, color: "bg-blue-500" },
            { title: "Consultations Today", value: "23", change: 8.2, icon: Calendar, color: "bg-green-500" },
            { title: "Revenue This Month", value: "RWF 67K", change: 15.3, icon: TrendingUp, color: "bg-purple-500" },
            { title: "Active Prescriptions", value: "156", change: -2.1, icon: Pill, color: "bg-orange-500" },
          ];
      }
    };

    const roleBasedStats = getRoleBasedStats();

    return (
      <div className="space-y-6">
        {/* Role-based Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleBasedStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Role-based Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getRoleBasedActions().map((action, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg border-2 border-dashed ${action.color} hover:shadow-md transition-all text-left`}
              >
                <action.icon className="w-6 h-6 mb-2" />
                <div className="text-sm font-medium">{action.title}</div>
                <div className="text-xs text-gray-600 mt-1">{action.description}</div>
              </button>
            ))}
          </div>
        </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultation Trends */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={consultationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="consultations" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="completed" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Specialty Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultations by Specialty</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={specialtyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {specialtyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Live Activity Feed</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>
        <div className="space-y-4">
          {liveActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {activity.status === 'completed' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                   activity.status === 'warning' ? <AlertCircle className="w-4 h-4 text-yellow-600" /> :
                   <Clock className="w-4 h-4 text-blue-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`RWF ${value.toLocaleString()}`, 'Revenue']} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Satisfaction</h3>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">4.8</div>
              <div className="flex items-center justify-center mt-2">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">Based on 342 reviews</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Wait Time</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">12</div>
            <p className="text-sm text-gray-600">minutes</p>
            <p className="text-xs text-green-600 mt-2">↓ 8% from last month</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Success Rate</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">96.2%</div>
            <p className="text-sm text-gray-600">success rate</p>
            <p className="text-xs text-green-600 mt-2">↑ 2.1% from last month</p>
          </div>
        </div>
      </div>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
          <p className="text-sm text-gray-600">System Uptime</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: '98.5%'}}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">2.3s</div>
          <p className="text-sm text-gray-600">Avg Response Time</p>
          <p className="text-xs text-green-600 mt-1">↓ 12% improvement</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
          <p className="text-sm text-gray-600">Support Availability</p>
          <p className="text-xs text-purple-600 mt-1">Always online</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">99.2%</div>
          <p className="text-sm text-gray-600">Data Accuracy</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{width: '99.2%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatientsPage = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Patient Dashboard</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus className="w-4 h-4 inline mr-2" />
            New Patient
          </button>
        </div>

        {/* Patient Profile Card */}
        {patientProfile && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Full Name:</span> {userProfile?.fullName}</p>
                <p><span className="font-medium">National ID:</span> {userProfile?.nationalId}</p>
                <p><span className="font-medium">Phone:</span> {userProfile?.phone}</p>
                <p><span className="font-medium">Email:</span> {userProfile?.email}</p>
                <p><span className="font-medium">Date of Birth:</span> {userProfile?.dateOfBirth ? new Date(userProfile.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                <p><span className="font-medium">Gender:</span> {userProfile?.gender}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Blood Type:</span> {patientProfile.bloodType || 'Not specified'}</p>
                <p><span className="font-medium">Height:</span> {patientProfile.heightCm ? `${patientProfile.heightCm} cm` : 'Not specified'}</p>
                <p><span className="font-medium">Weight:</span> {patientProfile.weightKg ? `${patientProfile.weightKg} kg` : 'Not specified'}</p>
                <p><span className="font-medium">Preferred Language:</span> {patientProfile.preferredLanguage}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Insurance & Status</h4>
              <div className="space-y-2">
                <p><span className="font-medium">NHIS Member ID:</span> {patientProfile.nhisMemberId || 'Not enrolled'}</p>
                <p><span className="font-medium">NHIS Category:</span> {patientProfile.nhisCategory || 'N/A'}</p>
                <p><span className="font-medium">Account Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${userProfile?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </p>
                <p><span className="font-medium">Verification:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${userProfile?.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {userProfile?.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Consultations */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Consultations</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">General Checkup</p>
                <p className="text-sm text-gray-600">Dr. Niyonsenga - Feb 15, 2024</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Blood Pressure Monitoring</p>
                <p className="text-sm text-gray-600">Dr. Uwimana - Jan 28, 2024</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scheduled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsultationsPage = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Management</h3>
        <p className="text-gray-600">Consultation management features coming soon...</p>
      </div>
    </div>
  );

  const renderPharmacyPage = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pharmacy Management</h3>
        <p className="text-gray-600">Pharmacy management features coming soon...</p>
      </div>
    </div>
  );

  const renderReportsPage = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports & Analytics</h3>
        <p className="text-gray-600">Advanced reporting features coming soon...</p>
      </div>
    </div>
  );

  const renderSettingsPage = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
        <p className="text-gray-600">Settings and preferences coming soon...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col`}>
        <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <h1 className="text-xl font-bold text-white">MediRwanda</h1>
        </div>

        <nav className="mt-8 px-4 flex-1">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="ml-4 lg:ml-0">
                <h2 className="text-2xl font-semibold text-gray-900 capitalize">{activeTab}</h2>
                <p className="text-sm text-gray-600">Welcome back, {userProfile?.fullName || user?.fullName || 'User'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userProfile?.fullName || user?.fullName || 'User'}</p>
                  <p className="text-xs text-gray-500">{userProfile?.role || user?.role || 'PATIENT'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'patients' && renderPatientsPage()}
              {activeTab === 'consultations' && renderConsultationsPage()}
              {activeTab === 'pharmacy' && renderPharmacyPage()}
              {activeTab === 'analytics' && renderAnalytics()}
              {activeTab === 'reports' && renderReportsPage()}
              {activeTab === 'settings' && renderSettingsPage()}
            </>
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
