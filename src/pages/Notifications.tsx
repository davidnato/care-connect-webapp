import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  Bell,
  Calendar,
  Clock,
  FileText,
  Pill,
  User,
  Check,
  Settings,
} from "lucide-react";

const mockNotificationsData = {
  admin: [
    {
      id: "1",
      title: "New User Registration",
      description: "Emily Rodriguez has registered as a new patient.",
      time: "2 hours ago",
      type: "system",
      isRead: false,
    },
    {
      id: "2",
      title: "System Update",
      description: "System will undergo maintenance tonight at 2:00 AM.",
      time: "4 hours ago",
      type: "system",
      isRead: false,
    },
    {
      id: "3",
      title: "Staff Meeting",
      description: "Monthly staff meeting scheduled for Friday at 9:00 AM.",
      time: "1 day ago",
      type: "message",
      isRead: true,
    },
  ],
  doctor: [
    {
      id: "1",
      title: "New Appointment Request",
      description: "Robert Thompson has requested an appointment for tomorrow at 2:30 PM.",
      time: "1 hour ago",
      type: "appointment",
      isRead: false,
    },
    {
      id: "2",
      title: "Lab Results Ready",
      description: "Emily Rodriguez's lab results are ready for review.",
      time: "3 hours ago",
      type: "lab",
      isRead: false,
    },
    {
      id: "3",
      title: "Patient Message",
      description: "John Patient has sent you a message regarding their medication.",
      time: "1 day ago",
      type: "message",
      isRead: true,
    },
    {
      id: "4",
      title: "Medical Record Updated",
      description: "You updated Robert Thompson's medical record.",
      time: "2 days ago",
      type: "record",
      isRead: true,
    },
  ],
  patient: [
    {
      id: "1",
      title: "Upcoming Appointment",
      description: "You have an appointment with Dr. Sarah Johnson tomorrow at 10:30 AM.",
      time: "1 day ago",
      type: "appointment",
      isRead: false,
    },
    {
      id: "2",
      title: "Medication Reminder",
      description: "Remember to take your Lisinopril medication today.",
      time: "3 hours ago",
      type: "medication",
      isRead: false,
    },
    {
      id: "3",
      title: "Lab Results Ready",
      description: "Your recent lab results are now available. View them online.",
      time: "2 days ago",
      type: "lab",
      isRead: true,
    },
    {
      id: "4",
      title: "Appointment Request Confirmed",
      description: "Your appointment request with Dr. Michael Chen has been confirmed for July 22, 2023.",
      time: "5 days ago",
      type: "appointment",
      isRead: true,
    },
    {
      id: "5",
      title: "Medical Record Updated",
      description: "Your medical record has been updated with your latest visit information.",
      time: "1 week ago",
      type: "record",
      isRead: true,
    },
  ],
  "1": [
    {
      id: "1",
      title: "New System Report",
      description: "Monthly system report is ready for review.",
      time: "5 hours ago",
      type: "system",
      isRead: false,
    },
    {
      id: "2",
      title: "Staff Evaluation Due",
      description: "Annual staff evaluations are due by end of month.",
      time: "1 day ago",
      type: "system",
      isRead: true,
    },
  ],
  "2": [
    {
      id: "1",
      title: "Patient Referral",
      description: "New patient referral from Dr. Williams for cardiology consultation.",
      time: "2 hours ago",
      type: "message",
      isRead: false,
    },
    {
      id: "2",
      title: "Conference Invitation",
      description: "You've been invited to speak at the Cardiology Conference in September.",
      time: "1 week ago",
      type: "message",
      isRead: true,
    },
  ],
  "3": [
    {
      id: "1",
      title: "Prescription Renewal",
      description: "Your prescription for Metformin has been renewed and is ready for pickup.",
      time: "1 day ago",
      type: "medication",
      isRead: false,
    },
    {
      id: "2",
      title: "Follow-up Reminder",
      description: "Remember your follow-up appointment with Dr. Johnson next week.",
      time: "3 days ago",
      type: "appointment",
      isRead: true,
    },
  ],
  "4": [
    {
      id: "1",
      title: "Lab Equipment Maintenance",
      description: "The lab equipment maintenance is scheduled for this weekend.",
      time: "3 hours ago",
      type: "system",
      isRead: false,
    },
    {
      id: "2",
      title: "Research Grant Approved",
      description: "Your research grant application has been approved.",
      time: "2 days ago",
      type: "message",
      isRead: true,
    },
  ],
  "5": [
    {
      id: "1",
      title: "Vaccination Due",
      description: "Your annual flu vaccination is due this month.",
      time: "2 days ago",
      type: "appointment",
      isRead: false,
    },
    {
      id: "2",
      title: "Insurance Update",
      description: "Please update your insurance information at your next visit.",
      time: "1 week ago",
      type: "message",
      isRead: true,
    },
  ],
  "6": [
    {
      id: "1",
      title: "Department Meeting",
      description: "Pediatrics department meeting tomorrow at 8:00 AM.",
      time: "5 hours ago",
      type: "message",
      isRead: false,
    },
    {
      id: "2",
      title: "New Protocol Available",
      description: "New treatment protocol for pediatric asthma is available for review.",
      time: "3 days ago",
      type: "system",
      isRead: true,
    },
  ],
  "7": [
    {
      id: "1",
      title: "Test Results",
      description: "Your recent blood test results are now available.",
      time: "1 day ago",
      type: "lab",
      isRead: false,
    },
    {
      id: "2",
      title: "Appointment Reminder",
      description: "Reminder: You have an appointment with Dr. Williams tomorrow.",
      time: "4 days ago",
      type: "appointment",
      isRead: true,
    },
  ],
};

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user) {
      const userSpecificNotifications = mockNotificationsData[user.id] || [];
      const roleBasedNotifications = mockNotificationsData[user.role] || [];
      setNotifications([...userSpecificNotifications, ...roleBasedNotifications]);
    } else {
      setNotifications([]);
    }
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.isRead;
    return n.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment":
        return (
          <div className="rounded-full bg-blue-100 p-2">
            <Calendar className="h-4 w-4 text-blue-500" />
          </div>
        );
      case "medication":
        return (
          <div className="rounded-full bg-green-100 p-2">
            <Pill className="h-4 w-4 text-green-500" />
          </div>
        );
      case "lab":
        return (
          <div className="rounded-full bg-purple-100 p-2">
            <FileText className="h-4 w-4 text-purple-500" />
          </div>
        );
      case "record":
        return (
          <div className="rounded-full bg-orange-100 p-2">
            <FileText className="h-4 w-4 text-orange-500" />
          </div>
        );
      case "message":
        return (
          <div className="rounded-full bg-teal-100 p-2">
            <User className="h-4 w-4 text-teal-500" />
          </div>
        );
      default:
        return (
          <div className="rounded-full bg-gray-100 p-2">
            <Bell className="h-4 w-4 text-gray-500" />
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              {user ? `Hello, ${user.name}. Stay updated with important information about your health.` : 
                "Stay updated with important information about your health"}
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="mr-2 h-4 w-4" />
                Mark All as Read
              </Button>
            )}
            <Button variant="outline" onClick={() => toast.success("Notifications refreshed")}>
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>All Notifications</CardTitle>
                  <CardDescription>
                    You have {unreadCount} unread notification{unreadCount !== 1 && "s"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filter === "all" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === "unread" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilter("unread")}
                  >
                    Unread
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {filteredNotifications.length > 0 ? (
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                          !notification.isRead
                            ? "bg-muted/50 hover:bg-muted"
                            : "hover:bg-muted/30"
                        }`}
                      >
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{notification.title}</p>
                            <div className="flex items-center">
                              {!notification.isRead && (
                                <Badge className="mr-2 bg-blue-500">New</Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No notifications</h3>
                    <p className="text-muted-foreground mb-4">
                      {filter === "unread"
                        ? "You've read all your notifications"
                        : filter !== "all"
                        ? `You don't have any ${filter} notifications`
                        : "You don't have any notifications yet"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="appointments" className="flex flex-col space-y-1">
                      <span>Appointments</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Reminders about upcoming appointments
                      </span>
                    </Label>
                    <Switch id="appointments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="medications" className="flex flex-col space-y-1">
                      <span>Medication Reminders</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Daily reminders to take your medications
                      </span>
                    </Label>
                    <Switch id="medications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="lab-results" className="flex flex-col space-y-1">
                      <span>Lab Results</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Notifications when new lab results are available
                      </span>
                    </Label>
                    <Switch id="lab-results" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="messages" className="flex flex-col space-y-1">
                      <span>Messages</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Notifications for new messages from your care team
                      </span>
                    </Label>
                    <Switch id="messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="records" className="flex flex-col space-y-1">
                      <span>Record Updates</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Notifications when your medical records are updated
                      </span>
                    </Label>
                    <Switch id="records" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="billing" className="flex flex-col space-y-1">
                      <span>Billing & Insurance</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Notifications about billing and insurance updates
                      </span>
                    </Label>
                    <Switch id="billing" />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => toast.success("Notification preferences saved")}
                  >
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {user && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Role</p>
                      <Badge className="mt-1">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
