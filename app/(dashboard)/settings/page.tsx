"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Copy, Download, Eye, EyeOff, Github, Plus, RefreshCw, Trash2 } from "lucide-react"
import { ProfileImageUpload } from "@/components/profile-image-upload"
import { useToast } from "@/components/ui/use-toast"
import { TeamMembersList } from "@/components/team-members-list"
import type { TeamMember, TeamMemberRole } from "@/components/team-member-card"
import { TeamMemberDetail } from "@/components/team-member-detail"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample team members data
const teamMembers: (TeamMember & {
  phone?: string
  location?: string
  joinDate?: string
  department?: string
  bio?: string
  projects?: { id: string; name: string }[]
})[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "owner",
    avatar: "/young-man-headshot.png",
    status: "active",
    lastActive: "Just now",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "Jan 15, 2023",
    department: "Engineering",
    bio: "Alex is the founder and lead developer of the documentation portal. With over 10 years of experience in software development, he specializes in creating intuitive documentation systems and developer tools.",
    projects: [
      { id: "p1", name: "Documentation Portal" },
      { id: "p2", name: "API Reference" },
      { id: "p3", name: "Developer Hub" },
    ],
  },
  {
    id: "2",
    name: "Sam Taylor",
    email: "sam.taylor@example.com",
    role: "admin",
    avatar: "/blonde-woman-glasses-headshot.png",
    status: "active",
    lastActive: "5 minutes ago",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    joinDate: "Feb 3, 2023",
    department: "Product",
    bio: "Sam leads the product team and oversees the documentation strategy. She has a background in technical writing and product management, with a focus on creating user-friendly documentation experiences.",
    projects: [
      { id: "p1", name: "Documentation Portal" },
      { id: "p4", name: "User Guides" },
    ],
  },
  {
    id: "3",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    role: "editor",
    avatar: "/profile-image-4.png",
    status: "active",
    lastActive: "1 hour ago",
    department: "Content",
    joinDate: "Mar 12, 2023",
    bio: "Jordan is a technical writer with expertise in creating clear and concise documentation. They specialize in API documentation and technical tutorials.",
  },
  {
    id: "4",
    name: "Casey Morgan",
    email: "casey.morgan@example.com",
    role: "editor",
    avatar: "/red-hair-headshot.png",
    status: "active",
    lastActive: "3 hours ago",
    department: "Engineering",
    joinDate: "Apr 5, 2023",
  },
  {
    id: "5",
    name: "Riley Smith",
    email: "riley.smith@example.com",
    role: "viewer",
    avatar: "/professional-headshot-dark-hair-woman.png",
    status: "active",
    lastActive: "Yesterday",
    department: "Marketing",
  },
  {
    id: "6",
    name: "Taylor Wilson",
    email: "taylor.wilson@example.com",
    role: "viewer",
    avatar: "/bearded-man-headshot.png",
    status: "active",
    lastActive: "2 days ago",
  },
  {
    id: "7",
    name: "Jamie Rodriguez",
    email: "jamie.rodriguez@example.com",
    role: "editor",
    avatar: "",
    status: "invited",
  },
  {
    id: "8",
    name: "Morgan Chen",
    email: "morgan.chen@example.com",
    role: "viewer",
    avatar: "",
    status: "inactive",
    lastActive: "2 weeks ago",
  },
]

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [firstName, setFirstName] = useState("Alex")
  const [lastName, setLastName] = useState("Johnson")
  const [email, setEmail] = useState("alex.johnson@example.com")
  const [isSaving, setIsSaving] = useState(false)
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const { toast } = useToast()

  const currentUserId = "1" // In a real app, this would come from authentication
  const currentUserRole: TeamMemberRole = "owner" // In a real app, this would come from user data

  const selectedMember = selectedMemberId ? teamMembers.find((member) => member.id === selectedMemberId) : null

  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Production API Key",
      key: "pk_live_51HG6HJD9XgpY7Y3Z",
      createdAt: "Apr 15, 2023",
      lastUsed: "2 hours ago",
    },
    {
      id: "2",
      name: "Development API Key",
      key: "pk_test_51HG6HJD9XgpY7Y3Z",
      createdAt: "Jan 10, 2023",
      lastUsed: "5 days ago",
    },
  ])

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSaveProfile = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex h-full flex-col">
        <header className="border-b p-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and documentation preferences</p>
        </header>

        <main className="flex-1 p-6">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="w-full max-w-2xl flex flex-wrap gap-1 p-1">
              <TabsTrigger value="profile" className="flex-1">
                Profile
              </TabsTrigger>
              <TabsTrigger value="team" className="flex-1">
                Team
              </TabsTrigger>
              <TabsTrigger value="github" className="flex-1">
                Github
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex-1">
                Subscription
              </TabsTrigger>
              <TabsTrigger value="api-keys" className="flex-1">
                API Keys
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex-1">
                Appearance
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and profile picture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <ProfileImageUpload
                      initialImage={profileImage}
                      onImageChange={setProfileImage}
                      className="md:w-1/3"
                    />

                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First name</Label>
                          <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last name</Label>
                          <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue="admin">
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <div className="relative">
                      <Input id="current-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input id="new-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm new password</Label>
                    <Input id="confirm-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Team Members Tab */}
            <TabsContent value="team">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage your team members and their access permissions</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedMember ? (
                    <TeamMemberDetail member={selectedMember} onBack={() => setSelectedMemberId(null)} />
                  ) : (
                    <TeamMembersList
                      members={teamMembers}
                      currentUserId={currentUserId}
                      currentUserRole={currentUserRole}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Github Tab */}
            <TabsContent value="github" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Github Integration</CardTitle>
                  <CardDescription>Connect your Github account and manage repository access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Github className="h-8 w-8" />
                      <div>
                        <h3 className="font-medium">Github Account</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect your Github account to sync documentation
                        </p>
                      </div>
                    </div>
                    <Button>Connect Account</Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-branch">Default Branch</Label>
                    <Select defaultValue="main">
                      <SelectTrigger id="default-branch">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">main</SelectItem>
                        <SelectItem value="master">master</SelectItem>
                        <SelectItem value="develop">develop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auto-sync">Auto-sync Settings</Label>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Auto-sync on commit</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically sync documentation when changes are committed
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Github Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Current Plan: Pro</h3>
                        <p className="text-sm text-muted-foreground">$29/month, billed monthly</p>
                      </div>
                      <Badge variant="outline" className="bg-green-950/10 text-green-500 border-green-500/20">
                        Active
                      </Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="text-sm">
                      <div className="flex justify-between mb-2">
                        <span>Next billing date:</span>
                        <span className="font-medium">June 15, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment method:</span>
                        <span className="font-medium">Visa ending in 4242</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Plan Options</Label>
                    <div className="grid gap-4 pt-2">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <h3 className="font-medium">Basic</h3>
                          <p className="text-sm text-muted-foreground">$9/month</p>
                          <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                            <li>5 team members</li>
                            <li>10 projects</li>
                            <li>5GB storage</li>
                          </ul>
                        </div>
                        <Button variant="outline">Downgrade</Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/50">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Pro</h3>
                            <Badge>Current</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">$29/month</p>
                          <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                            <li>Unlimited team members</li>
                            <li>Unlimited projects</li>
                            <li>50GB storage</li>
                            <li>Priority support</li>
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <h3 className="font-medium">Enterprise</h3>
                          <p className="text-sm text-muted-foreground">Custom pricing</p>
                          <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                            <li>Unlimited everything</li>
                            <li>Dedicated support</li>
                            <li>Custom integrations</li>
                            <li>SLA guarantees</li>
                          </ul>
                        </div>
                        <Button>Contact Sales</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-2">
                  <h4 className="text-sm font-medium">Need help?</h4>
                  <p className="text-xs text-muted-foreground">
                    Contact our billing support at billing@team.com or call us at +1 (555) 123-4567.
                  </p>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View your past invoices and payment history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Invoice</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>May 15, 2023</TableCell>
                          <TableCell>$29.00</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-950/10 text-green-500 border-green-500/20">
                              Paid
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Download</span>
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Apr 15, 2023</TableCell>
                          <TableCell>$29.00</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-950/10 text-green-500 border-green-500/20">
                              Paid
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Download</span>
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Mar 15, 2023</TableCell>
                          <TableCell>$29.00</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-950/10 text-green-500 border-green-500/20">
                              Paid
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Download</span>
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Keys Tab */}
            <TabsContent value="api-keys" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys for accessing the documentation API</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Your API Keys</h3>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Generate New Key
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    {apiKeys.map((apiKey) => (
                      <div key={apiKey.id} className="p-4">
                        <div className="grid gap-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{apiKey.name}</div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <RefreshCw className="mr-2 h-3 w-3" />
                                Rotate
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive">
                                <Trash2 className="mr-2 h-3 w-3" />
                                Revoke
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
                              {apiKey.key.substring(0, 8)}••••••••••••••••
                            </code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="h-3 w-3" />
                              <span className="sr-only">Copy API key</span>
                            </Button>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Created on {apiKey.createdAt} • Last used {apiKey.lastUsed}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-2">
                  <h4 className="text-sm font-medium">API Key Security</h4>
                  <p className="text-xs text-muted-foreground">
                    Your API keys carry many privileges, so be sure to keep them secure. Do not share your API keys in
                    publicly accessible areas such as GitHub, client-side code, or social media.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications about documentation updates
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">API Key Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when your API keys are used in a new location
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Documentation Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when documentation is updated
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketing Communications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new features and improvements
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the documentation looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="font">Font</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger id="font">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="lato">Lato</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                        <SelectItem value="poppins">Poppins</SelectItem>
                        <SelectItem value="sourcesanspro">Source Sans Pro</SelectItem>
                        <SelectItem value="raleway">Raleway</SelectItem>
                        <SelectItem value="ubuntu">Ubuntu</SelectItem>
                        <SelectItem value="merriweather">Merriweather</SelectItem>
                        <SelectItem value="playfairdisplay">Playfair Display</SelectItem>
                        <SelectItem value="nunito">Nunito</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Custom Colors</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="primary-color" className="text-xs">
                          Primary
                        </Label>
                        <div className="flex gap-2">
                          <div className="relative w-10 h-10 overflow-hidden rounded-md border">
                            <Input
                              type="color"
                              id="primary-color"
                              defaultValue="#3b82f6"
                              className="absolute inset-0 w-[200%] h-[200%] cursor-pointer opacity-0"
                            />
                            <div className="absolute inset-0 bg-[#3b82f6]" />
                          </div>
                          <Input defaultValue="#3b82f6" className="flex-1" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="secondary-color" className="text-xs">
                          Secondary
                        </Label>
                        <div className="flex gap-2">
                          <div className="relative w-10 h-10 overflow-hidden rounded-md border">
                            <Input
                              type="color"
                              id="secondary-color"
                              defaultValue="#10b981"
                              className="absolute inset-0 w-[200%] h-[200%] cursor-pointer opacity-0"
                            />
                            <div className="absolute inset-0 bg-[#10b981]" />
                          </div>
                          <Input defaultValue="#10b981" className="flex-1" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="accent-color" className="text-xs">
                          Accent
                        </Label>
                        <div className="flex gap-2">
                          <div className="relative w-10 h-10 overflow-hidden rounded-md border">
                            <Input
                              type="color"
                              id="accent-color"
                              defaultValue="#8b5cf6"
                              className="absolute inset-0 w-[200%] h-[200%] cursor-pointer opacity-0"
                            />
                            <div className="absolute inset-0 bg-[#8b5cf6]" />
                          </div>
                          <Input defaultValue="#8b5cf6" className="flex-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code-theme">Code Block Theme</Label>
                    <Select defaultValue="github-dark">
                      <SelectTrigger id="code-theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="github-dark">GitHub Dark</SelectItem>
                        <SelectItem value="github-light">GitHub Light</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="border rounded-md p-4">
                      <div className="flex flex-col gap-2">
                        <Input type="file" accept="image/svg+xml,image/png,image/jpeg" />
                        <p className="text-xs text-muted-foreground">
                          Upload SVG, PNG or JPG (max. 2MB). Recommended size: 512x512px.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
