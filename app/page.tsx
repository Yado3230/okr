"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Target,
  Building2,
  ChevronDown,
  ChevronRight,
  BarChart3,
  User,
  Check,
  Diamond,
  CalendarIcon,
  CheckCircle2,
  Users,
  Bell,
  Shield,
  Copy,
  Filter,
  Eye,
  MessageSquare,
  Clock,
  AlertTriangle,
  Star,
  Zap,
  Edit,
  Lock,
  Briefcase,
  Globe,
  UserPlus,
} from "lucide-react";

// Enhanced role-based permissions with district levels
const rolePermissions = {
  "District Manager": {
    canCreateObjectives: true,
    canEditAllObjectives: true,
    canDeleteObjectives: true,
    canAssignToAll: true,
    canViewAllDepartments: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canBulkAssign: true,
    canApproveObjectives: true,
    canManageDistrict: true,
    level: "district",
  },
  "Branch Manager": {
    canCreateObjectives: true,
    canEditAllObjectives: true,
    canDeleteObjectives: true,
    canAssignToAll: true,
    canViewAllDepartments: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canBulkAssign: true,
    canApproveObjectives: true,
    canManageDistrict: false,
    level: "branch",
  },
  "Team Lead": {
    canCreateObjectives: true,
    canEditAllObjectives: false,
    canDeleteObjectives: false,
    canAssignToAll: false,
    canViewAllDepartments: false,
    canManageUsers: false,
    canViewAnalytics: true,
    canBulkAssign: true,
    canApproveObjectives: false,
    canManageDistrict: false,
    level: "team",
  },
  Employee: {
    canCreateObjectives: true, // Employees can create their own objectives
    canEditAllObjectives: false,
    canDeleteObjectives: false,
    canAssignToAll: false,
    canViewAllDepartments: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canBulkAssign: false,
    canApproveObjectives: false,
    canManageDistrict: false,
    level: "individual",
  },
};

const roleBasedData = {
  "District Manager": {
    title: "District Management - Strategic OKR Oversight",
    subtitle:
      "Manage district-wide objectives and performance across all branches",
    totalObjectives: 156,
    inProgress: 45,
    completed: 89,
    atRisk: 22,
    currentDistrict: "South Fintime District",
    departments: [
      {
        name: "All Branches",
        count: 156,
        active: true,
        completion: 78,
        type: "district",
      },
      { name: "Main Branch", count: 65, completion: 85, type: "branch" },
      { name: "Commercial Branch", count: 48, completion: 72, type: "branch" },
      {
        name: "Agricultural Branch",
        count: 43,
        completion: 76,
        type: "branch",
      },
    ],
    notifications: 15,
  },
  "Branch Manager": {
    title: "Branch Management - Operational Excellence",
    subtitle: "Drive branch performance and team objectives",
    totalObjectives: 65,
    inProgress: 20,
    completed: 35,
    atRisk: 10,
    currentDistrict: "South Fintime District",
    departments: [
      {
        name: "My Branch",
        count: 65,
        active: true,
        completion: 85,
        type: "branch",
      },
      { name: "CFO Department", count: 18, completion: 88, type: "department" },
      { name: "Operations", count: 22, completion: 82, type: "department" },
      {
        name: "Customer Service",
        count: 15,
        completion: 90,
        type: "department",
      },
      { name: "IT Support", count: 10, completion: 75, type: "department" },
    ],
    notifications: 8,
  },
  "Team Lead": {
    title: "Team Leadership - Performance Coaching",
    subtitle: "Guide team objectives and individual development",
    totalObjectives: 22,
    inProgress: 8,
    completed: 12,
    atRisk: 2,
    currentDistrict: "South Fintime District",
    departments: [
      {
        name: "My Team",
        count: 22,
        active: true,
        completion: 82,
        type: "team",
      },
      { name: "Direct Reports", count: 15, completion: 85, type: "individual" },
      { name: "Cross-functional", count: 7, completion: 75, type: "project" },
    ],
    notifications: 5,
  },
  Employee: {
    title: "Personal Development - My OKR Journey",
    subtitle: "Create and track your personal and professional objectives",
    totalObjectives: 8,
    inProgress: 4,
    completed: 3,
    atRisk: 1,
    currentDistrict: "South Fintime District",
    departments: [
      {
        name: "My Objectives",
        count: 8,
        active: true,
        completion: 75,
        type: "personal",
      },
      { name: "Team Objectives", count: 5, completion: 80, type: "team" },
      {
        name: "Development Goals",
        count: 3,
        completion: 67,
        type: "development",
      },
    ],
    notifications: 3,
  },
};

