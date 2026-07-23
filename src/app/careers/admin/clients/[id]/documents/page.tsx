"use client";
import { useEffect, useState, useRef, use } from "react";
import { gql } from "@/lib/careers/graphql";

const CLIENT_DOCS_QUERY = `query($id: ID!) {
  getClientById(id: $id) {
    client { id name }
    documents { id fileName fileType fileSize createdAt }
  }
}`;

const DELETE_DOC_MUT = `mutation($id: ID!) {
  deleteClientDocument(id: $id)
}`;

export default function ClientDocumentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [client, setClient] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDocs();
  }, [id]);

  function loadDocs() {
    gql<{ getClientById: { client: any; documents: any[] } }>(CLIENT_DOCS_QUERY, {
      id,
    })
      .then((d) => {
        setClient(d.getClientById.client);
        setDocuments(d.getClientById.documents);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setError("");
    setSuccess("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("clientId", id);

      const res = await fetch("/api/client-documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setSuccess("Document uploaded successfully.");
      loadDocs();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(docId: string) {
    if (!confirm("Delete this document?")) return;

    try {
      await gql(DELETE_DOC_MUT, { id: docId });
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Documents — {client?.name}</h2>
          <p className="muted">Upload and manage project documents for this client.</p>
        </div>
      </div>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      <section className="form-panel">
        <h3>Upload Document</h3>
        <form onSubmit={handleUpload} className="form">
          <label>
            Select File (PDF, Markdown, or Image)
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.md,.markdown,.png,.jpg,.jpeg,.gif,.webp"
              required
            />
          </label>
          <button type="submit" disabled={uploading} className="btn">
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </section>

      <h3 style={{ marginTop: 16 }}>Uploaded Documents ({documents.length})</h3>
      {documents.length === 0 ? (
        <p className="muted">No documents yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>File</th>
              <th>Type</th>
              <th>Size</th>
              <th>Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.fileName}</td>
                <td>{doc.fileType}</td>
                <td>{(doc.fileSize / 1024).toFixed(1)} KB</td>
                <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="link-btn danger" onClick={() => handleDelete(doc.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
