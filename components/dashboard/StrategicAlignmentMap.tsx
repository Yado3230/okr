"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  Building2,
  Users,
  User,
  ArrowDown,
  ArrowRight,
  Link,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface AlignmentNode {
  id: string;
  title: string;
  type: "company" | "department" | "team" | "individual";
  progress: number;
  status: "on-track" | "at-risk" | "off-track" | "completed";
  children?: AlignmentNode[];
  dependencies?: string[];
}

interface StrategicAlignmentMapProps {
  currentRole: string;
}

export default function StrategicAlignmentMap({
  currentRole,
}: StrategicAlignmentMapProps) {
  // Sample alignment data showing cascading OKRs
  const alignmentData: AlignmentNode = {
    id: "company-1",
    title: "Digital Banking Transformation",
    type: "company",
    progress: 78,
    status: "on-track",
    children: [
      {
        id: "dept-1",
        title: "Technology Infrastructure",
        type: "department",
        progress: 85,
        status: "on-track",
        children: [
          {
            id: "team-1",
            title: "Platform Development",
            type: "team",
            progress: 90,
            status: "on-track",
            children: [
              {
                id: "ind-1",
                title: "API Integration",
                type: "individual",
                progress: 100,
                status: "completed",
              },
              {
                id: "ind-2",
                title: "Security Implementation",
                type: "individual",
                progress: 75,
                status: "on-track",
              },
            ],
          },
          {
            id: "team-2",
            title: "Data Migration",
            type: "team",
            progress: 60,
            status: "at-risk",
            dependencies: ["team-1"],
          },
        ],
      },
      {
        id: "dept-2",
        title: "Customer Experience",
        type: "department",
        progress: 72,
        status: "on-track",
        children: [
          {
            id: "team-3",
            title: "Digital Onboarding",
            type: "team",
            progress: 80,
            status: "on-track",
            dependencies: ["team-1"],
          },
          {
            id: "team-4",
            title: "Mobile App Enhancement",
            type: "team",
            progress: 45,
            status: "at-risk",
          },
        ],
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "on-track":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "at-risk":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "off-track":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "company":
        return <Building2 className="w-4 h-4" />;
      case "department":
        return <Building2 className="w-4 h-4" />;
      case "team":
        return <Users className="w-4 h-4" />;
      case "individual":
        return <User className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const renderAlignmentNode = (node: AlignmentNode, level: number = 0) => {
    const marginLeft = level * 40;

    return (
      <div key={node.id} className="space-y-4">
        <div
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors"
          style={{ marginLeft: `${marginLeft}px` }}
        >
          <div className="flex items-center gap-3">
            {getTypeIcon(node.type)}
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">{node.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {node.type}
                </Badge>
                {node.dependencies && (
                  <Badge
                    variant="outline"
                    className="text-xs flex items-center gap-1"
                  >
                    <Link className="w-3 h-3" />
                    {node.dependencies.length} dependencies
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-lg font-semibold text-slate-900">
                {node.progress}%
              </div>
              <div className="w-24 bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    node.progress >= 80
                      ? "bg-green-500"
                      : node.progress >= 60
                      ? "bg-blue-500"
                      : node.progress >= 40
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${node.progress}%` }}
                />
              </div>
            </div>

            <Badge className={getStatusColor(node.status)}>
              {node.status === "completed" && (
                <CheckCircle2 className="w-3 h-3 mr-1" />
              )}
              {node.status === "at-risk" && (
                <AlertCircle className="w-3 h-3 mr-1" />
              )}
              {node.status.replace("-", " ")}
            </Badge>

            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </div>
        </div>

        {/* Connection lines */}
        {level > 0 && (
          <div
            className="absolute border-l-2 border-slate-300"
            style={{
              left: `${marginLeft - 20}px`,
              top: "-20px",
              height: "20px",
            }}
          />
        )}

        {/* Render children */}
        {node.children && (
          <div className="space-y-4">
            {node.children.map((child) =>
              renderAlignmentNode(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[#00adef]" />
          Strategic Alignment Map
        </CardTitle>
        <CardDescription>
          Visualize how OKRs cascade and connect across the organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Legend */}
          <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-600">Company/Department</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-600">Team</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-600">Individual</span>
            </div>
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-600">Dependencies</span>
            </div>
          </div>

          {/* Alignment Tree */}
          <div className="relative">{renderAlignmentNode(alignmentData)}</div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-[#00adef] mb-1">94%</div>
              <div className="text-sm text-slate-600">Aligned OKRs</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">8</div>
              <div className="text-sm text-slate-600">
                Cross-team Dependencies
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-[#e48525] mb-1">3</div>
              <div className="text-sm text-slate-600">Strategic Themes</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">24</div>
              <div className="text-sm text-slate-600">Total OKRs</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
