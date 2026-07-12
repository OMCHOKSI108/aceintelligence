"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { gql } from "@/lib/careers/graphql";


interface Admin {
  id: string;
  loginId: string;
  name: string;
  email: string;
  phone: string | null;
}

const QUERY = `{
  listAdmins { id loginId name email phone }
}`;

const DELETE_MUT = `mutation($id: ID!) {
  deleteAdmin(id: $id)
}`;

export default function SuperAdminDashboard() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    gql<{ listAdmins: Admin[] }>(QUERY)
      .then((d) => setAdmins(d.listAdmins))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  async function handleDelete(id: string, name: string) {
    setMsg("");
    setDeletingId(id);
    try {
      await gql(DELETE_MUT, { id });
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      setMsg(`${name} has been removed.`);
    } catch (err: any) {
      setMsg(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="page-header">
        <h2>Admins</h2>
        <Link href="/careers/admin/create" className="btn">
          Create Admin
        </Link>
      </div>
      {msg && (
        <p className="success" style={{ marginBottom: 12 }}>
          {msg}
        </p>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Login ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a) => (
            <tr key={a.id}>
              <td>{a.loginId}</td>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.phone ?? "\u2014"}</td>
              <td className="actions">
                <Link href={`/careers/admin/admins/${a.id}/edit`} className="link-btn">
                  Edit
                </Link>
                <button
                  className="link-btn danger"
                  disabled={deletingId === a.id}
                  onClick={() => handleDelete(a.id, a.name)}
                >
                  {deletingId === a.id ? "Removing..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
          {admins.length === 0 && (
            <tr>
              <td colSpan={5}>No admins found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
