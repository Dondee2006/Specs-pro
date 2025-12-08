import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  FolderPlus,
  Folder,
  FileText,
  MoreVertical,
  Trash2,
  Edit,
  Loader2,
  Plus,
} from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface SavedPRD {
  id: string;
  title: string;
  user_input: string;
  prd_content: Json;
  project_id: string | null;
  created_at: string;
}

export default function Projects() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [unorganizedPRDs, setUnorganizedPRDs] = useState<SavedPRD[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectPRDs, setProjectPRDs] = useState<SavedPRD[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProjects();
      fetchUnorganizedPRDs();
    }
  }, [user]);

  useEffect(() => {
    if (selectedProject) {
      fetchProjectPRDs(selectedProject.id);
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnorganizedPRDs = async () => {
    try {
      const { data, error } = await supabase
        .from("saved_prds")
        .select("*")
        .is("project_id", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUnorganizedPRDs(data || []);
    } catch (err) {
      console.error("Error fetching unorganized PRDs:", err);
    }
  };

  const fetchProjectPRDs = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from("saved_prds")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjectPRDs(data || []);
    } catch (err) {
      console.error("Error fetching project PRDs:", err);
    }
  };

  const handleCreateProject = async () => {
    if (!user || !newProjectName.trim()) return;

    setIsCreating(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([{
          user_id: user.id,
          name: newProjectName.trim(),
          description: newProjectDescription.trim() || null,
        }])
        .select()
        .single();

      if (error) throw error;

      setProjects((prev) => [data, ...prev]);
      setNewProjectName("");
      setNewProjectDescription("");
      setCreateDialogOpen(false);
      toast.success("Project created successfully!");
    } catch (err) {
      console.error("Error creating project:", err);
      toast.error("Failed to create project");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
        setProjectPRDs([]);
      }
      toast.success("Project deleted");
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Failed to delete project");
    }
  };

  const handleDeletePRD = async (prdId: string) => {
    try {
      const { error } = await supabase
        .from("saved_prds")
        .delete()
        .eq("id", prdId);

      if (error) throw error;

      setProjectPRDs((prev) => prev.filter((p) => p.id !== prdId));
      setUnorganizedPRDs((prev) => prev.filter((p) => p.id !== prdId));
      toast.success("PRD deleted");
    } catch (err) {
      console.error("Error deleting PRD:", err);
      toast.error("Failed to delete PRD");
    }
  };

  const handleMovePRD = async (prdId: string, projectId: string | null) => {
    try {
      const { error } = await supabase
        .from("saved_prds")
        .update({ project_id: projectId })
        .eq("id", prdId);

      if (error) throw error;

      // Refresh data
      fetchUnorganizedPRDs();
      if (selectedProject) {
        fetchProjectPRDs(selectedProject.id);
      }
      toast.success("PRD moved successfully");
    } catch (err) {
      console.error("Error moving PRD:", err);
      toast.error("Failed to move PRD");
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="mt-1 text-muted-foreground">
              Organize your PRDs into projects
            </p>
          </div>

          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <FolderPlus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Create a folder to organize your PRDs
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="My Startup Ideas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                    placeholder="A collection of PRDs for my startup projects"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateProject}
                  disabled={isCreating || !newProjectName.trim()}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Projects List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Projects</h2>

            <AnimatePresence mode="popLayout">
              {projects.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-lg border border-dashed border-border p-8 text-center"
                >
                  <Folder className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No projects yet. Create one to organize your PRDs.
                  </p>
                </motion.div>
              ) : (
                projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Card
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedProject?.id === project.id
                          ? "border-primary bg-muted/30"
                          : ""
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Folder className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {project.name}
                            </CardTitle>
                            {project.description && (
                              <CardDescription className="line-clamp-1">
                                {project.description}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProject(project.id);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {/* Unorganized PRDs */}
            {unorganizedPRDs.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                  Unorganized PRDs ({unorganizedPRDs.length})
                </h3>
                <div className="space-y-2">
                  {unorganizedPRDs.map((prd) => (
                    <Card key={prd.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium line-clamp-1">
                            {prd.title}
                          </span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {projects.map((project) => (
                              <DropdownMenuItem
                                key={project.id}
                                onClick={() => handleMovePRD(prd.id, project.id)}
                              >
                                <Folder className="mr-2 h-4 w-4" />
                                Move to {project.name}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeletePRD(prd.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selected Project PRDs */}
          <div className="lg:col-span-2">
            {selectedProject ? (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {selectedProject.name}
                    </h2>
                    {selectedProject.description && (
                      <p className="text-sm text-muted-foreground">
                        {selectedProject.description}
                      </p>
                    )}
                  </div>
                </div>

                {projectPRDs.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border p-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">
                      No PRDs in this project yet
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => navigate("/generate")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Generate a PRD
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {projectPRDs.map((prd) => (
                      <motion.div
                        key={prd.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <Card className="h-full">
                          <CardHeader className="flex flex-row items-start justify-between space-y-0">
                            <div className="flex-1 pr-2">
                              <CardTitle className="text-base line-clamp-2">
                                {prd.title}
                              </CardTitle>
                              <CardDescription className="mt-1 line-clamp-2">
                                {prd.user_input}
                              </CardDescription>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 shrink-0"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleMovePRD(prd.id, null)}
                                >
                                  <Folder className="mr-2 h-4 w-4" />
                                  Remove from project
                                </DropdownMenuItem>
                                {projects
                                  .filter((p) => p.id !== selectedProject.id)
                                  .map((project) => (
                                    <DropdownMenuItem
                                      key={project.id}
                                      onClick={() =>
                                        handleMovePRD(prd.id, project.id)
                                      }
                                    >
                                      <Folder className="mr-2 h-4 w-4" />
                                      Move to {project.name}
                                    </DropdownMenuItem>
                                  ))}
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeletePRD(prd.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </CardHeader>
                          <CardContent>
                            <p className="text-xs text-muted-foreground">
                              Created{" "}
                              {new Date(prd.created_at).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border p-12">
                <div className="text-center">
                  <Folder className="mx-auto h-16 w-16 text-muted-foreground/30" />
                  <p className="mt-4 text-lg font-medium">Select a project</p>
                  <p className="text-sm text-muted-foreground">
                    Choose a project from the list to view its PRDs
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
