import React, { useState, useEffect } from 'react';
import { getJobs, addJob, updateJobStatus, getCustomers } from '../services/firestore';
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <select
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
              placeholder="Job Description"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Estimated Cost"
              value={newJob.estimatedCost}
              onChange={(e) => setNewJob({ ...newJob, estimatedCost: e.target.value })}
            />
            <button onClick={handleAddJob}>Add Job</button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job List</CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.map((job) => (
            <div key={job.id} className="mb-4 p-4 border rounded">
              <h3 className="font-bold">{job.description}</h3>
              <p>Customer: {customers.find(c => c.id === job.customerId)?.name}</p>
              <p>Estimated Cost: ${job.estimatedCost}</p>
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(job.id, e.target.value)}
              >
                <option value="Yet to Start">Yet to Start</option>
                <option value="In Construction">In Construction</option>
                <option value="Yet to Deliver">Yet to Deliver</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Jobs;