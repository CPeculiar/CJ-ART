import React, { useState, useEffect } from 'react';
import { getJobs, addJob, updateJobStatus, getCustomers, deleteJob   } from '../services/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newJob, setNewJob] = useState({
    customerId: '',
    jobTitle: '',
    description: [{ description: '', price: '' }],
    status: 'Yet to Start',
    customJobId: '',
    createdDate: '',
  });
  const [editingJobId, setEditingJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
    fetchCustomers();
  }, []);

  const fetchJobs = async () => {
    const fetchedJobs = await getJobs();
    setJobs(fetchedJobs);
  };

  const fetchCustomers = async () => {
    const fetchedCustomers = await getCustomers();
    setCustomers(fetchedCustomers);
  };

  const generateCustomJobId = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return '';
    
    const customerJobs = jobs.filter(job => job.customerId === customerId);
    const nextJobNumber = customerJobs.length + 1;
    return `${customer.customerId} Job${String(nextJobNumber).padStart(3, '0')}`;
  };

  const handleCustomerSelect = (customerId) => {
    const customJobId = generateCustomJobId(customerId);
    setNewJob({
      ...newJob,
      customerId,
      customJobId,
      createdDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleAddDescriptionRow = () => {
    setNewJob({
      ...newJob,
      description: [...newJob.description, { description: '', price: '' }]
    });
  };

  const handleDescriptionChange = (index, field, value) => {
    const updatedDescriptions = [...newJob.description];
    updatedDescriptions[index][field] = value;
    setNewJob({
      ...newJob,
      description: updatedDescriptions
    });
  };

  const handleRemoveDescriptionRow = (index) => {
    const updatedDescriptions = newJob.description.filter((_, i) => i !== index);
    setNewJob({
      ...newJob,
      description: updatedDescriptions
    });
  };

  const calculateEstimatedCost = () => {
    return newJob.description.reduce((total, item) => total + (Number(item.price) || 0), 0);
  };

  const handleAddJob = async () => {
    const jobToAdd = {
      ...newJob,
      estimatedCost: calculateEstimatedCost()
    };
    await addJob(jobToAdd);
    setNewJob({
      customerId: '',
      jobTitle: '',
      description: [{ description: '', price: '' }],
      status: 'Yet to Start',
      customJobId: '',
      createdDate: '',
    });
    fetchJobs();
  };

  const handleStatusChange = async (jobId, newStatus) => {
    await updateJobStatus(jobId, newStatus);
    fetchJobs();
  };

  const handleDeleteJob = async (jobId) => {
    await deleteJob(jobId);
    fetchJobs();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-yellow-900 mb-6">Jobs</h1>

      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Add New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <select
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newJob.customerId}
              onChange={(e) => handleCustomerSelect(e.target.value)}
            >
              <option value="">Select a Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            {newJob.customJobId && (
              <p className="text-yellow-800">Job ID: {newJob.customJobId}</p>
            )}
            <input
              type="text"
              placeholder="Job Title"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newJob.jobTitle}
              onChange={(e) => setNewJob({ ...newJob, jobTitle: e.target.value })}
            />
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 font-semibold">
                <div className="col-span-6">Description</div>
                <div className="col-span-4">Price</div>
                <div className="col-span-2">Action</div>
              </div>
              {newJob.description.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2">
                  <input
                    type="text"
                    placeholder="Description"
                    className="col-span-6 p-2 border border-yellow-200 rounded"
                    value={item.description}
                    onChange={(e) => handleDescriptionChange(index, 'description', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="col-span-4 p-2 border border-yellow-200 rounded"
                    value={item.price}
                    onChange={(e) => handleDescriptionChange(index, 'price', e.target.value)}
                  />
                  <div className="col-span-2 flex space-x-2">
                    {index === newJob.description.length - 1 && (
                      <button
                        onClick={handleAddDescriptionRow}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <Plus size={16} />
                      </button>
                    )}
                    {newJob.description.length > 1 && (
                      <button
                        onClick={() => handleRemoveDescriptionRow(index)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-yellow-800 font-semibold">
              Estimated Total: ${calculateEstimatedCost()}
            </p>
            <button
              onClick={handleAddJob}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
            >
              Add Job
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Job List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {jobs.map((job) => (
              <Card key={job.id} className="bg-yellow-50 border-yellow-100">
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-900">{job.jobTitle}</h3>
                      <p className="text-yellow-800">
                        <span className="font-semibold">Job ID:</span> {job.customJobId}
                      </p>
                      <p className="text-yellow-800">
                        <span className="font-semibold">Customer:</span>{' '}
                        {customers.find(c => c.id === job.customerId)?.name}
                      </p>
                      <p className="text-yellow-800">
                        <span className="font-semibold">Created Date:</span> {job.createdDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingJobId(editingJobId === job.id ? null : job.id)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-yellow-200 pt-2">
                    <h4 className="font-semibold text-yellow-900">Job Details</h4>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left">Description</th>
                          <th className="text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(job.description) && job.description.map((item, index) => (
                          <tr key={index}>
                            <td>{item.description}</td>
                            <td className="text-right">₦{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-yellow-800 font-semibold">
                    Estimated Total: ${job.estimatedCost}
                  </p>
                  <select
                    className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value)}
                  >
                    <option>Yet to Start</option>
                    <option>In Construction</option>
                    <option>Yet to Deliver</option>
                    <option>Completed</option>
                  </select>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Jobs;