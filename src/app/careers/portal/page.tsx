"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/careers/auth";
import { gql } from "@/lib/careers/graphql";
import ReactMarkdown from "react-markdown";

const PORTAL_QUERY = `{
  getClientPortal {
    client { id name email companyName workStatus googleChatLink createdAt }
    documents { id fileName fileType fileUrl fileSize createdAt }
  }
}`;

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NOT_STARTED: { label: "Not Started", color: "#94a3b8" },
  IN_PROGRESS: { label: "In Progress", color: "#3b82f6" },
  REVIEW: { label: "Under Review", color: "#f59e0b" },
  COMPLETED: { label: "Completed", color: "#22c55e" },
  ON_HOLD: { label: "On Hold", color: "#ef4444" },
};

export default function ClientPortal() {
  const { user } = useAuth();
  const [client, setClient] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [docContent, setDocContent] = useState("");

  useEffect(() => {
    gql<{ getClientPortal: { client: any; documents: any[] } }>(PORTAL_QUERY)
      .then((d) => {
        setClient(d.getClientPortal.client);
        setDocuments(d.getClientPortal.documents);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function loadDocContent(doc: any) {
    setSelectedDoc(doc);
    if (doc.fileType === "MARKDOWN") {
      try {
        const res = await fetch(doc.fileUrl);
        const text = await res.text();
        setDocContent(text);
      } catch {
        setDocContent("Failed to load document content.");
      }
    } else {
      setDocContent("");
    }
  }

  if (loading) {
    return (
      <div className="portal-loading">
        <div className="spinner" />
        <p>Loading your portal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portal-error">
        <p>{error}</p>
      </div>
    );
  }

  const statusInfo = STATUS_LABELS[client?.workStatus] || STATUS_LABELS.NOT_STARTED;

  return (
    <div className="client-portal">
      {/* Status Bar */}
      <div className="portal-status-bar">
        <div className="status-content">
          <span className="status-label">Project Status:</span>
          <span className="status-badge" style={{ background: statusInfo.color }}>
            {statusInfo.label}
          </span>
          {client?.companyName && (
            <span className="company-name">{client.companyName}</span>
          )}
        </div>
      </div>

      <div className="portal-layout">
        {/* Left Side - Documents */}
        <div className="portal-documents">
          <div className="documents-header">
            <h2>Project Documents</h2>
            <p className="muted">
              {documents.length} document{documents.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="documents-list">
            {documents.length === 0 ? (
              <div className="empty-state">
                <p>No documents uploaded yet.</p>
                <p className="muted">Your project documents will appear here.</p>
              </div>
            ) : (
              documents.map((doc) => (
                <button
                  key={doc.id}
                  className={`doc-card ${selectedDoc?.id === doc.id ? "active" : ""}`}
                  onClick={() => loadDocContent(doc)}
                >
                  <div className="doc-icon">
                    {doc.fileType === "PDF" ? "📄" : doc.fileType === "MARKDOWN" ? "📝" : "🖼️"}
                  </div>
                  <div className="doc-info">
                    <span className="doc-name">{doc.fileName}</span>
                    <span className="doc-meta">
                      {doc.fileType} • {(doc.fileSize / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Document Preview */}
          {selectedDoc && (
            <div className="doc-preview">
              <div className="preview-header">
                <h3>{selectedDoc.fileName}</h3>
                <button className="close-btn" onClick={() => setSelectedDoc(null)}>
                  ×
                </button>
              </div>
              <div className="preview-content">
                {selectedDoc.fileType === "MARKDOWN" ? (
                  <div className="markdown-render">
                    <ReactMarkdown>{docContent}</ReactMarkdown>
                  </div>
                ) : selectedDoc.fileType === "PDF" ? (
                  <iframe
                    src={selectedDoc.fileUrl}
                    className="pdf-viewer"
                    title={selectedDoc.fileName}
                  />
                ) : (
                  <img
                    src={selectedDoc.fileUrl}
                    alt={selectedDoc.fileName}
                    className="image-viewer"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Connect */}
        <div className="portal-connect">
          <div className="connect-card">
            <h3>Connect With Us</h3>
            <p>Have questions? Need to discuss your project?</p>

            {client?.googleChatLink ? (
              <a
                href={client.googleChatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-link"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22H17V14H20C21.1 14 22 13.1 22 12C22 6.48 17.52 2 12 2ZM7 13C5.9 13 5 12.1 5 11C5 9.9 5.9 9 7 9C8.1 9 9 9.9 9 11C9 12.1 8.1 13 7 13ZM17 13C15.9 13 15 12.1 15 11C15 9.9 15.9 9 17 9C18.1 9 19 9.9 19 11C19 12.1 18.1 13 17 13ZM12 9C10.9 9 10 9.9 10 11C10 12.1 10.9 13 12 13C13.1 13 14 12.1 14 11C14 9.9 13.1 9 12 9Z"
                    fill="currentColor"
                  />
                </svg>
                Open Google Chat
              </a>
            ) : (
              <div className="no-chat">
                <p>Google Chat link will be provided by your project manager.</p>
              </div>
            )}
          </div>

          <div className="info-card">
            <h3>Your Account</h3>
            <div className="info-row">
              <span className="info-label">Login ID</span>
              <span className="info-value">{client?.loginId || user?.loginId}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">{client?.email || user?.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Member Since</span>
              <span className="info-value">
                {client?.createdAt
                  ? new Date(client.createdAt).toLocaleDateString()
                  : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
