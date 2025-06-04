"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3,
  Zap,
  Award,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";

interface CurrentRoleData {
  title: string;
  subtitle: string;
  totalObjectives: number;
  inProgress: number;
  completed: number;
  atRisk: number;
  currentDistrict: string;
  departments: Array<{
    name: string;
    count: number;
    active?: boolean;
    completion: number;
    type: string;
  }>;
  notifications: number;
}

interface OKRMetricsProps {
  currentRole: string;
  currentRoleData: CurrentRoleData;
}

export default function OKRMetricsOverview({}: OKRMetricsProps) {
  // Sample OKR data based on banking requirements
  const okrMetrics = {
    overallProgress: {
      objectiveCompletionRate: 78,
      keyResultsAchievementRate: 84,
      onTrack: 12,
      atRisk: 5,
      offTrack: 2,
      totalObjectives: 19,
    },
    engagement: {
      okrsUpdatedThisWeek: 87,
      teamContributionRate: 92,
      commentsAndCheckins: 156,
      lastUpdatedWithin24h: 15,
    },
    alignment: {
      alignedOkrs: 94,
      unalignedOkrs: 6,
      crossTeamDependencies: 8,
    },
    performance: {
      averageObjectiveScore: 0.76,
      departments: [
        { name: "CFO", completion: 88, score: 0.82, okrs: 6 },
        { name: "Operations", completion: 75, score: 0.74, okrs: 8 },
        { name: "Customer Service", completion: 92, score: 0.89, okrs: 5 },
      ],
    },
  };

  // Sample Key Results with banking-specific metrics
  const keyResultsData = [
    {
      id: "kr-1",
      title: "Mobilize new deposits",
      target: "5M birr",
      actual: "6M birr",
      progress: 120,
      status: "overachieved",
      normalized: 100,
      comments: "Exceeded expectations",
    },
    {
      id: "kr-2",
      title: "Net deposit growth",
      target: "+2M birr",
      actual: "-1M birr",
      progress: -50,
      status: "critical",
      normalized: 0,
      comments: "Requires urgent intervention",
    },
    {
      id: "kr-3",
      title: "New accounts opened",
      target: "100",
      actual: "80",
      progress: 80,
      status: "on-track",
      normalized: 80,
      comments: "On track",
    },
    {
      id: "kr-4",
      title: "Customer complaints resolved",
      target: "90%",
      actual: "95%",
      progress: 106,
      status: "overachieved",
      normalized: 100,
      comments: "Exceeded expectation",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "overachieved":
        return <Award className="w-4 h-4 text-green-600" />;
      case "on-track":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "at-risk":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-[#00adef]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Overall Progress
              </CardTitle>
              <Target className="w-5 h-5 text-[#00adef]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900">
                {okrMetrics.overallProgress.objectiveCompletionRate}%
              </div>
              <Progress
                value={okrMetrics.overallProgress.objectiveCompletionRate}
                className="h-2"
              />
              <p className="text-xs text-slate-500">
                {okrMetrics.overallProgress.onTrack} on track,{" "}
                {okrMetrics.overallProgress.atRisk} at risk
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Team Engagement
              </CardTitle>
              <Users className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900">
                {okrMetrics.engagement.teamContributionRate}%
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+5% this week</span>
              </div>
              <p className="text-xs text-slate-500">
                {okrMetrics.engagement.okrsUpdatedThisWeek}% updated this week
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#e48525]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Alignment Score
              </CardTitle>
              <BarChart3 className="w-5 h-5 text-[#e48525]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900">
                {okrMetrics.alignment.alignedOkrs}%
              </div>
              <Progress
                value={okrMetrics.alignment.alignedOkrs}
                className="h-2"
              />
              <p className="text-xs text-slate-500">
                {okrMetrics.alignment.crossTeamDependencies} cross-team
                dependencies
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                Avg Score (Google Style)
              </CardTitle>
              <Zap className="w-5 h-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900">
                {okrMetrics.performance.averageObjectiveScore}
              </div>
              <Badge
                className={`${
                  okrMetrics.performance.averageObjectiveScore >= 0.7
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {okrMetrics.performance.averageObjectiveScore >= 0.7
                  ? "Good Stretch"
                  : "Needs Focus"}
              </Badge>
              <p className="text-xs text-slate-500">
                Target: 0.7-0.8 for stretch goals
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Tabs */}
      <Tabs defaultValue="key-results" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="key-results">Key Results Performance</TabsTrigger>
          <TabsTrigger value="departments">Department Breakdown</TabsTrigger>
          <TabsTrigger value="timeline">Timeline & Cycles</TabsTrigger>
          <TabsTrigger value="alignment">Alignment Map</TabsTrigger>
        </TabsList>

        <TabsContent value="key-results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#00adef]" />
                Key Results Performance (Banking Metrics)
              </CardTitle>
              <CardDescription>
                Showing actual vs target with support for over/under achievement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyResultsData.map((kr) => (
                  <div
                    key={kr.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(kr.status)}
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">
                          {kr.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-slate-600">
                            Target:{" "}
                            <span className="font-medium">{kr.target}</span>
                          </span>
                          <span className="text-sm text-slate-600">
                            Actual:{" "}
                            <span className="font-medium">{kr.actual}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${
                              kr.progress >= 100
                                ? "text-green-600"
                                : kr.progress >= 80
                                ? "text-blue-600"
                                : kr.progress >= 60
                                ? "text-yellow-600"
                                : kr.progress >= 0
                                ? "text-orange-600"
                                : "text-red-600"
                            }`}
                          >
                            {kr.progress}%
                          </span>
                          {kr.progress > 100 && (
                            <ArrowUp className="w-3 h-3 text-green-500" />
                          )}
                          {kr.progress < 0 && (
                            <ArrowDown className="w-3 h-3 text-red-500" />
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          Normalized: {kr.normalized}%
                        </div>
                      </div>

                      <div className="w-32">
                        <Progress
                          value={Math.abs(kr.progress)}
                          className="h-2"
                        />
                      </div>

                      <Badge
                        variant={
                          kr.status === "critical" ? "destructive" : "secondary"
                        }
                        className={`${
                          kr.status === "overachieved"
                            ? "bg-green-100 text-green-800"
                            : kr.status === "on-track"
                            ? "bg-blue-100 text-blue-800"
                            : kr.status === "at-risk"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {kr.comments}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Breakdown</CardTitle>
              <CardDescription>
                OKR completion rates and scores by business unit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {okrMetrics.performance.departments.map((dept) => (
                  <div
                    key={dept.name}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          dept.completion >= 80
                            ? "bg-green-500"
                            : dept.completion >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {dept.name}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {dept.okrs} OKRs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-slate-900">
                          {dept.completion}%
                        </div>
                        <div className="text-xs text-slate-500">Completion</div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-semibold text-slate-900">
                          {dept.score}
                        </div>
                        <div className="text-xs text-slate-500">Avg Score</div>
                      </div>

                      <div className="w-32">
                        <Progress value={dept.completion} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#00adef]" />
                Timeline & Cycle Management
              </CardTitle>
              <CardDescription>
                OKR creation, completion, and cycle health metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-[#00adef] mb-2">
                    Q4 2024
                  </div>
                  <div className="text-sm text-slate-600 mb-3">
                    Current Cycle
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Created</span>
                      <span className="font-medium">24 OKRs</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Completed</span>
                      <span className="font-medium">16 OKRs</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Avg Duration</span>
                      <span className="font-medium">45 days</span>
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    87%
                  </div>
                  <div className="text-sm text-slate-600 mb-3">
                    Cycle Health
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>On Track</span>
                      <span className="font-medium">12 OKRs</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>At Risk</span>
                      <span className="font-medium">5 OKRs</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Off Track</span>
                      <span className="font-medium">2 OKRs</span>
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-[#e48525] mb-2">
                    92%
                  </div>
                  <div className="text-sm text-slate-600 mb-3">
                    Engagement Rate
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Updated Weekly</span>
                      <span className="font-medium">18 OKRs</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Comments</span>
                      <span className="font-medium">156 total</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Check-ins</span>
                      <span className="font-medium">89 this month</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alignment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Alignment Overview</CardTitle>
              <CardDescription>
                How OKRs connect across teams and strategic initiatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-3">
                      Alignment Health
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          Aligned OKRs
                        </span>
                        <span className="font-medium text-green-600">94%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          Unaligned OKRs
                        </span>
                        <span className="font-medium text-red-600">6%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          Cross-dependencies
                        </span>
                        <span className="font-medium text-[#00adef]">
                          8 active
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-3">
                      Strategic Themes
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          theme: "Digital Transformation",
                          count: 8,
                          progress: 78,
                        },
                        {
                          theme: "Customer Experience",
                          count: 6,
                          progress: 85,
                        },
                        {
                          theme: "Operational Excellence",
                          count: 5,
                          progress: 72,
                        },
                      ].map((theme) => (
                        <div
                          key={theme.theme}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <span className="text-sm font-medium text-slate-900">
                              {theme.theme}
                            </span>
                            <span className="text-xs text-slate-500 ml-2">
                              ({theme.count} OKRs)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16">
                              <Progress
                                value={theme.progress}
                                className="h-1"
                              />
                            </div>
                            <span className="text-xs font-medium text-slate-600">
                              {theme.progress}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
