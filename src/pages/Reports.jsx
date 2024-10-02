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
      <h1 className="text-2xl font-bold text-yellow-900 mb-6">Reports</h1>

      <Card className="bg-white shadow-lg border border-yellow-100">
        <CardHeader>
          <CardTitle className="text-yellow-900">Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <select
              className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="job">Job Report</option>
              <option value="all">All Transactions Report</option>
            </select>

            {reportType === 'job' ? (
              <select
                className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
              <div className="space-y-4">
                <input
                  type="date"
                  className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
                <input
                  type="date"
                  className="w-full p-2 border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
            )}

            <button
              onClick={handleGenerateReport}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
            >
              Generate Report
            </button>
          </div>
        </CardContent>
      </Card>

      {report && (
        <Card className="bg-white shadow-lg border border-yellow-100">
          <CardHeader>
            <CardTitle className="text-yellow-900">Report Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-yellow-50 p-4 rounded overflow-x-auto text-yellow-800">
              {JSON.stringify(report, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;