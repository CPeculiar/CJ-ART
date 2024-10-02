import React, { useState, useEffect } from 'react';
import { getJobs, addJob, updateJobStatus, getCustomers, deleteJob  } from '../services/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newJob, setNewJob] = useState({
    customerId: '',
    description: '',
    status: 'Yet to Start',
    estimatedCost: '',
  });

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

  const handleAddJob = async () => {
    await addJob(newJob);
    setNewJob({ customerId: '', description: '', status: 'Yet to Start', estimatedCost: '' });
    fetchJobs();
  };

  const handleStatusChange = async (jobId, newStatus) => {
    await updateJobStatus(jobId, newStatus);
    fetchJobs();
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await deleteJob(jobId);
      fetchJobs();
    }
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
              onChange={(e) => setNewJob({ ...newJob, customerId: e.target.value })}
            >
              <option value="">Select a Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Job Description"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Estimated Cost"
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={newJob.estimatedCost}
              onChange={(e) => setNewJob({ ...newJob, estimatedCost: e.target.value })}
            />
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
                  <h3 className="text-lg font-semibold text-yellow-900">{job.description}</h3>
                  <p className="text-yellow-800">
                    <span className="font-semibold">Customer:</span>{' '}
                    {customers.find(c => c.id === job.customerId)?.name}
                  </p>
                  <p className="text-yellow-800">
                    <span className="font-semibold">Estimated Cost:</span> ${job.estimatedCost}
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