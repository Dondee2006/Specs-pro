import { useState } from "react";
import { Save, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { type PRDData } from "@/lib/prdGenerator";
import type { Json } from "@/integrations/supabase/types";

interface SavePRDButtonProps {
  prd: PRDData;
  userInput: string;
  defaultTitle?: string;
}

export function SavePRDButton({ prd, userInput, defaultTitle }: SavePRDButtonProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(defaultTitle || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to save PRDs");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase.from("saved_prds").insert([{
        user_id: user.id,
        title: title.trim(),
        user_input: userInput,
        prd_content: JSON.parse(JSON.stringify(prd)) as Json,
      }]);

      if (error) {
        console.error("Error saving PRD:", error);
        toast.error("Failed to save PRD");
        return;
      }

      setIsSaved(true);
      setOpen(false);
      toast.success("PRD saved successfully!");
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.info("Please sign in to save PRDs")}
        className="gap-2"
      >
        <Save className="h-4 w-4" />
        Save PRD
      </Button>
    );
  }

  if (isSaved) {
    return (
      <Button variant="outline" size="sm" disabled className="gap-2">
        <Check className="h-4 w-4 text-green-500" />
        Saved
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Save className="h-4 w-4" />
          Save PRD
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save PRD</DialogTitle>
          <DialogDescription>
            Give your PRD a title to save it to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Project PRD"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !title.trim()}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
