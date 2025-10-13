import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit2, Loader, Filter, Download, Eye } from 'lucide-react';
import { useGetAllIssue } from '../../../api/client/issue';



const statusColors = {
  'Open': 'bg-red-100 text-red-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Closed': 'bg-green-100 text-green-800',
  'On Hold': 'bg-gray-100 text-gray-800'
};

const priorityColors = {
  'High': 'bg-red-100 text-red-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'Low': 'bg-green-100 text-green-800'
};

const categoryBgColors = {
  'Bug': 'bg-purple-100 text-purple-800',
  'Feature': 'bg-blue-100 text-blue-800',
  'Enhancement': 'bg-indigo-100 text-indigo-800'
};

export default function Reports() {
  const [params, setParams] = useState({ search: '', status: '', priority: '', page: 1 });

  const [viewingId, setViewingId] = useState(null);

  const { data: issues = [], totalPages, isLoading, error } = useGetAllIssue(params);
  console.log(issues);

  const viewingIssue = issues.find(i => i.id === viewingId);

  const handleSearch = (e) => {
    setParams({ ...params, search: e.target.value, page: 1 });
  };

  const handleFilterChange = (filterType, value) => {
    setParams({ ...params, [filterType]: value, page: 1 });
  };





  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading reports: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600">Track and manage all issues and reports</p>
          </div>
          
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or description..."
                value={params.search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          
          </div>

          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={params.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <select
              value={params.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

    
        {/* View Details Modal */}
     {viewingId && viewingIssue && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-2xl transform transition-all duration-300 scale-100 hover:scale-[1.01]">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {viewingIssue.id} — {viewingIssue.fullName}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{viewingIssue.email}</p>
        </div>
        <button
          onClick={() => setViewingId(null)}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
            categoryBgColors[viewingIssue.category] || "bg-gray-100 text-gray-700"
          }`}
        >
          {viewingIssue.category}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[viewingIssue.status]}`}
        >
          {viewingIssue.status}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${priorityColors[viewingIssue.priority]}`}
        >
          {viewingIssue.priority} Priority
        </span>
      </div>

      {/* Description */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-600 font-semibold mb-2">Description</p>
        <p className="text-gray-800 leading-relaxed">
          {viewingIssue.description}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
        <div>
          <p className="text-sm text-gray-500">Issue Type</p>
          <p className="text-gray-900 font-medium">{viewingIssue.issueType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">User Role</p>
          <p className="text-gray-900 font-medium">{viewingIssue.userRole}</p>
        </div>
      
      </div>

      {/* Footer */}
      <button
        onClick={() => setViewingId(null)}
        className="w-full mt-6 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
      >
        Close
      </button>
    </div>
  </div>
)}


        {/* Issues Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
          ) : issues.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg">No issues found</p>
              <p className="text-sm mt-1">Create your first issue to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Priority</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {issues.map(issue => (
                    <tr key={issue.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{issue.fullName}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryBgColors[issue.category] || 'bg-gray-100'}`}>
                          {issue.issueType}
                        </span>
                      </td>
               
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${priorityColors[issue.priority]}`}>
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{issue.userRole}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{issue.email}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setViewingId(issue.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                     
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setParams({ ...params, page })}
                className={`px-4 py-2 rounded-lg transition ${
                  params.page === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}