export default function DistrictOKRDashboard() {
  const [currentRole, setCurrentRole] = useState("District Manager");
  const [showObjectiveModal, setShowObjectiveModal] = useState(false);
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");
  const [objective1Open, setObjective1Open] = useState(true);
  const [bulkAssignData, setBulkAssignData] = useState({
    selectedUsers: [] as string[],
    selectedObjectives: [] as string[],
    dueDate: "",
    priority: "",
    sendNotification: true,
  });

  // Get current role data and permissions
  const currentRoleData =
    roleBasedData[currentRole as keyof typeof roleBasedData];
  const currentPermissions =
    rolePermissions[currentRole as keyof typeof rolePermissions];

  // Form states
  const [objectiveForm, setObjectiveForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    dueDate: "",
    assignmentType: "individual",
    selectedUsers: [] as string[],
    targetValue: "",
    currentValue: "",
    unit: "",
    weight: 10,
  });

  const statusFilters = [
    "All",
    "On track",
    "At risk",
    "Achieved",
    "Missed",
    "Pending Review",
    "Draft",
  ];

  const roles = [
    { value: "District Manager", label: "District Manager", icon: Globe },
    { value: "Branch Manager", label: "Branch Manager", icon: Building2 },
    { value: "Team Lead", label: "Team Lead", icon: Users },
    { value: "Employee", label: "Employee", icon: User },
  ];

  // Enhanced team members with district structure
  const teamMembers = [
    {
      id: "1",
      name: "John Smith",
      role: "Branch Manager",
      department: "Main Branch",
      district: "South Fintime District",
      avatar: "JS",
      email: "john.smith@coopbank.com",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Branch Manager",
      department: "Commercial Branch",
      district: "South Fintime District",
      avatar: "SJ",
      email: "sarah.johnson@coopbank.com",
    },
    {
      id: "3",
      name: "Mike Davis",
      role: "Branch Manager",
      department: "Agricultural Branch",
      district: "South Fintime District",
      avatar: "MD",
      email: "mike.davis@coopbank.com",
    },
    {
      id: "4",
      name: "Emily Chen",
      role: "Team Lead",
      department: "CFO",
      district: "South Fintime District",
      avatar: "EC",
      email: "emily.chen@coopbank.com",
    },
    {
      id: "5",
      name: "Robert Wilson",
      role: "Senior Analyst",
      department: "Operations",
      district: "South Fintime District",
      avatar: "RW",
      email: "robert.wilson@coopbank.com",
    },
    {
      id: "6",
      name: "Lisa Anderson",
      role: "Customer Service Lead",
      department: "Customer Service",
      district: "South Fintime District",
      avatar: "LA",
      email: "lisa.anderson@coopbank.com",
    },
    {
      id: "7",
      name: "David Brown",
      role: "IT Manager",
      department: "IT Support",
      district: "South Fintime District",
      avatar: "DB",
      email: "david.brown@coopbank.com",
    },
    {
      id: "8",
      name: "Maria Garcia",
      role: "Risk Analyst",
      department: "Risk Management",
      district: "South Fintime District",
      avatar: "MG",
      email: "maria.garcia@coopbank.com",
    },
  ];

  // Enhanced objectives with district context
  const getDistrictObjectives = () => {
    if (currentRole === "Employee") {
      return [
        {
          id: "emp-1",
          title: "Personal Development & Skill Enhancement",
          description: "Focus on professional growth and skill development",
          category: "Development",
          priority: "high",
          progress: 65,
          status: "On track",
          dueDate: "Dec 31, 2024",
          weight: 25,
          items: [
            {
              id: "emp-1-1",
              icon: <Diamond className="w-4 h-4 text-blue-600" />,
              task: "Complete advanced financial analysis certification",
              assignee: "You",
              dueDate: "Dec 31",
              status: "On track",
              statusColor: "bg-green-100 text-green-800",
              timeline: "Q4",
              timelineColor: "bg-purple-100 text-purple-800",
              progress: 65,
              comments: 2,
              canEdit: true,
            },
            {
              id: "emp-1-2",
              icon: <Check className="w-4 h-4 text-green-600" />,
              task: "Attend quarterly leadership training",
              assignee: "You",
              dueDate: "Nov 15",
              status: "Achieved",
              statusColor: "bg-green-100 text-green-800",
              timeline: "Q4",
              timelineColor: "bg-purple-100 text-purple-800",
              progress: 100,
              comments: 1,
              canEdit: true,
            },
          ],
        },
      ];
    } else if (currentRole === "Team Lead") {
      return [
        {
          id: "team-1",
          title: "Team Performance & Productivity Enhancement",
          description: "Improve team efficiency and collaboration",
          category: "Performance",
          priority: "critical",
          progress: 75,
          status: "On track",
          dueDate: "Dec 31, 2024",
          weight: 30,
          items: [
            {
              id: "team-1-1",
              icon: <Diamond className="w-4 h-4 text-blue-600" />,
              task: "Increase team productivity by 20%",
              assignee: "Team Lead",
              dueDate: "Dec 31",
              status: "On track",
              statusColor: "bg-green-100 text-green-800",
              timeline: "Q4",
              timelineColor: "bg-purple-100 text-purple-800",
              progress: 75,
              comments: 8,
              canEdit: true,
            },
            {
              id: "team-1-2",
              icon: <Diamond className="w-4 h-4 text-orange-600" />,
              task: "Implement new reporting process",
              assignee: "Sarah Johnson",
              dueDate: "Nov 30",
              status: "At risk",
              statusColor: "bg-orange-100 text-orange-800",
              timeline: "Q4",
              timelineColor: "bg-purple-100 text-purple-800",
              progress: 45,
              comments: 12,
              canEdit: true,
            },
          ],
        },
      ];
    } else {
      return [
        {
          id: "dist-1",
          title: "District Digital Transformation Initiative",
          description:
            "Modernize banking operations across all branches in the district",
          category: "Technology",
          priority: "critical",
          progress: 78,
          status: "On track",
          dueDate: "Dec 31, 2024",
          weight: 35,
          items: [
            {
              id: "dist-1-1",
              icon: <Check className="w-4 h-4 text-green-600" />,
              task: "Deploy digital banking platform across all branches",
              assignee: "John Smith",
              dueDate: "Oct 31",
              status: "Achieved",
              statusColor: "bg-green-100 text-green-800",
              timeline: "Q3",
              timelineColor: "bg-yellow-100 text-yellow-800",
              progress: 100,
              comments: 15,
              canEdit: true,
            },
            {
              id: "dist-1-2",
              icon: <Diamond className="w-4 h-4 text-blue-600" />,
              task: "Train 95% of staff on new digital tools",
              assignee: "Sarah Johnson",
              dueDate: "Nov 30",
              status: "On track",
              statusColor: "bg-green-100 text-green-800",
              timeline: "Q4",
              timelineColor: "bg-purple-100 text-purple-800",
              progress: 82,
              comments: 8,
              canEdit: true,
            },
            {
              id: "dist-1-3",
              icon: <Diamond className="w-4 h-4 text-orange-600" />,
              task: "Achieve 90% customer adoption rate",
              assignee: "Mike Davis",
              dueDate: "Dec 15",
              status: "At risk",
              statusColor: "bg-orange-100 text-orange-800",
              timeline: "Q4",
              timelineColor: "bg-purple-100 text-purple-800",
              progress: 65,
              comments: 12,
              canEdit: true,
            },
          ],
        },
        {
          id: "dist-2",
          title: "Agricultural Finance Growth Strategy",
          description:
            "Expand agricultural banking services and cooperative partnerships",
          category: "Business Growth",
          priority: "high",
          progress: 85,
          status: "On track",
          dueDate: "Dec 31, 2024",
          weight: 25,
          items: [
            {
              id: "dist-2-1",
              icon: <Check className="w-4 h-4 text-green-600" />,
              task: "Onboard 200 new cooperative partners",
              assignee: "Mike Davis",
              dueDate: "Nov 30",
              status: "Achieved",
              statusColor: "bg-green-100 text-green-800",
              timeline: "Q4",
              timelineColor: "bg-purple-100 text-purple-800",
              progress: 100,
              comments: 6,
              canEdit: true,
            },
            {
              id: "dist-2-2",
              icon: <Diamond className="w-4 h-4 text-blue-600" />,
              task: "Increase agricultural loan portfolio by 30%",
              assignee: "Agricultural Team",
              dueDate: "Dec 31",
              status: "On track",
              statusColor: "bg-green-100 text-green-800",
              timeline: "Q4",
              timelineColor: "bg-purple-100 text-purple-800",
              progress: 78,
              comments: 4,
              canEdit: true,
            },
          ],
        },
      ];
    }
  };

  // Navigation tabs based on role
  const getNavigationTabs = () => {
    const baseTabs = ["Overview"];

    if (currentRole === "Employee") {
      return [...baseTabs, "My OKRs", "Team OKRs", "Progress"];
    } else if (currentRole === "Team Lead") {
      return [...baseTabs, "My OKRs", "Team OKRs", "Analytics", "Reports"];
    } else {
      return [
        ...baseTabs,
        "My OKRs",
        "Team OKRs",
        "Analytics",
        "Reports",
        "Templates",
        "Settings",
      ];
    }
  };

  // Bulk assignment functionality
  const handleBulkAssign = () => {
    if (
      bulkAssignData.selectedUsers.length === 0 ||
      bulkAssignData.selectedObjectives.length === 0
    ) {
      alert("Please select both users and objectives for bulk assignment.");
      return;
    }

    // Simulate bulk assignment
    console.log("Bulk assigning:", {
      users: bulkAssignData.selectedUsers,
      objectives: bulkAssignData.selectedObjectives,
      dueDate: bulkAssignData.dueDate,
      priority: bulkAssignData.priority,
      sendNotification: bulkAssignData.sendNotification,
    });

    // Reset form and close modal
    setBulkAssignData({
      selectedUsers: [],
      selectedObjectives: [],
      dueDate: "",
      priority: "",
      sendNotification: true,
    });
    setShowBulkAssignModal(false);

    // Show success message
    alert(
      `Successfully assigned ${bulkAssignData.selectedObjectives.length} objectives to ${bulkAssignData.selectedUsers.length} users!`
    );
  };

  const handleCreateObjective = () => {
    if (!objectiveForm.title || !objectiveForm.description) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate objective creation
    console.log("Creating objective:", objectiveForm);

    // Reset form and close modal
    setObjectiveForm({
      title: "",
      description: "",
      category: "",
      priority: "",
      dueDate: "",
      assignmentType: "individual",
      selectedUsers: [],
      targetValue: "",
      currentValue: "",
      unit: "",
      weight: 10,
    });
    setShowObjectiveModal(false);

    // Show success message
    alert("Objective created successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00adef] to-[#0088cc] rounded-xl flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {currentRoleData.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search OKRs..."
                className="pl-10 w-64 bg-slate-50 border-slate-200 focus:bg-white focus:border-[#00adef] transition-colors"
              />
              <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </div>

            {/* Role Selector */}
            <Select value={currentRole} onValueChange={setCurrentRole}>
              <SelectTrigger className="w-48 border-slate-200 hover:border-[#00adef] transition-colors">
                <div className="flex items-center gap-2">
                  {(() => {
                    const currentRoleObj = roles.find(
                      (r) => r.value === currentRole
                    );
                    const IconComponent = currentRoleObj?.icon;
                    return IconComponent ? (
                      <IconComponent className="w-4 h-4 text-[#00adef]" />
                    ) : (
                      <Shield className="w-4 h-4 text-[#00adef]" />
                    );
                  })()}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    <div className="flex items-center gap-2">
                      <role.icon className="w-4 h-4 text-[#00adef]" />
                      {role.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              {currentRoleData.notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e48525] rounded-full text-xs text-white flex items-center justify-center font-medium animate-pulse">
                  {currentRoleData.notifications}
                </span>
              )}
            </Button>

            {/* Add New Objective Button */}
            <Dialog
              open={showObjectiveModal}
              onOpenChange={setShowObjectiveModal}
            >
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#e48525] to-[#d67619] hover:from-[#d67619] hover:to-[#c86515] text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <Plus className="w-4 h-4 mr-2" />
                  {currentRole === "Employee" ? "Create Goal" : "Add New OKR"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <Target className="w-5 h-5 text-[#e48525]" />
                    {currentRole === "Employee"
                      ? "Create Personal Goal"
                      : "Create New Objective"}
                  </DialogTitle>
                  <DialogDescription>
                    {currentRole === "Employee"
                      ? "Set a personal or professional goal to track your development and achievements."
                      : "Define a strategic objective and assign it to team members across the district."}
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="assignment">Assignment</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6 py-4">
                    {/* Objective Title */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="objective-title"
                        className="text-sm font-medium"
                      >
                        {currentRole === "Employee"
                          ? "Goal Title"
                          : "Objective Title"}{" "}
                        *
                      </Label>
                      <Input
                        id="objective-title"
                        placeholder={
                          currentRole === "Employee"
                            ? "e.g., Complete Leadership Training"
                            : "e.g., Improve Customer Satisfaction"
                        }
                        value={objectiveForm.title}
                        onChange={(e) =>
                          setObjectiveForm({
                            ...objectiveForm,
                            title: e.target.value,
                          })
                        }
                        className="text-base"
                      />
                      <p className="text-xs text-slate-500">
                        Keep it clear, inspiring, and measurable
                      </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="objective-description"
                        className="text-sm font-medium"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="objective-description"
                        placeholder={
                          currentRole === "Employee"
                            ? "Describe your goal, why it's important, and how you plan to achieve it..."
                            : "Describe the objective's purpose, expected impact, and strategic alignment..."
                        }
                        value={objectiveForm.description}
                        onChange={(e) =>
                          setObjectiveForm({
                            ...objectiveForm,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Category */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Category</Label>
                        <Select
                          value={objectiveForm.category}
                          onValueChange={(value) =>
                            setObjectiveForm({
                              ...objectiveForm,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {currentRole === "Employee" ? (
                              <>
                                <SelectItem value="development">
                                  Personal Development
                                </SelectItem>
                                <SelectItem value="skills">
                                  Skill Enhancement
                                </SelectItem>
                                <SelectItem value="performance">
                                  Performance Improvement
                                </SelectItem>
                                <SelectItem value="career">
                                  Career Growth
                                </SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="financial">
                                  Financial Performance
                                </SelectItem>
                                <SelectItem value="customer">
                                  Customer Experience
                                </SelectItem>
                                <SelectItem value="operational">
                                  Operational Excellence
                                </SelectItem>
                                <SelectItem value="technology">
                                  Technology & Innovation
                                </SelectItem>
                                <SelectItem value="growth">
                                  Business Growth
                                </SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Priority */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Priority Level *
                        </Label>
                        <Select
                          value={objectiveForm.priority}
                          onValueChange={(value) =>
                            setObjectiveForm({
                              ...objectiveForm,
                              priority: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                Critical
                              </div>
                            </SelectItem>
                            <SelectItem value="high">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                High Priority
                              </div>
                            </SelectItem>
                            <SelectItem value="medium">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                Medium Priority
                              </div>
                            </SelectItem>
                            <SelectItem value="low">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Low Priority
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="assignment" className="space-y-6 py-4">
                    {/* Assignment Type - Only show options based on permissions */}
                    {currentPermissions.canAssignToAll && (
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">
                          Assignment Type
                        </Label>
                        <div className="grid grid-cols-3 gap-4">
                          <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              objectiveForm.assignmentType === "individual"
                                ? "border-[#e48525] bg-orange-50"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                            onClick={() =>
                              setObjectiveForm({
                                ...objectiveForm,
                                assignmentType: "individual",
                              })
                            }
                          >
                            <User className="w-6 h-6 mb-2 text-[#e48525]" />
                            <h3 className="font-medium">Individual</h3>
                            <p className="text-xs text-slate-600">
                              Assign to specific person
                            </p>
                          </div>

                          <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              objectiveForm.assignmentType === "team"
                                ? "border-[#e48525] bg-orange-50"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                            onClick={() =>
                              setObjectiveForm({
                                ...objectiveForm,
                                assignmentType: "team",
                              })
                            }
                          >
                            <Users className="w-6 h-6 mb-2 text-[#e48525]" />
                            <h3 className="font-medium">Team</h3>
                            <p className="text-xs text-slate-600">
                              Assign to selected team members
                            </p>
                          </div>

                          <div
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              objectiveForm.assignmentType === "all-users"
                                ? "border-[#e48525] bg-orange-50"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                            onClick={() =>
                              setObjectiveForm({
                                ...objectiveForm,
                                assignmentType: "all-users",
                              })
                            }
                          >
                            <Building2 className="w-6 h-6 mb-2 text-[#e48525]" />
                            <h3 className="font-medium">Department</h3>
                            <p className="text-xs text-slate-600">
                              Assign to entire department
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Team Member Selection */}
                    {(objectiveForm.assignmentType === "individual" ||
                      objectiveForm.assignmentType === "team") && (
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">
                          Select Team Members
                        </Label>
                        <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                          {teamMembers.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50"
                            >
                              <Checkbox
                                id={member.id}
                                checked={objectiveForm.selectedUsers.includes(
                                  member.id
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setObjectiveForm({
                                      ...objectiveForm,
                                      selectedUsers: [
                                        ...objectiveForm.selectedUsers,
                                        member.id,
                                      ],
                                    });
                                  } else {
                                    setObjectiveForm({
                                      ...objectiveForm,
                                      selectedUsers:
                                        objectiveForm.selectedUsers.filter(
                                          (id) => id !== member.id
                                        ),
                                    });
                                  }
                                }}
                              />
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs bg-slate-500 text-white">
                                  {member.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">
                                  {member.name}
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                  {member.role} • {member.department}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-6 py-4">
                    {/* Advanced Settings */}
                    <div className="space-y-4">
                      {currentPermissions.canApproveObjectives && (
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">Require Approval</h3>
                            <p className="text-sm text-slate-600">
                              Objective needs approval before becoming active
                            </p>
                          </div>
                          <Checkbox />
                        </div>
                      )}

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Weekly Check-ins</h3>
                          <p className="text-sm text-slate-600">
                            Send weekly progress reminders to assignees
                          </p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Save as Template
                    </Button>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowObjectiveModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-[#e48525] hover:bg-[#d67619]"
                      onClick={handleCreateObjective}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      {currentRole === "Employee"
                        ? "Create Goal"
                        : "Create Objective"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bulk Actions - Only for roles with permission */}
            {currentPermissions.canBulkAssign && (
              <Dialog
                open={showBulkAssignModal}
                onOpenChange={setShowBulkAssignModal}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-slate-800 text-white border-slate-800 hover:bg-slate-700"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Bulk Assign
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-slate-700" />
                      Bulk Assignment
                    </DialogTitle>
                    <DialogDescription>
                      Assign multiple objectives to team members at once. Select
                      objectives and users below.
                    </DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="objectives" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="objectives">
                        Select Objectives
                      </TabsTrigger>
                      <TabsTrigger value="users">Select Users</TabsTrigger>
                      <TabsTrigger value="settings">
                        Assignment Settings
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="objectives" className="space-y-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Available Objectives
                        </Label>
                        <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-4">
                          {getDistrictObjectives().map((objective) => (
                            <div
                              key={objective.id}
                              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50"
                            >
                              <Checkbox
                                id={objective.id}
                                checked={bulkAssignData.selectedObjectives.includes(
                                  objective.id
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setBulkAssignData({
                                      ...bulkAssignData,
                                      selectedObjectives: [
                                        ...bulkAssignData.selectedObjectives,
                                        objective.id,
                                      ],
                                    });
                                  } else {
                                    setBulkAssignData({
                                      ...bulkAssignData,
                                      selectedObjectives:
                                        bulkAssignData.selectedObjectives.filter(
                                          (id) => id !== objective.id
                                        ),
                                    });
                                  }
                                }}
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-slate-900">
                                  {objective.title}
                                </h4>
                                <p className="text-sm text-slate-600">
                                  {objective.description}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {objective.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {objective.priority}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-slate-600">
                          Selected: {bulkAssignData.selectedObjectives.length}{" "}
                          objectives
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="users" className="space-y-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Team Members
                        </Label>
                        <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto border rounded-lg p-4">
                          {teamMembers.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50"
                            >
                              <Checkbox
                                id={`bulk-${member.id}`}
                                checked={bulkAssignData.selectedUsers.includes(
                                  member.id
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setBulkAssignData({
                                      ...bulkAssignData,
                                      selectedUsers: [
                                        ...bulkAssignData.selectedUsers,
                                        member.id,
                                      ],
                                    });
                                  } else {
                                    setBulkAssignData({
                                      ...bulkAssignData,
                                      selectedUsers:
                                        bulkAssignData.selectedUsers.filter(
                                          (id) => id !== member.id
                                        ),
                                    });
                                  }
                                }}
                              />
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs bg-slate-500 text-white">
                                  {member.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">
                                  {member.name}
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                  {member.role} • {member.department}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-slate-600">
                          Selected: {bulkAssignData.selectedUsers.length} users
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Due Date
                          </Label>
                          <Input
                            type="date"
                            value={bulkAssignData.dueDate}
                            onChange={(e) =>
                              setBulkAssignData({
                                ...bulkAssignData,
                                dueDate: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Priority Override
                          </Label>
                          <Select
                            value={bulkAssignData.priority}
                            onValueChange={(value) =>
                              setBulkAssignData({
                                ...bulkAssignData,
                                priority: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Keep original priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="send-notification"
                          checked={bulkAssignData.sendNotification}
                          onCheckedChange={(checked) =>
                            setBulkAssignData({
                              ...bulkAssignData,
                              sendNotification: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="send-notification" className="text-sm">
                          Send email notifications to assigned users
                        </Label>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-slate-900 mb-2">
                          Assignment Summary
                        </h4>
                        <div className="space-y-1 text-sm text-slate-600">
                          <p>
                            • {bulkAssignData.selectedObjectives.length}{" "}
                            objectives will be assigned
                          </p>
                          <p>
                            • {bulkAssignData.selectedUsers.length} users will
                            receive assignments
                          </p>
                          <p>
                            • Total assignments:{" "}
                            {bulkAssignData.selectedObjectives.length *
                              bulkAssignData.selectedUsers.length}
                          </p>
                          {bulkAssignData.sendNotification && (
                            <p>• Email notifications will be sent</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setShowBulkAssignModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-slate-800 hover:bg-slate-700"
                      onClick={handleBulkAssign}
                      disabled={
                        bulkAssignData.selectedUsers.length === 0 ||
                        bulkAssignData.selectedObjectives.length === 0
                      }
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Assign to {bulkAssignData.selectedUsers.length} Users
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {/* Analytics - Only for roles with permission */}
            {currentPermissions.canViewAnalytics && (
              <Dialog
                open={showAnalyticsModal}
                onOpenChange={setShowAnalyticsModal}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>OKR Analytics Dashboard</DialogTitle>
                    <DialogDescription>
                      Comprehensive performance analytics and insights
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-4">
                    <p className="text-slate-600">
                      Analytics dashboard content would be displayed here...
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-slate-600 text-white text-sm">
                {currentRole === "District Manager"
                  ? "DM"
                  : currentRole === "Branch Manager"
                  ? "BM"
                  : currentRole === "Team Lead"
                  ? "TL"
                  : "EM"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Navigation Tabs - Role-based */}
      <div className="bg-white border-b border-slate-200 px-6 shadow-sm">
        <div className="flex items-center gap-8">
          {getNavigationTabs().map((tab, index) => (
            <button
              key={tab}
              className={`py-4 px-2 text-sm font-medium border-b-2 transition-all duration-200 hover:text-[#00adef] ${
                index === 1
                  ? "border-[#00adef] text-[#00adef] bg-[#00adef]/5"
                  : "border-transparent text-slate-600 hover:border-[#00adef]/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-121px)] overflow-y-auto shadow-sm">
          <div className="p-4">
            {/* Departments Section - Role-based */}
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wide">
                {currentRole === "Employee" ? "My Areas" : "District Structure"}
              </h3>
              <div className="space-y-1">
                {currentRoleData.departments.map((dept) => (
                  <div
                    key={dept.name}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      dept.active
                        ? "bg-[#e48525]/10 text-[#e48525] border-l-4 border-[#e48525]"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {dept.type === "district" && (
                            <Globe className="w-4 h-4" />
                          )}
                          {dept.type === "branch" && (
                            <Building2 className="w-4 h-4" />
                          )}
                          {dept.type === "department" && (
                            <Briefcase className="w-4 h-4" />
                          )}
                          {dept.type === "team" && (
                            <Users className="w-4 h-4" />
                          )}
                          {dept.type === "personal" && (
                            <User className="w-4 h-4" />
                          )}
                          <span className="text-sm truncate">{dept.name}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-slate-100 text-slate-600 ml-2"
                        >
                          {dept.count}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-slate-200 rounded-full h-1">
                          <div
                            className="bg-green-500 h-1 rounded-full transition-all"
                            style={{ width: `${dept.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-500">
                          {dept.completion}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header - Role-based */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {currentRole === "Employee" ? "My OKRs" : "OKR Management"}
                  </h1>
                  <p className="text-slate-600 mt-1">
                    {currentRoleData.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Mode
                  </Button>
                  {currentPermissions.canViewAnalytics && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Advanced Filter
                    </Button>
                  )}
                  <Button className="bg-[#e48525] hover:bg-[#d67619] transition-colors">
                    <Zap className="w-4 h-4 mr-2" />
                    {currentRole === "Employee"
                      ? "Update Progress"
                      : "Quick Start"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Summary Stats - Role-based data */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Objectives</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {currentRoleData.totalObjectives}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      {currentRole === "Employee"
                        ? "Personal goals"
                        : "↑ 12% from last quarter"}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-[#e48525]" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">In Progress</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {currentRoleData.inProgress}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      {currentRole === "Employee"
                        ? "Active goals"
                        : "Active this quarter"}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-[#00adef]" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Completed</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {currentRoleData.completed}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      {Math.round(
                        (currentRoleData.completed /
                          currentRoleData.totalObjectives) *
                          100
                      )}
                      % completion rate
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">At Risk</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {currentRoleData.atRisk}
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      {currentRole === "Employee"
                        ? "Need focus"
                        : "Need attention"}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    Status
                  </span>
                  <div className="flex items-center gap-1">
                    {statusFilters.map((filter) => (
                      <Button
                        key={filter}
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveStatusFilter(filter)}
                        className={`transition-all duration-200 ${
                          activeStatusFilter === filter
                            ? "bg-[#00adef] border-[#00adef] text-white hover:bg-[#0099d4]"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">Due Date</span>
                </div>
                <Select defaultValue="all-tags">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-tags">All Tags</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="strategic">Strategic</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="created">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">
                      Sort By: Created Date
                    </SelectItem>
                    <SelectItem value="due">Sort By: Due Date</SelectItem>
                    <SelectItem value="priority">Sort By: Priority</SelectItem>
                    <SelectItem value="status">Sort By: Status</SelectItem>
                    <SelectItem value="progress">Sort By: Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Objectives Table - Role-based content */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600">
                <div className="col-span-1">#</div>
                <div className="col-span-4">Task name</div>
                <div className="col-span-1">Assignee</div>
                <div className="col-span-1">Due date</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Timeline</div>
                <div className="col-span-2">Progress</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Role-based Objectives */}
              {getDistrictObjectives().map((objective, objIndex) => (
                <Collapsible
                  key={objIndex}
                  open={objective1Open}
                  onOpenChange={setObjective1Open}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 border-b border-slate-200 transition-colors">
                      <div className="flex items-center gap-3">
                        {objective1Open ? (
                          <ChevronDown className="w-4 h-4 text-slate-400 transition-transform" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400 transition-transform" />
                        )}
                        <div className="flex items-center gap-2">
                          {currentRole !== "Employee" && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                          <span className="font-semibold text-slate-900 text-left">
                            {objective.title}
                          </span>
                          {currentRole !== "Employee" && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              Critical
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {currentPermissions.canCreateObjectives && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#e48525] hover:text-[#d67619] hover:bg-orange-50 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            {currentRole === "Employee"
                              ? "Update"
                              : "Add Key Result"}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-slate-100 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-0">
                      {objective.items.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <div className="col-span-1 flex items-center">
                            {item.icon}
                          </div>
                          <div className="col-span-4 flex items-center">
                            <span className="text-slate-900">{item.task}</span>
                          </div>
                          <div className="col-span-1 flex items-center">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs bg-slate-500 text-white">
                                {item.assignee === "You"
                                  ? "ME"
                                  : item.assignee
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="col-span-1 flex items-center text-sm text-slate-600">
                            {item.dueDate}
                          </div>
                          <div className="col-span-1 flex items-center">
                            <Badge className={`text-xs ${item.statusColor}`}>
                              {item.status}
                            </Badge>
                          </div>
                          <div className="col-span-1 flex items-center">
                            <Badge className={`text-xs ${item.timelineColor}`}>
                              {item.timeline}
                            </Badge>
                          </div>
                          <div className="col-span-2 flex items-center gap-2">
                            <Progress
                              value={item.progress}
                              className="flex-1 h-2"
                            />
                            <span className="text-sm font-medium text-slate-600">
                              {item.progress}%
                            </span>
                          </div>
                          <div className="col-span-1 flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-slate-100 transition-colors"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-xs ml-1">
                                {item.comments}
                              </span>
                            </Button>
                            {item.canEdit ||
                            currentPermissions.canEditAllObjectives ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-slate-100 transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-slate-100 transition-colors"
                                disabled
                              >
                                <Lock className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
