"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";

const STAGES = ["RECRUITER_PHASE", "ON_HOLD", "SHORTLISTED", "REJECTED", "SELECTED"];

const APPS_QUERY = `query($jobId: String!) {
  listApplicationsForJob(jobId: $jobId) {
    id name email phone appliedAt resumeFileId stage
  }
}`;

const UPDATE_STAGE = `mutation($applicationId: String!, $stage: ApplicationStage!) {
  updateApplicationStage(applicationId: $applicationId, stage: $stage) { id stage }
}`;

const SCHEDULE_INT = `mutation($input: ScheduleInterviewInput!) {
  scheduleInterview(input: $input) { id scheduledAt mode interviewerName location }
}`;

const CREATE_EMP = `mutation($applicationId: String!) {
  createEmployeeLogin(applicationId: $applicationId) { id loginId email name }
}`;

export default function ApplicationsTablePage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [interviewForm, setInterviewForm] = useState<Record<string, any>>({});
  const [empResult, setEmpResult] = useState<Record<string, any>>({});
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error">("success");
  const [updatingStage, setUpdatingStage] = useState<string | null>(null);
  const [schedulingId, setSchedulingId] = useState<string | null>(null);
  const [creatingEmpId, setCreatingEmpId] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;
    load();
  }, [jobId]);

  function load() {
    if (!jobId) return;
    gql<{ listApplicationsForJob: any[] }>(APPS_QUERY, { jobId })
      .then((d) => setApps(d.listApplicationsForJob))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function flash(type: "success" | "error", text: string) {
    setMsgType(type);
    setMsg(text);
    setTimeout(() => setMsg(""), 4000);
  }

  async function handleStageChange(appId: string, stage: string) {
    setUpdatingStage(appId);
    try {
      await gql(UPDATE_STAGE, { applicationId: appId, stage });
      setApps((prev) => prev.map((a) => (a.id === appId ? { ...a, stage } : a)));
      flash("success", `Stage updated to ${stage.replace("_", " ")}.`);
    } catch (err: any) {
      flash("error", err.message);
    } finally {
      setUpdatingStage(null);
    }
  }

  async function handleScheduleInterview(appId: string) {
    const f = interviewForm[appId];
    if (!f) return;
    setSchedulingId(appId);
    try {
      await gql(
        SCHEDULE_INT,
        {
          input: {
            applicationId: appId,
            scheduledAt: new Date(`${f.date}T${f.time}:00`).toISOString(),
            mode: f.mode,
            location: f.location,
            interviewerName: f.interviewer,
          },
        },
      );
      flash("success", "Interview scheduled.");
      setInterviewForm((prev) => ({ ...prev, [appId]: undefined }));
    } catch (err: any) {
      flash("error", err.message);
    } finally {
      setSchedulingId(null);
    }
  }

  async function handleCreateEmployee(appId: string) {
    setCreatingEmpId(appId);
    try {
      const d = await gql<{ createEmployeeLogin: any }>(
        CREATE_EMP,
        { applicationId: appId },
      );
      setEmpResult((prev) => ({ ...prev, [appId]: d.createEmployeeLogin }));
      flash("success", `Employee account created \u2014 ${d.createEmployeeLogin.loginId}`);
    } catch (err: any) {
      flash("error", err.message);
    } finally {
      setCreatingEmpId(null);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link href="/careers/admin/jobs" style={{ fontSize: 13 }}>
        &larr; Back to jobs
      </Link>
      <h2>Applications for {jobId}</h2>

      {msg && (
        <p className={msgType} style={{ marginBottom: 12 }}>
          {msg}
        </p>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Applied</th>
            <th>Resume</th>
            <th>Stage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.phone}</td>
              <td>{new Date(Number(a.appliedAt)).toLocaleDateString()}</td>
              <td>
                {a.resumeFileId ? (
                  <a href={`/api/resume/${a.resumeFileId}`} target="_blank" rel="noreferrer">
                    view
                  </a>
                ) : (
                  "\u2014"
                )}
              </td>
              <td className="verdict">[{a.stage.replace("_", " ")}]</td>
              <td>
                <select
                  value={a.stage}
                  disabled={updatingStage === a.id}
                  onChange={(e) => handleStageChange(a.id, e.target.value)}
                  className="select-sm"
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {apps.length === 0 && (
            <tr>
              <td colSpan={7}>No applications yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {apps
        .filter((a) => a.stage === "SHORTLISTED" || a.stage === "SELECTED")
        .map((a) => (
          <div key={a.id} className="expand-row">
            <strong>{a.name}</strong>
            <span className="verdict" style={{ marginLeft: 8 }}>
              [{a.stage}]
            </span>

            {a.stage === "SHORTLISTED" && !empResult[a.id] && (
              <div className="inline-form">
                <h4>Schedule Interview</h4>
                <label>
                  Date
                  <input
                    type="date"
                    value={interviewForm[a.id]?.date ?? ""}
                    onChange={(e) =>
                      setInterviewForm((p) => ({
                        ...p,
                        [a.id]: { ...p[a.id], date: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  Time
                  <input
                    type="time"
                    value={interviewForm[a.id]?.time ?? ""}
                    onChange={(e) =>
                      setInterviewForm((p) => ({
                        ...p,
                        [a.id]: { ...p[a.id], time: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  Mode
                  <select
                    value={interviewForm[a.id]?.mode ?? "ONLINE"}
                    onChange={(e) =>
                      setInterviewForm((p) => ({
                        ...p,
                        [a.id]: { ...p[a.id], mode: e.target.value },
                      }))
                    }
                  >
                    <option value="ONLINE">Online</option>
                    <option value="IN_PERSON">In Person</option>
                  </select>
                </label>
                <label>
                  Location / Link
                  <input
                    value={interviewForm[a.id]?.location ?? ""}
                    onChange={(e) =>
                      setInterviewForm((p) => ({
                        ...p,
                        [a.id]: { ...p[a.id], location: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  Interviewer
                  <input
                    value={interviewForm[a.id]?.interviewer ?? ""}
                    onChange={(e) =>
                      setInterviewForm((p) => ({
                        ...p,
                        [a.id]: { ...p[a.id], interviewer: e.target.value },
                      }))
                    }
                  />
                </label>
                <button
                  className="btn"
                  disabled={schedulingId === a.id}
                  onClick={() => handleScheduleInterview(a.id)}
                >
                  {schedulingId === a.id ? "Scheduling..." : "Schedule"}
                </button>
              </div>
            )}

            {a.stage === "SELECTED" && !empResult[a.id] && (
              <button
                className="btn"
                style={{ marginLeft: 8 }}
                disabled={creatingEmpId === a.id}
                onClick={() => handleCreateEmployee(a.id)}
              >
                {creatingEmpId === a.id ? "Creating..." : "Create Employee Login"}
              </button>
            )}

            {empResult[a.id] && (
              <span style={{ marginLeft: 8 }}>
                Login ID: <strong>{empResult[a.id].loginId}</strong>
              </span>
            )}
          </div>
        ))}
    </div>
  );
}
