"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Zap, X } from "lucide-react";

interface AddKeyResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  objectiveTitle: string;
}

export default function AddKeyResultModal({
  isOpen,
  onClose,
  objectiveTitle,
}: AddKeyResultModalProps) {
  const [keyResultForm, setKeyResultForm] = useState({
    title: "",
    description: "",
    targetValue: "",
    currentValue: "0",
    dueDate: "",
    status: "Not Started",
    assignee: "",
    metric: "percentage",
  });

  const teamMembers = [
    { id: "1", name: "Sarah Johnson", role: "Branch Manager" },
    { id: "2", name: "Mike Davis", role: "Team Lead" },
    { id: "3", name: "Emily Chen", role: "Analyst" },
    { id: "4", name: "John Smith", role: "Manager" },
    { id: "5", name: "Lisa Anderson", role: "Customer Service Lead" },
  ];

  const statusOptions = [
    "Not Started",
    "In Progress",
    "At Risk",
    "On Track",
    "Completed",
    "Paused",
  ];

  const metricOptions = [
    { value: "percentage", label: "Percentage (%)", unit: "%" },
    { value: "currency", label: "Currency (ETB)", unit: "ETB" },
    { value: "number", label: "Number/Count", unit: "" },
    { value: "ratio", label: "Ratio (1:X)", unit: "" },
    { value: "score", label: "Score (0-10)", unit: "/10" },
    { value: "days", label: "Days", unit: "days" },
    { value: "hours", label: "Hours", unit: "hrs" },
    { value: "customers", label: "Customers", unit: "customers" },
    { value: "accounts", label: "Accounts", unit: "accounts" },
    { value: "loans", label: "Loans", unit: "loans" },
    { value: "deposits", label: "Deposits (ETB)", unit: "ETB" },
    { value: "growth", label: "Growth Rate (%)", unit: "%" },
  ];

  const getSelectedMetricUnit = () => {
    const selectedMetric = metricOptions.find(
      (m) => m.value === keyResultForm.metric
    );
    return selectedMetric?.unit || "";
  };

  const handleSubmit = () => {
    if (!keyResultForm.title || !keyResultForm.targetValue) {
      alert("Please fill in all required fields.");
      return;
    }

    // Handle form submission
    console.log("Creating key result:", keyResultForm);

    // Reset form and close modal
    setKeyResultForm({
      title: "",
      description: "",
      targetValue: "",
      currentValue: "0",
      dueDate: "",
      status: "Not Started",
      assignee: "",
      metric: "percentage",
    });
    onClose();

    // Show success message
    alert("Key result added successfully!");
  };

  const handleCancel = () => {
    // Reset form and close modal
    setKeyResultForm({
      title: "",
      description: "",
      targetValue: "",
      currentValue: "0",
      dueDate: "",
      status: "Not Started",
      assignee: "",
      metric: "percentage",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#e48525] to-[#d67619] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold text-slate-900">
                Add Key Result to {objectiveTitle}
              </DialogTitle>
              <p className="text-sm text-slate-600 mt-1">
                Key results are specific, measurable outcomes that track
                progress towards the objective.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-0 right-0 h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Key Result Title */}
          <div className="space-y-2">
            <Label htmlFor="kr-title" className="text-sm font-medium">
              Key Result Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="kr-title"
              placeholder="e.g., Increase customer satisfaction score to 95%"
              value={keyResultForm.title}
              onChange={(e) =>
                setKeyResultForm({ ...keyResultForm, title: e.target.value })
              }
              className="text-base"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="kr-description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="kr-description"
              placeholder="Describe how this key result will be measured and achieved..."
              value={keyResultForm.description}
              onChange={(e) =>
                setKeyResultForm({
                  ...keyResultForm,
                  description: e.target.value,
                })
              }
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Metric */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Metric</Label>
            <Select
              value={keyResultForm.metric}
              onValueChange={(value) =>
                setKeyResultForm({ ...keyResultForm, metric: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                {metricOptions.map((metric) => (
                  <SelectItem key={metric.value} value={metric.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{metric.label}</span>
                      <span className="text-xs text-slate-500 ml-2">
                        {metric.unit}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Target Value and Current Value */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kr-target" className="text-sm font-medium">
                Target Value <span className="text-red-500">*</span>
              </Label>
              <div className="flex">
                <Input
                  id="kr-target"
                  placeholder="100"
                  value={keyResultForm.targetValue}
                  onChange={(e) =>
                    setKeyResultForm({
                      ...keyResultForm,
                      targetValue: e.target.value,
                    })
                  }
                  className="rounded-r-none border-r-0"
                />
                <div className="px-3 py-2 bg-slate-50 border border-l-0 rounded-r-md text-sm text-slate-600 flex items-center">
                  {getSelectedMetricUnit()}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kr-current" className="text-sm font-medium">
                Current Value
              </Label>
              <Input
                id="kr-current"
                placeholder="0"
                value={keyResultForm.currentValue}
                onChange={(e) =>
                  setKeyResultForm({
                    ...keyResultForm,
                    currentValue: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Due Date and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kr-due-date" className="text-sm font-medium">
                Due Date
              </Label>
              <div className="relative">
                <Input
                  id="kr-due-date"
                  type="date"
                  value={keyResultForm.dueDate}
                  onChange={(e) =>
                    setKeyResultForm({
                      ...keyResultForm,
                      dueDate: e.target.value,
                    })
                  }
                  className="pl-10"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select
                value={keyResultForm.status}
                onValueChange={(value) =>
                  setKeyResultForm({ ...keyResultForm, status: value })
                }
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            status === "Completed"
                              ? "bg-green-500"
                              : status === "On Track"
                              ? "bg-blue-500"
                              : status === "In Progress"
                              ? "bg-yellow-500"
                              : status === "At Risk"
                              ? "bg-orange-500"
                              : status === "Paused"
                              ? "bg-purple-500"
                              : "bg-slate-400"
                          }`}
                        ></div>
                        {status}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assignee */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Assignee</Label>
            <Select
              value={keyResultForm.assignee}
              onValueChange={(value) =>
                setKeyResultForm({ ...keyResultForm, assignee: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-slate-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-slate-500">
                          {member.role}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className="bg-[#00adef] hover:bg-[#0099d4] text-white"
            onClick={handleSubmit}
          >
            <Zap className="w-4 h-4 mr-2" />
            Add Key Result
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
