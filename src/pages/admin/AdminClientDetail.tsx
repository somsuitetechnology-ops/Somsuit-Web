import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClient,
  createSystem,
  createWebsite,
  createService,
  deleteSystem,
  deleteWebsite,
  deleteService,
} from "@/lib/api";
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
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [systemOpen, setSystemOpen] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [systemForm, setSystemForm] = useState({ name: "", type: "ERP", status: "Pending", domain: "", notes: "" });
  const [websiteForm, setWebsiteForm] = useState({ domain: "", techStack: "" });
  const [serviceForm, setServiceForm] = useState({ type: "Hosting", startDate: "", expiryDate: "" });

  const { data: client, isLoading } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getClient(id!),
    enabled: !!id,
  });

  const createSystemMu = useMutation({
    mutationFn: () =>
      createSystem({
        clientId: id!,
        name: systemForm.name,
        type: systemForm.type,
        status: systemForm.status,
        domain: systemForm.domain || undefined,
        notes: systemForm.notes || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", id] });
      toast({ title: "System added" });
      setSystemForm({ name: "", type: "ERP", status: "Pending", domain: "", notes: "" });
      setSystemOpen(false);
    },
    onError: (err) => {
      toast({ title: "Error", description: err instanceof ApiError ? err.message : "Failed", variant: "destructive" });
    },
  });

  const createWebsiteMu = useMutation({
    mutationFn: () =>
      createWebsite({
        clientId: id!,
        domain: websiteForm.domain,
        techStack: websiteForm.techStack || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", id] });
      toast({ title: "Website added" });
      setWebsiteForm({ domain: "", techStack: "" });
      setWebsiteOpen(false);
    },
    onError: (err) => {
      toast({ title: "Error", description: err instanceof ApiError ? err.message : "Failed", variant: "destructive" });
    },
  });

  const createServiceMu = useMutation({
    mutationFn: () =>
      createService({
        clientId: id!,
        type: serviceForm.type,
        startDate: serviceForm.startDate || undefined,
        expiryDate: serviceForm.expiryDate || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", id] });
      toast({ title: "Service added" });
      setServiceForm({ type: "Hosting", startDate: "", expiryDate: "" });
      setServiceOpen(false);
    },
    onError: (err) => {
      toast({ title: "Error", description: err instanceof ApiError ? err.message : "Failed", variant: "destructive" });
    },
  });

  const deleteSystemMu = useMutation({
    mutationFn: deleteSystem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", id] });
      toast({ title: "System removed" });
    },
    onError: (err) => {
      toast({ title: "Error", description: err instanceof ApiError ? err.message : "Failed", variant: "destructive" });
    },
  });

  const deleteWebsiteMu = useMutation({
    mutationFn: deleteWebsite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", id] });
      toast({ title: "Website removed" });
    },
    onError: (err) => {
      toast({ title: "Error", description: err instanceof ApiError ? err.message : "Failed", variant: "destructive" });
    },
  });

  const deleteServiceMu = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", id] });
      toast({ title: "Service removed" });
    },
    onError: (err) => {
      toast({ title: "Error", description: err instanceof ApiError ? err.message : "Failed", variant: "destructive" });
    },
  });

  if (!id) {
    navigate("/admin");
    return null;
  }

  if (isLoading || !client) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const clientData = client && "companyName" in client ? client : null;
  const clientSystems = (client && "systems" in client ? client.systems : []) as Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    domain?: string | null;
    notes?: string | null;
  }>;
  const clientWebsites = (client && "websites" in client ? client.websites : []) as Array<{
    id: string;
    domain: string;
    techStack?: string | null;
  }>;
  const clientServices = (client && "services" in client ? client.services : []) as Array<{
    id: string;
    type: string;
    status: string;
    startDate: string;
    expiryDate: string;
  }>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex h-14 items-center px-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </header>

      <main className="container py-6 px-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{clientData?.companyName ?? "Client"}</CardTitle>
            <CardDescription>
              {clientData?.contactEmail}
              {clientData?.phone ? ` · ${clientData.phone}` : ""}
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="systems">
          <TabsList>
            <TabsTrigger value="systems">Systems</TabsTrigger>
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
          <TabsContent value="systems">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Systems</CardTitle>
                <Dialog open={systemOpen} onOpenChange={setSystemOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>New system</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input value={systemForm.name} onChange={(e) => setSystemForm((f) => ({ ...f, name: e.target.value }))} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Type</Label>
                        <Select value={systemForm.type} onValueChange={(v) => setSystemForm((f) => ({ ...f, type: v }))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ERP">ERP</SelectItem>
                            <SelectItem value="CRM">CRM</SelectItem>
                            <SelectItem value="Website">Website</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select value={systemForm.status} onValueChange={(v) => setSystemForm((f) => ({ ...f, status: v }))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Domain (optional)</Label>
                        <Input value={systemForm.domain} onChange={(e) => setSystemForm((f) => ({ ...f, domain: e.target.value }))} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Notes (optional)</Label>
                        <Input value={systemForm.notes} onChange={(e) => setSystemForm((f) => ({ ...f, notes: e.target.value }))} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setSystemOpen(false)}>Cancel</Button>
                      <Button onClick={() => systemForm.name && createSystemMu.mutate()} disabled={createSystemMu.isPending}>Create</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientSystems.map((s: { id: string; name: string; type: string; status: string; domain?: string | null }) => (
                      <TableRow key={s.id}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.type}</TableCell>
                        <TableCell>{s.status}</TableCell>
                        <TableCell>{s.domain ?? "—"}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => confirm("Remove?") && deleteSystemMu.mutate(s.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="websites">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Websites</CardTitle>
                <Dialog open={websiteOpen} onOpenChange={setWebsiteOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>New website</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Domain</Label>
                        <Input value={websiteForm.domain} onChange={(e) => setWebsiteForm((f) => ({ ...f, domain: e.target.value }))} placeholder="example.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Tech stack (optional)</Label>
                        <Input value={websiteForm.techStack} onChange={(e) => setWebsiteForm((f) => ({ ...f, techStack: e.target.value }))} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setWebsiteOpen(false)}>Cancel</Button>
                      <Button onClick={() => websiteForm.domain && createWebsiteMu.mutate()} disabled={createWebsiteMu.isPending}>Create</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead>Tech stack</TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientWebsites.map((w: { id: string; domain: string; techStack?: string | null }) => (
                      <TableRow key={w.id}>
                        <TableCell>{w.domain}</TableCell>
                        <TableCell>{w.techStack ?? "—"}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => confirm("Remove?") && deleteWebsiteMu.mutate(w.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Services</CardTitle>
                <Dialog open={serviceOpen} onOpenChange={setServiceOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>New service</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Type</Label>
                        <Select value={serviceForm.type} onValueChange={(v) => setServiceForm((f) => ({ ...f, type: v }))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hosting">Hosting</SelectItem>
                            <SelectItem value="ERP">ERP</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                            <SelectItem value="SMS">SMS</SelectItem>
                            <SelectItem value="Website">Website</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Start date (optional)</Label>
                        <Input type="date" value={serviceForm.startDate} onChange={(e) => setServiceForm((f) => ({ ...f, startDate: e.target.value }))} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Expiry date (optional)</Label>
                        <Input type="date" value={serviceForm.expiryDate} onChange={(e) => setServiceForm((f) => ({ ...f, expiryDate: e.target.value }))} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setServiceOpen(false)}>Cancel</Button>
                      <Button onClick={() => createServiceMu.mutate()} disabled={createServiceMu.isPending}>Create</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientServices.map((s: { id: string; type: string; status: string; startDate: string; expiryDate: string }) => (
                      <TableRow key={s.id}>
                        <TableCell>{s.type}</TableCell>
                        <TableCell>{s.status}</TableCell>
                        <TableCell>{new Date(s.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(s.expiryDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => confirm("Remove?") && deleteServiceMu.mutate(s.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
