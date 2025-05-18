"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Phone } from "lucide-react"
import SupportChatbot from "@/components/support-chatbot"

export default function SupportPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setIsSubmitting(false)
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex h-full flex-col">
        <header className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Support Center</h1>
              <p className="text-muted-foreground">Get help with your documentation portal</p>
            </div>
            <SupportChatbot />
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl">
            <Tabs defaultValue="chat" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">Chat Support</TabsTrigger>
                <TabsTrigger value="contact">Contact Form</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Chat Support</CardTitle>
                    <CardDescription>Get instant help from our support team or AI assistant</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-6 text-center">
                      <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Start a conversation</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Our AI assistant is available 24/7 to help you with any questions
                      </p>
                      <SupportChatbot>
                        <Button className="mt-4">Open Chat</Button>
                      </SupportChatbot>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>Send us a message and we'll get back to you as soon as possible</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Find answers to common questions about our documentation portal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-medium">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Mail className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Email Support</h3>
                  <p className="text-sm text-muted-foreground mt-1">support@team.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Phone className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mt-1">+1 (555) 123-4567</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const faqs = [
  {
    question: "How do I create a new document?",
    answer:
      "To create a new document, navigate to the Editor page and click on the 'Create Document' button in the top right corner.",
  },
  {
    question: "Can I invite team members to collaborate?",
    answer:
      "Yes, you can invite team members by clicking on the 'Invite Members' option in the sidebar. You can send email invitations or share an invite link.",
  },
  {
    question: "How do I change my account settings?",
    answer:
      "To change your account settings, go to the Settings page and select the 'Profile' tab. From there, you can update your personal information and password.",
  },
  {
    question: "Is there a limit to how many documents I can create?",
    answer: "No, there is no limit to the number of documents you can create in your documentation portal.",
  },
  {
    question: "How do I organize my documents into folders?",
    answer:
      "In the Editor page, you can use the folder structure on the left side to organize your documents. Click the '+' button to create new folders.",
  },
]
