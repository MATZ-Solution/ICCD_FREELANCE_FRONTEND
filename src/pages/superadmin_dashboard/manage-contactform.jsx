import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit2, Eye, Loader } from 'lucide-react';
import { useGetAllContacts } from '../../../api/client/contact';

export default function ManageContactForm() {
  const [params, setParams] = useState({ search: '', page: 1 });
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: '',
    organization: '',
    subject: '',
    message: ''
  });
  const [showForm, setShowForm] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const { data: contacts = [], totalPages, isLoading, error } = useGetAllContacts(params);

  const handleSearch = (e) => {
    setParams({ ...params, search: e.target.value, page: 1 });
  };

  const handleOpenForm = (contact = null) => {
    if (contact) {
      setFormData(contact);
      setEditingId(contact.id);
    } else {
      setFormData({
        fullName: '',
        email: '',
        category: '',
        organization: '',
        subject: '',
        message: ''
      });
      setEditingId(null);
    }
    setShowForm(true);
  };



  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowDetails(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading contacts: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Contacts</h1>
          <p className="text-gray-600">Create, edit, and manage your contact submissions</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts by name, email, or organization..."
              value={params.search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
         
        </div>

        {showDetails && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl my-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Contact Details
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-gray-800 font-semibold">{selectedContact.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-800">{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Organization</p>
                  <p className="text-gray-800">{selectedContact.organization}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Category</p>
                  <p className="text-gray-800">{selectedContact.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Subject</p>
                  <p className="text-gray-800">{selectedContact.subject}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Message</p>
                  <p className="text-gray-800 whitespace-pre-line">{selectedContact.message}</p>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg">No contacts found</p>
              <p className="text-sm mt-1">Create your first contact to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Organization</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map(contact => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{contact.fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{contact.organization}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                          {contact.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs" title={contact.subject}>
                        {contact.subject}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* 👁️ View Details */}
                          <button
                            onClick={() => handleViewDetails(contact)}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                            title="View Details"
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
