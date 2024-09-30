import React, { useState, useEffect } from 'react';
import { getJobs, getJobReport, getAllTransactionsReport } from '../services/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Reports = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [reportType, setReportType] = useState('job');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const fetchedJobs = await getJobs();
    setJobs(fetchedJobs);
  };

  const handleGenerateReport = async () => {
    let generatedReport;
    if (reportType === 'job') {
      generatedReport = await getJobReport(selectedJob);
    } else {
      generatedReport = await getAllTransactionsReport(dateRange.start, dateRange.end);
    }
    setReport(generatedReport);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="job">Job Report</option>
              <option value="all">All Transactions Report</option>
            </select>
            {reportType === 'job' ? (
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
              >
                <option value="">Select a Job</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.customerName} - {job.description}
                  </option>
                ))}
              </select>
            ) : (
              <div className="space-y-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
            )}
            <button onClick={handleGenerateReport}>Generate Report</button>
          </div>
        </CardContent>
      </Card>

      {report && (
        <Card>
          <CardHeader>
            <CardTitle>Report</CardTitle>
          </CardHeader>
          <CardContent>
            <pre>{JSON.stringify(report, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;