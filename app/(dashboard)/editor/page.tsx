"use client"

import { Button } from "@/components/ui/button"
import { FileTree } from "@/components/file-tree"
import { useState } from "react"

export default function EditorPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b p-6">
          <div>
            <h1 className="text-2xl font-semibold">Editor</h1>
            <p className="text-muted-foreground">Create and edit your documentation</p>
          </div>
          <Button>Create Document</Button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* File Tree */}
          <div className="w-64 h-full border-r">
            <FileTree />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="flex h-full gap-4">
              {/* Left Section - Document Creation */}
              <div className="flex-1">
                {selectedFile ? (
                  <div className="h-full">
                    {/* Editor content would go here */}
                    <p>Editing: {selectedFile}</p>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
                    <div className="max-w-md space-y-4">
                      <h2 className="text-xl font-semibold">No document selected</h2>
                      <p className="text-muted-foreground">
                        Select a document from the file tree or create a new one to get started.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Section - Blank with dotted outline */}
              <div className="flex-1">
                <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
                  {/* This section is intentionally left blank */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
