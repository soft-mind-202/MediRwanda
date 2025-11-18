import React, { useState, useEffect } from 'react';
import { 
  Activity, Users, FileBarChart, TrendingUp, AlertTriangle, 
  DollarSign, Pill, Truck, Phone, MapPin, Clock, CheckCircle,
  XCircle, Package, Stethoscope, Building2, UserCheck, Shield,
  Database, Zap, Bell, Download, Filter, Search, Calendar,
  BarChart3, PieChart, LineChart, ArrowUpRight, ArrowDownRight,
  Eye, Settings, RefreshCw, AlertCircle, ChevronDown, ChevronRight,
  Globe, Wifi, WifiOff, Server, HardDrive, Cpu
} from 'lucide-react';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStatus, setSystemStatus] = useState({
    api: 'operational',
    database: 'operational',
    payments: 'operational',
    notifications: 'degraded'
  });

  // Simulated real-time data
  const [realtimeStats, setRealtimeStats] = useState({
    activeConsultations: 24,
    pendingPrescriptions: 67,
    activeDeliveries: 43,
    onlineDoctors: 156,
    systemUptime: 99.97
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealtimeStats(prev => ({
        ...prev,
        activeConsultations: Math.max(10, prev.activeConsultations + Math.floor(Math.random() * 5) - 2),
        pendingPrescriptions: Math.max(30, prev.pendingPrescriptions + Math.floor(Math.random() * 10) - 5),
        activeDeliveries: Math.max(20, prev.activeDeliveries + Math.floor(Math.random() * 6) - 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: '458.2M RWF',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      subtext: 'vs last month'
    },
    {
      title: 'Active Patients',
      value: '127,456',
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      subtext: 'Registered users'
    },
    {
      title: 'Consultations Today',
      value: '2,847',
      change: '+15.2%',
      trend: 'up',
      icon: Stethoscope,
      color: 'from-purple-500 to-pink-600',
      subtext: realtimeStats.activeConsultations + ' ongoing'
    },
    {
      title: 'Prescriptions Filled',
      value: '8,923',
      change: '+5.4%',
      trend: 'up',
      icon: Pill,
      color: 'from-orange-500 to-red-600',
      subtext: realtimeStats.pendingPrescriptions + ' pending'
    },
    {
      title: 'Deliveries Complete',
      value: '7,654',
      change: '+9.8%',
      trend: 'up',
      icon: Truck,
      color: 'from-teal-500 to-green-600',
      subtext: realtimeStats.activeDeliveries + ' in transit'
    },
    {
      title: 'Insurance Claims',
      value: '6,789',
      change: '-2.1%',
      trend: 'down',
      icon: Shield,
      color: 'from-indigo-500 to-blue-600',
      subtext: '98.3% approved'
    }
  ];

  const systemHealthMetrics = [
    { name: 'API Gateway', status: systemStatus.api, uptime: '99.98%', latency: '45ms' },
    { name: 'Database (MariaDB)', status: systemStatus.database, uptime: '99.99%', latency: '12ms' },
    { name: 'Redis Cache', status: 'operational', uptime: '99.95%', latency: '3ms' },
    { name: 'Payment Gateway', status: systemStatus.payments, uptime: '99.87%', latency: '234ms' },
    { name: 'SMS Service', status: systemStatus.notifications, uptime: '98.76%', latency: '1.2s' },
    { name: 'WebRTC Signaling', status: 'operational', uptime: '99.94%', latency: '67ms' }
  ];

  const geographicData = [
    { district: 'Kigali', consultations: 1247, revenue: '125.4M', growth: '+12%' },
    { district: 'Huye', consultations: 456, revenue: '45.6M', growth: '+18%' },
    { district: 'Musanze', consultations: 389, revenue: '38.9M', growth: '+9%' },
    { district: 'Rubavu', consultations: 312, revenue: '31.2M', growth: '+15%' },
    { district: 'Muhanga', consultations: 278, revenue: '27.8M', growth: '+7%' }
  ];

  const recentAlerts = [
    { type: 'warning', message: 'SMS delivery rate dropped to 92%', time: '5 mins ago', severity: 'medium' },
    { type: 'info', message: 'Database backup completed successfully', time: '1 hour ago', severity: 'low' },
    { type: 'critical', message: 'High API latency detected in Rubavu region', time: '2 hours ago', severity: 'high' },
    { type: 'success', message: 'System update deployed successfully', time: '3 hours ago', severity: 'low' }
  ];

  const topDoctors = [
    { name: 'Dr. Uwase Marie', consultations: 234, rating: 4.9, specialty: 'General Practice' },
    { name: 'Dr. Mugisha Jean', consultations: 198, rating: 4.8, specialty: 'Pediatrics' },
    { name: 'Dr. Ingabire Grace', consultations: 187, rating: 4.9, specialty: 'Internal Medicine' },
    { name: 'Dr. Nkusi Paul', consultations: 176, rating: 4.7, specialty: 'Cardiology' },
    { name: 'Dr. Habimana Eric', consultations: 165, rating: 4.8, specialty: 'Dermatology' }
  ];

  const insuranceMetrics = [
    { insurer: 'Mutuelle de Santé', claims: 4567, approved: 4489, amount: '345.6M', approval_rate: '98.3%' },
    { insurer: 'RSSB', claims: 1234, approved: 1198, amount: '89.4M', approval_rate: '97.1%' },
    { insurer: 'MMI', claims: 567, approved: 551, amount: '45.2M', approval_rate: '97.2%' },
    { insurer: 'Radiant', claims: 421, approved: 405, amount: '32.8M', approval_rate: '96.2%' }
  ];

  const StatusBadge = ({ status }) => {
    const styles = {
      operational: 'bg-green-500/20 text-green-400 border-green-500/30',
      degraded: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      outage: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              MediLink Rwanda Admin
            </h1>
            <p className="text-slate-400 mt-1">Real-time system monitoring & analytics</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            
            <button className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm hover:bg-slate-750 transition flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            
            <button 
              onClick={() => setIsLoading(true)}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm transition flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">System Operational</span>
              </div>
              <div className="h-4 w-px bg-slate-600"></div>
              <span className="text-sm text-slate-400">Uptime: {realtimeStats.systemUptime}%</span>
              <span className="text-sm text-slate-400">•</span>
              <span className="text-sm text-slate-400">Last updated: Just now</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white transition" />
              <Settings className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white transition" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-700">
          {['overview', 'analytics', 'users', 'system', 'geography', 'insurance'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition ${
                activeTab === tab 
                  ? 'text-blue-400 border-b-2 border-blue-400' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {kpiCards.map((kpi, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 transition group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${kpi.color}`}>
                      <kpi.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {kpi.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {kpi.change}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-1">{kpi.value}</h3>
                  <p className="text-sm text-slate-400">{kpi.title}</p>
                  <p className="text-xs text-slate-500 mt-2">{kpi.subtext}</p>
                </div>
              ))}
            </div>

            {/* Charts and Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Activity */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Live Activity Feed</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Live
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { action: 'New consultation started', user: 'Dr. Uwase Marie', time: '2 sec ago', type: 'consultation' },
                    { action: 'Prescription filled', user: 'Pharmacy Kigali Central', time: '15 sec ago', type: 'prescription' },
                    { action: 'Delivery completed', user: 'Agent #4521', time: '45 sec ago', type: 'delivery' },
                    { action: 'Insurance claim approved', user: 'NHIS System', time: '1 min ago', type: 'insurance' },
                    { action: 'New patient registered', user: 'Patient #12457', time: '2 min ago', type: 'user' }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${
                        activity.type === 'consultation' ? 'bg-purple-400' :
                        activity.type === 'prescription' ? 'bg-orange-400' :
                        activity.type === 'delivery' ? 'bg-teal-400' :
                        activity.type === 'insurance' ? 'bg-blue-400' : 'bg-green-400'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-slate-400">{activity.user}</p>
                      </div>
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Doctors */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Top Performing Doctors</h3>
                
                <div className="space-y-3">
                  {topDoctors.map((doctor, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{doctor.name}</p>
                        <p className="text-xs text-slate-400">{doctor.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{doctor.consultations}</p>
                        <div className="flex items-center gap-1 text-xs text-yellow-400">
                          ⭐ {doctor.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">System Alerts & Notifications</h3>
                <button className="text-xs text-blue-400 hover:underline">View All</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recentAlerts.map((alert, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border ${
                    alert.severity === 'high' ? 'bg-red-500/10 border-red-500/30' :
                    alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                    'bg-blue-500/10 border-blue-500/30'
                  }`}>
                    <div className="flex items-start gap-3">
                      {alert.severity === 'high' ? <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" /> :
                       alert.severity === 'medium' ? <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" /> :
                       <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Services */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-400" />
                  System Services Status
                </h3>
                
                <div className="space-y-3">
                  {systemHealthMetrics.map((service, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{service.name}</span>
                        <StatusBadge status={service.status} />
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Uptime</span>
                          <p className="font-semibold text-green-400">{service.uptime}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Latency</span>
                          <p className="font-semibold">{service.latency}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Status</span>
                          <p className="font-semibold capitalize">{service.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource Usage */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  Server Resource Usage
                </h3>
                
                <div className="space-y-4">
                  {[
                    { label: 'CPU Usage', value: 34, max: 100, color: 'bg-blue-500' },
                    { label: 'Memory', value: 68, max: 100, color: 'bg-purple-500' },
                    { label: 'Disk Space', value: 45, max: 100, color: 'bg-green-500' },
                    { label: 'Network I/O', value: 23, max: 100, color: 'bg-orange-500' }
                  ].map((resource, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">{resource.label}</span>
                        <span className="font-semibold">{resource.value}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${resource.color} transition-all duration-500`}
                          style={{ width: `${resource.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h4 className="font-medium mb-3">Database Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-400">Total Connections</p>
                      <p className="text-xl font-bold">234</p>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-400">Queries/sec</p>
                      <p className="text-xl font-bold">1,847</p>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-400">Cache Hit Rate</p>
                      <p className="text-xl font-bold">98.7%</p>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-400">Storage Used</p>
                      <p className="text-xl font-bold">234 GB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Geography Tab */}
        {activeTab === 'geography' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              Geographic Distribution
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-slate-700">
                    <th className="pb-3 font-medium text-slate-400">District</th>
                    <th className="pb-3 font-medium text-slate-400">Consultations</th>
                    <th className="pb-3 font-medium text-slate-400">Revenue</th>
                    <th className="pb-3 font-medium text-slate-400">Growth</th>
                    <th className="pb-3 font-medium text-slate-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {geographicData.map((district, idx) => (
                    <tr key={idx} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="py-4 font-medium">{district.district}</td>
                      <td className="py-4">{district.consultations.toLocaleString()}</td>
                      <td className="py-4">{district.revenue}</td>
                      <td className="py-4">
                        <span className="text-green-400 flex items-center gap-1">
                          <ArrowUpRight className="w-4 h-4" />
                          {district.growth}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-blue-400 hover:underline text-sm flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Insurance Tab */}
        {activeTab === 'insurance' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              Insurance Claims Performance
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-slate-700">
                    <th className="pb-3 font-medium text-slate-400">Insurer</th>
                    <th className="pb-3 font-medium text-slate-400">Total Claims</th>
                    <th className="pb-3 font-medium text-slate-400">Approved</th>
                    <th className="pb-3 font-medium text-slate-400">Amount</th>
                    <th className="pb-3 font-medium text-slate-400">Approval Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {insuranceMetrics.map((insurer, idx) => (
                    <tr key={idx} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="py-4 font-medium">{insurer.insurer}</td>
                      <td className="py-4">{insurer.claims.toLocaleString()}</td>
                      <td className="py-4 text-green-400">{insurer.approved.toLocaleString()}</td>
                      <td className="py-4">{insurer.amount}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-green-500"
                              style={{ width: insurer.approval_rate }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{insurer.approval_rate}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}