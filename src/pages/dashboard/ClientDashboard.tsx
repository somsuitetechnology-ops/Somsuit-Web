import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getClientData, createSupportMessage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/lib/api";
import { LogOut, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportForm, setSupportForm] = useState({ subject: "", message: "" });

  const { data, isLoading, error } = useQuery({
    queryKey: ["client-data"],
    queryFn: getClientData,
    enabled: !!user?.clientId,
  });

  const createSupportMu = useMutation({
    mutationFn: () => createSupportMessage({ subject: supportForm.subject, message: supportForm.message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-data"] });
      toast({ title: "Support message sent" });
      setSupportForm({ subject: "", message: "" });
      setSupportOpen(false);
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err instanceof ApiError ? err.message : "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const client = data?.client;
  const systems = data?.systems ?? [];
  const websites = data?.websites ?? [];
  const services = data?.services ?? [];
  const supportMessages = data?.supportMessages ?? [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex h-14 items-center justify-between px-4">
          <h1 className="font-semibold">My Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" /> Contact support
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!supportForm.subject.trim() || !supportForm.message.trim()) {
                      toast({ title: "Error", description: "Subject and message required", variant: "destructive" });
                      return;
                    }
                    createSupportMu.mutate();
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Contact support</DialogTitle>
                    <DialogDescription>Send a message to the support team.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Subject</Label>
                      <Input
                        value={supportForm.subject}
                        onChange={(e) => setSupportForm((f) => ({ ...f, subject: e.target.value }))}
                        placeholder="Brief subject"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Message</Label>
                      <Textarea
                        value={supportForm.message}
                        onChange={(e) => setSupportForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Describe your request..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setSupportOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createSupportMu.isPending}>
                      {createSupportMu.isPending ? "Sending..." : "Send"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 px-4">
        {!user?.clientId && (
          <Card>
            <CardContent className="py-6">
              <p className="text-muted-foreground">
                Your account is not linked to a client. Contact an administrator to get access to company data.
              </p>
            </CardContent>
          </Card>
        )}

        {user?.clientId && isLoading && (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}

        {user?.clientId && error && (
          <Card>
            <CardContent className="py-6">
              <p className="text-destructive">
                {error instanceof ApiError ? error.message : "Failed to load your data"}
              </p>
            </CardContent>
          </Card>
        )}

        {user?.clientId && data && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Company profile</CardTitle>
                <CardDescription>Your registered company details.</CardDescription>
              </CardHeader>
              <CardContent>
                {client ? (
                  <dl className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-muted-foreground">Company</dt>
                      <dd className="font-medium">{client.companyName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Contact email</dt>
                      <dd className="font-medium">{client.contactEmail}</dd>
                    </div>
                    {client.phone && (
                      <div>
                        <dt className="text-sm text-muted-foreground">Phone</dt>
                        <dd className="font-medium">{client.phone}</dd>
                      </div>
                    )}
                  </dl>
                ) : (
                  <p className="text-muted-foreground">No company data found.</p>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Systems</CardTitle>
                  <CardDescription>Registered systems and status.</CardDescription>
                </CardHeader>
                <CardContent>
                  {systems.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No systems registered.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Domain</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {systems.map((s) => (
                          <TableRow key={s.id}>
                            <TableCell>{s.name}</TableCell>
                            <TableCell>{s.type}</TableCell>
                            <TableCell>
                              <Badge variant={s.status === "Active" ? "default" : "secondary"}>{s.status}</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{s.domain ?? "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Websites</CardTitle>
                  <CardDescription>Registered websites.</CardDescription>
                </CardHeader>
                <CardContent>
                  {websites.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No websites registered.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Domain</TableHead>
                          <TableHead>Tech stack</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {websites.map((w) => (
                          <TableRow key={w.id}>
                            <TableCell>{w.domain}</TableCell>
                            <TableCell className="text-muted-foreground">{w.techStack ?? "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>Service status (Active / Expired).</CardDescription>
              </CardHeader>
              <CardContent>
                {services.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No services assigned.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>Expiry</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell>{s.type}</TableCell>
                          <TableCell>
                            <Badge variant={s.status === "Active" ? "default" : "secondary"}>{s.status}</Badge>
                          </TableCell>
                          <TableCell>{new Date(s.startDate).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(s.expiryDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {supportMessages.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Support messages</CardTitle>
                  <CardDescription>Recent support requests.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {supportMessages.slice(0, 10).map((m) => (
                      <li key={m.id} className="rounded-lg border p-3">
                        <p className="font-medium">{m.subject}</p>
                        <p className="text-muted-foreground text-sm">{m.message}</p>
                        <p className="text-muted-foreground mt-1 text-xs">{new Date(m.createdAt).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
}
