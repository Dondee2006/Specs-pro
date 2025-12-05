import { motion } from "framer-motion";
import { Database } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Attribute {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface Entity {
  name: string;
  attributes: Attribute[];
  relationships: string[];
}

interface DataModelTableProps {
  entities: Entity[];
  delay?: number;
}

export function DataModelTable({ entities, delay = 0 }: DataModelTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="space-y-6"
    >
      {entities.map((entity, idx) => (
        <div key={entity.name} className="card-elevated rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-secondary/30 px-5 py-3">
            <Database className="h-5 w-5 text-primary" />
            <h4 className="font-semibold">{entity.name}</h4>
            {entity.relationships.length > 0 && (
              <div className="ml-auto flex gap-2">
                {entity.relationships.map((rel) => (
                  <Badge key={rel} variant="secondary" className="text-xs">
                    → {rel}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[150px]">Attribute</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[80px]">Required</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entity.attributes.map((attr) => (
                <TableRow key={attr.name}>
                  <TableCell className="font-mono text-sm">{attr.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {attr.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {attr.required ? (
                      <span className="text-primary">✓</span>
                    ) : (
                      <span className="text-muted-foreground">–</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {attr.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </motion.div>
  );
}
